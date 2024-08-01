import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeader } from "@/components/dashboard/header";

export default function ParentsLoading() {
  return (
    <>
      <DashboardHeader
        heading="Parents"
        text="Manage parents in the school system."
      />
      <Skeleton className="size-full rounded-lg" />
    </>
  );
}
