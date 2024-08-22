import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeader } from "@/components/dashboard/header";

export default function PaymentsLoading() {
  return (
    <>
      <DashboardHeader
        heading="Financial Overview"
        text="Key metrics and trends for the school's financial health."
      />
      <Skeleton className="size-full rounded-lg" />
    </>
  );
}
