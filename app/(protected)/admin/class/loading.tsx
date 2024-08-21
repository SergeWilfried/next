import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeader } from "@/components/dashboard/header";

export default function ClassLoading() {
  return (
    <>
      <DashboardHeader
        heading="Classes"
        text="Manage your school classes."
      />
      <Skeleton className="size-full rounded-lg" />
    </>
  );
}
