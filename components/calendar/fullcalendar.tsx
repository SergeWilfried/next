"use client";

import { useState } from "react";
import { EventInput, EventClickArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from '@fullcalendar/list';
import rrulePlugin from '@fullcalendar/rrule';
import { RRule } from 'rrule';

import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '@fullcalendar/list/main.css';

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
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

let eventGuid: number = 0;

interface ClassInfo {
  id: string;
  name: string;
  color: string;
  status?: 'active' | 'cancelled' | 'done';
}

interface FormData {
  title: string;
  classId: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  frequency: 'weekly' | 'monthly' | 'yearly';
}

const SchedulePage = () => {
  const classes: ClassInfo[] = [
    { id: '1', name: 'Math 101', color: '#FF5733', status: 'active' },
    { id: '2', name: 'History 201', color: '#33FF57', status: 'cancelled' },
    { id: '3', name: 'Physics 301', color: '#3357FF', status: 'done' },
  ];

  const [events, setEvents] = useState<EventInput[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventInput | null>(null);

  const form = useForm<FormData>({
    defaultValues: {
      classId: "",
      dayOfWeek: "",
      startTime: "",
      endTime: "",
      frequency: "weekly",
    },
  });

  const editForm = useForm<FormData>({
    defaultValues: {
      classId: "",
      dayOfWeek: "",
      startTime: "",
      endTime: "",
      frequency: "weekly",
    },
  });

  const addClassSchedule = (data: FormData) => {
    const selectedClass = classes.find(c => c.id === data.classId);
    if (!selectedClass) return;

    const startDate = new Date();
    startDate.setHours(parseInt(data.startTime.split(':')[0]));
    startDate.setMinutes(parseInt(data.startTime.split(':')[1]));
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);

    const endDate = new Date(startDate);
    endDate.setHours(parseInt(data.endTime.split(':')[0]));
    endDate.setMinutes(parseInt(data.endTime.split(':')[1]));

    let rrule;
    switch (data.frequency) {
      case 'weekly':
        rrule = new RRule({
          freq: RRule.WEEKLY,
          byweekday: [parseInt(data.dayOfWeek) - 1],
          dtstart: startDate,
          until: new Date(startDate.getFullYear() + 1, startDate.getMonth(), startDate.getDate())
        });
        break;
      case 'monthly':
        rrule = new RRule({
          freq: RRule.MONTHLY,
          bysetpos: Math.floor((startDate.getDate() - 1) / 7) + 1,
          byweekday: [parseInt(data.dayOfWeek) - 1],
          dtstart: startDate,
          until: new Date(startDate.getFullYear() + 1, startDate.getMonth(), startDate.getDate())
        });
        break;
      case 'yearly':
        rrule = new RRule({
          freq: RRule.YEARLY,
          bymonth: startDate.getMonth() + 1,
          bymonthday: startDate.getDate(),
          dtstart: startDate,
          until: new Date(startDate.getFullYear() + 5, startDate.getMonth(), startDate.getDate())
        });
        break;
    }

    const newEvent: EventInput = {
      id: createEventId(),
      title: selectedClass.name,
      startTime: data.startTime,
      endTime: data.endTime,
      backgroundColor: selectedClass.color,
      borderColor: selectedClass.color,
      extendedProps: {
        status: selectedClass.status
      },
      rrule: rrule.toString()
    };

    setEvents([...events, newEvent]);
  };

  const onSubmit = (data: FormData) => {
    addClassSchedule(data);
    handleDialogClose();
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event;
    const rrule = RRule.fromString(event.extendedProps?.rrule || "");
    
    editForm.reset({
      classId: event.id,
      title: event.title,
      dayOfWeek: (rrule.options.byweekday?.[0] + 1).toString() || "",
      startTime: event.startStr.split('T')[1].slice(0, 5),
      endTime: event.endStr.split('T')[1].slice(0, 5),
      frequency: rrule.options.freq === RRule.WEEKLY ? "weekly" :
                 rrule.options.freq === RRule.MONTHLY ? "monthly" : "yearly",
    });
    
    setEditingEvent({
      id: event.id,
      title: event.title,
      start: event.start ? event.start : undefined,
      end: event.end ? event.end : undefined ,
      extendedProps: event.extendedProps,
      rrule: event.extendedProps?.rrule
    });
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = (data: FormData) => {
    if (!editingEvent) return;

    const updatedEvent = {
      ...editingEvent,
      title: data.title,
      startTime: data.startTime,
      endTime: data.endTime,
      rrule: new RRule({
        freq: data.frequency === 'weekly' ? RRule.WEEKLY :
              data.frequency === 'monthly' ? RRule.MONTHLY : RRule.YEARLY,
        byweekday: [parseInt(data.dayOfWeek) - 1],
        dtstart: new Date(editingEvent.start as Date),
        until: new Date((editingEvent.start as Date).getFullYear() + 1, (editingEvent.start as Date).getMonth(), (editingEvent.start as Date).getDate())
      }).toString()
    };

    setEvents(events.map(e => e.id === editingEvent.id ? updatedEvent : e));
    setIsEditDialogOpen(false);
    setEditingEvent(null);
  };

  const createEventId = (): string => {
    return `event${++eventGuid}`;
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    form.reset();
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, rrulePlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today addClassSchedule',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,listWeek'
        }}
        views={{
          listWeek: { buttonText: 'List' }
        }}
        events={events}
        slotMinTime="08:00:00"
        slotMaxTime="22:00:00"
        allDaySlot={false}
        customButtons={{
          addClassSchedule: {
            text: 'Add Class Schedule',
            click: () => setIsDialogOpen(true),
          },
        }}
        eventClick={handleEventClick}
        eventDidMount={(info) => {
          if (info.view.type === 'listWeek') {
            const status = info.event.extendedProps.status;
            if (status === 'cancelled') {
              info.el.style.backgroundColor = '#FFCCCB';
              info.el.style.color = '#8B0000';
            } else if (status === 'done') {
              info.el.style.backgroundColor = '#E0E0E0';
              info.el.style.color = '#696969';
            }

            const dotEl = info.el.getElementsByClassName('fc-list-event-dot')[0] as HTMLElement;
            if (dotEl) {
              dotEl.style.borderColor = info.event.backgroundColor as string;
            }
          }
        }}
        noEventsContent={() => "No classes scheduled"}
      />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Class Schedule</DialogTitle>
            <DialogDescription>
              Enter the details for the class schedule.
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
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
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
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="secondary" onClick={handleDialogClose}>
                  Cancel
                </Button>
                <Button type="submit">Add Schedule</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Class Schedule</DialogTitle>
            <DialogDescription>
              Make changes to the class schedule.
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(handleEditSubmit)} className="space-y-4">
              <FormField
                control={editForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
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
                control={editForm.control}
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
                control={editForm.control}
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
              <FormField
                control={editForm.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="secondary" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SchedulePage;