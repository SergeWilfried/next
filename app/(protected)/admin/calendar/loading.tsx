import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeader } from "@/components/dashboard/header";

export default function CalendarLoading() {
  return (
    <>
      <DashboardHeader
        heading="Calendar"
        text="Manage calendar in the school system."
      />
      <Skeleton className="size-full rounded-lg" />
    </>
  );
}
