import { EventInput } from "@fullcalendar/core";
import { useState, useCallback } from "react";

const useEventManagement = () => {
    const [events, setEvents] = useState<EventInput[]>([]);
  
    const addEvent = useCallback((newEvent: EventInput) => {
      setEvents(prevEvents => [...prevEvents, newEvent]);
    }, []);
  
    const updateEvent = useCallback((updatedEvent: EventInput) => {
      setEvents(prevEvents => prevEvents.map(e => e.id === updatedEvent.id ? updatedEvent : e));
    }, []);
  
    const deleteEvent = useCallback((eventId: string) => {
      setEvents(prevEvents => prevEvents.filter(e => e.id !== eventId));
    }, []);
  
    return { events, addEvent, updateEvent, deleteEvent };
  };

  export { useEventManagement };