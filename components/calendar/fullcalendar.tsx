"use client";

import { useState } from "react";
import { EventInput, EventClickArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateClickArg } from "@fullcalendar/interaction";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

let eventGuid: number = 0;

interface FormData {
  classId: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

const SchedulePage = () => {
  const classes = [
    { id: '1', name: 'Math 101', color: '#FF5733' },
    { id: '2', name: 'History 201', color: '#33FF57' },
    { id: '3', name: 'Physics 301', color: '#3357FF' },
  ];

  const [events, setEvents] = useState<EventInput[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const form = useForm<FormData>({
    defaultValues: {
      classId: "",
      dayOfWeek: "",
      startTime: "",
      endTime: "",
    },
  });

  const addClassSchedule = (classId: string, dayOfWeek: string, startTime: string, endTime: string) => {
    const selectedClass = classes.find(c => c.id === classId);
    if (!selectedClass) return;

    const newEvent: EventInput = {
      id: createEventId(),
      title: selectedClass.name,
      daysOfWeek: [parseInt(dayOfWeek)],
      startTime,
      endTime,
      color: selectedClass.color,
    };

    setEvents([...events, newEvent]);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (confirm(`Are you sure you want to delete the class '${clickInfo.event.title}'?`)) {
      clickInfo.event.remove();
      setEvents(events.filter(e => e.id !== clickInfo.event.id));
    }
  };

  const handleDateClick = (arg: DateClickArg) => {
    const clickedDate = arg.date;
    const dayOfWeek = clickedDate.getDay();
    const formattedTime = clickedDate.toTimeString().slice(0, 5); // Get HH:MM format

    setSelectedDate(arg.dateStr);
    form.setValue('dayOfWeek', dayOfWeek.toString());
    form.setValue('startTime', formattedTime);
    setIsDialogOpen(true);
  };

  const onSubmit = (data: FormData) => {
    addClassSchedule(data.classId, data.dayOfWeek, data.startTime, data.endTime);
    handleDialogClose();
  };

  const createEventId = (): string => {
    return `event${++eventGuid}`;
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedDate(null);
    form.reset();
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={events}
        headerToolbar={{
          left: 'prev,next today addClassSchedule',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek'
        }}
        slotMinTime="08:00:00"
        slotMaxTime="18:00:00"
        allDaySlot={false}
        weekends={false}
        hiddenDays={[0, 6]}
        customButtons={{
          addClassSchedule: {
            text: 'Add Class',
            click: () => setIsDialogOpen(true),
          },
        }}
        eventClick={handleEventClick}
        editable={false}
        selectable={true}
        dateClick={handleDateClick}
        views={{
          timeGridWeek: {
            dayHeaderFormat: { weekday: 'long' },
          },
          dayGridMonth: {
            dayMaxEvents: 3,
            dayMaxEventRows: 3,
            moreLinkClick: "popover",
          },
        }}
      />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Class to Timetable</DialogTitle>
            <DialogDescription>
              {selectedDate 
                ? `Adding class for ${new Date(selectedDate).toLocaleDateString()} at ${new Date(selectedDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
                : 'Enter the details for the class schedule.'}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="classId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Class</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {classes.map((cls) => (
                          <SelectItem key={cls.id} value={cls.id}>
                            {cls.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dayOfWeek"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Day of Week</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a day" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Monday</SelectItem>
                        <SelectItem value="2">Tuesday</SelectItem>
                        <SelectItem value="3">Wednesday</SelectItem>
                        <SelectItem value="4">Thursday</SelectItem>
                        <SelectItem value="5">Friday</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="secondary" onClick={handleDialogClose}>
                  Cancel
                </Button>
                <Button type="submit">Add to Timetable</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SchedulePage;