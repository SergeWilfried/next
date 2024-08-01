import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeader } from "@/components/dashboard/header";

export default function StaffLoading() {
  return (
    <>
      <DashboardHeader
        heading="Staff"
        text="Manage staff in the school system."
      />
      <Skeleton className="size-full rounded-lg" />
    </>
  );
}
