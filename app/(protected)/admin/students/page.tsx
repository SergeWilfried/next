import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import { Button } from "@/components/ui/button";
import { getAllStudents } from "@/actions/student-action";
import { DataTable } from "@/components/data-table/data-table";
import { studentsTableColumns } from "./columns";
import { GetStudentsSchema } from "@/lib/validations/student";

export const metadata = constructMetadata({
  title: "Students – School Management System",
  description: "Manage students in the school system.",
});

export default async function StudentsPage() {

  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/login");

  // Get all students without pagination
  const { data: students, count } = await getAllStudents();
  return (
    <>
      <DashboardHeader
        heading="Students"
        text="Manage students in the school system."
      />
      {students === null ? (
        <div>Loading...</div>
      ) : students.length === 0 ? (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="file" />
          <EmptyPlaceholder.Title>No students listed</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any students yet. Start by adding some.
          </EmptyPlaceholder.Description>
          <Button>Add Students</Button>
        </EmptyPlaceholder>
      ) : (
        <DataTable columns={studentsTableColumns} data={students} pageCount={count} />
      )}
    </>
  );
}
