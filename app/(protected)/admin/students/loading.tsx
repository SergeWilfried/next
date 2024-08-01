import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeader } from "@/components/dashboard/header";

export default function StudentsLoading() {
  return (
    <>
      <DashboardHeader
        heading="Students"
        text="Manage students in the school system."
      />
      <Skeleton className="size-full rounded-lg" />
    </>
  );
}
