"use client";

import { useState } from "react";
import { EventInput, EventClickArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { Separator } from "../ui/separator";

let eventGuid: number = 0;

const SchedulePage = () => {
  const [events, setEvents] = useState<EventInput[]>([]);

  const addEvent = (id: string, title: string, date: string) => {
    const newEvents: EventInput[] = [...events];
    newEvents.push({ id, title, date, color: "red" });
    setEvents(newEvents);
  };

  const removeEvent = (id: string) => {
    const newEvents: EventInput[] = events.filter(
      (e: EventInput) => e.id != id
    );
    setEvents(newEvents);
  };

  const handleDateClick = (clickInfo: DateClickArg) => {
    const title: string | null = prompt(
      "Please enter a new title for your event"
    );

    const eventId: string = createEventId();
    const calendarApi = clickInfo.view.calendar;
    calendarApi.unselect();
    if (title) {
      calendarApi.addEvent({
        id: eventId,
        title,
        start: clickInfo.dateStr,
        end: clickInfo.dateStr,
        allDay: clickInfo.allDay,
      });
      addEvent(eventId, title, clickInfo.dateStr);
    }
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    clickInfo.event.remove();
    removeEvent(clickInfo.event.id);
  };

  const createEventId = (): string => {
    return `event${++eventGuid}`;
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        selectable={true}
        headerToolbar={{
          start: "dayGridMonth,timeGridWeek,timeGridDay custom1",
          center: 'title',
        }}
        customButtons={{
          custom1: {
            text: "Add Event",
            click: () => {
              console.log("custom1");
            },
          },
        }}
        dayMaxEvents={true}
        businessHours={{ daysOfWeek: [1, 2, 3, 4, 5, 6] }}
        dateClick={(e: DateClickArg) => {
          handleDateClick(e);
        }}
        eventClick={(e: EventClickArg) => handleEventClick(e)}
      />
    </>
  );
};

export default SchedulePage;