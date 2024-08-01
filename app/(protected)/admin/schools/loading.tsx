import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeader } from "@/components/dashboard/header";

export default function SchoolsLoading() {
  return (
    <>
      <DashboardHeader
        heading="Schools"
        text="Manage schools in the school system."
      />
      <Skeleton className="size-full rounded-lg" />
    </>
  );
}
