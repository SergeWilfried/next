import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeader } from "@/components/dashboard/header";

export default function ApplicationsLoading() {
  return (
    <>
      <DashboardHeader
        heading="Attendance"
        text="Manage attendance in the school system."
      />
      <Skeleton className="size-full rounded-lg" />
    </>
  );
}
