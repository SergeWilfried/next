import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeader } from "@/components/dashboard/header";

export default function GradesLoading() {
  return (
    <>
      <DashboardHeader
        heading="Grades"
        text="Manage grades in the school system."
      />
      <Skeleton className="size-full rounded-lg" />
    </>
  );
}
