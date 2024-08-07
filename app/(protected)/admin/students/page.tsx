import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import { Button } from "@/components/ui/button";
import { getStudents } from "@/actions/student-action";
import { DataTable } from "@/components/data-table/data-table";
import { studentsTableColumns } from "./columns";
import { GetStudentsSchema } from "@/lib/validations/student";

export const metadata = constructMetadata({
  title: "Students – School Management System",
  description: "Manage students in the school system.",
});

export default async function StudentsPage({searchParams}: {searchParams: GetStudentsSchema}) {
  const { page, per_page } = searchParams

  const user = await getCurrentUser();
    // calculate limit and offset according page and per_page records
  const limit = typeof per_page === "string" ? parseInt(per_page) : 10
  const offset = typeof page === "string" ? parseInt(page) > 0 ? (parseInt(page) - 1) * limit : 0 : 0
  const { data: students, pageCount, total } = await getStudents({page: offset, per_page: limit});

  if (!user || user.role !== "ADMIN") redirect("/login");

  console.log(students)
  return (
    <>
      <DashboardHeader
        heading="Students"
        text="Manage students in the school system."
      />
      {!students || students.length === 0 ? (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="file" />
          <EmptyPlaceholder.Title>No students listed</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any students yet. Start by adding some.
          </EmptyPlaceholder.Description>
          <Button>Add Students</Button>
        </EmptyPlaceholder>
      ) : (
        <DataTable columns={studentsTableColumns} data={students} pageCount={1} />
      )}
    </>
  );
}
