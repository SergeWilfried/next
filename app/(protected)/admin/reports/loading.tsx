import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeader } from "@/components/dashboard/header";

export default function ReportsLoading() {
  return (
    <>
      <DashboardHeader
        heading="Reports"
        text="Manage reports in the school system."
      />
      <Skeleton className="size-full rounded-lg" />
    </>
  );
}
