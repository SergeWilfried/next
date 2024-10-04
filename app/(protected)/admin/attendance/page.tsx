import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/data-table";
import { applicationsTableColumns } from "./columns";
import ApplicationsLoading from "./loading";
import { getAllAttendances } from "@/lib/api/attendance";


export const metadata = constructMetadata({
  title: "Attendance – School Management System",
  description: "Manage attendance in the school system.",
});

export default async function ApplicationsPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/login");

  // Fetch applications
  const { data: attendances, count, error } = await getAllAttendances();

  return (
    <>
      <DashboardHeader
        heading="Attendance"
        items={[
          { href: "/", label: "Home" },
          { href: "/admin", label: "Admin" },
          { href: "/admin/attendance", label: "Attendance" },
        ]}
      />
      {error ? (
        <div>Error loading applications. Please try again later.</div>
      ) : attendances === undefined ? (
        <ApplicationsLoading />
      ) : attendances.length > 0 ? (
        <DataTable href="/admin/attendance" columns={applicationsTableColumns} data={attendances} pageCount={count} />
      ) : (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="file" />
          <EmptyPlaceholder.Title>No attendance listed</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any attendance yet. Start by adding some.
          </EmptyPlaceholder.Description>
          <Button>Import Attendance</Button>
        </EmptyPlaceholder>
      )}
    </>
  );
}
