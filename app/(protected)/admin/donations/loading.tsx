import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeader } from "@/components/dashboard/header";

export default function DonationsLoading() {
  return (
    <>
      <DashboardHeader
        heading="Donations"
        text="Manage donations in the school system."
      />
      <Skeleton className="size-full rounded-lg" />
    </>
  );
}
