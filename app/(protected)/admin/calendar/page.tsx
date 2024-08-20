import FullCalendar from "@/components/calendar/fullcalendar";

export default function Home() {
  return (
    <div>
      <FullCalendar initialView='dayGridMonth' />
      <FullCalendar initialView='timeGridWeek' />
    </div>
  );
}