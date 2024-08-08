import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import { Button } from "@/components/ui/button";
import { getAllEnrollment } from "@/actions/get-enrollment";
import { DataTable } from "@/components/data-table/data-table";
import { enrollmentsTableColumns } from "./columns";

export const metadata = constructMetadata({
  title: "Enrollments – School Management System",
  description: "Manage enrollments in the school system.",
});

export default async function EnrollmentsPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/login");

  // Fetch enrollments from the server
  const { data: enrollments, error, count } = await getAllEnrollment();


  return (
    <>
      <DashboardHeader
        heading="Enrollments"
        text="Manage enrollments in the school system."
      />
      {error && <div>{error}</div>}
      {enrollments.length === 0 ? (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="file" />
        <EmptyPlaceholder.Title>No enrollments listed</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          You don&apos;t have any enrollments yet. Start by adding some.
        </EmptyPlaceholder.Description>
        <Button>Add Enrollments</Button>
      </EmptyPlaceholder>
    ) : (
      <DataTable data={enrollments} columns={enrollmentsTableColumns} pageCount={count} />
    )}
    </>
  );
}
