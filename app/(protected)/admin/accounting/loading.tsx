import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeader } from "@/components/dashboard/header";

export default function PaymentsLoading() {
  return (
    <>
      <DashboardHeader
        heading="Payments"
        text="Manage payments in the school system."
      />
      <Skeleton className="size-full rounded-lg" />
    </>
  );
}
