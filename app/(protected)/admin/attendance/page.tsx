import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import { Button } from "@/components/ui/button";
import { getApplications } from "@/actions/get-applications";
import { DataTable } from "@/components/data-table/data-table";
import { applicationsTableColumns } from "./columns";
import ApplicationsLoading from "./loading";


export const metadata = constructMetadata({
  title: "Attendance – School Management System",
  description: "Manage attendance in the school system.",
});

export default async function ApplicationsPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/login");

  // Fetch applications
  const { data: applications, count, error } = await getApplications();

  return (
    <>
      <DashboardHeader
        heading="Attendance"
        text="Manage attendance in the school system."
      />
      {error ? (
        <div>Error loading applications. Please try again later.</div>
      ) : applications === undefined ? (
        <ApplicationsLoading />
      ) : applications.length > 0 ? (
        <DataTable columns={applicationsTableColumns} data={applications} pageCount={count} />
      ) : (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="file" />
          <EmptyPlaceholder.Title>No attendance listed</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any attendance yet. Start by adding some.
          </EmptyPlaceholder.Description>
          <Button>Add Attendance</Button>
        </EmptyPlaceholder>
      )}
    </>
  );
}
