import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import { Button } from "@/components/ui/button";
import { getAllGrades } from "@/actions/get-all-grades";
import { gradesTableColumns } from "./columns";
import { DataTable } from "@/components/data-table/data-table";

export const metadata = constructMetadata({
  title: "Grades – School Management System",
  description: "Manage grades in the school system.",
});

export default async function GradesPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/login");



  // Fetch all grades
  const { data: grades, error, count } = await getAllGrades();

  return (
    <>
      <DashboardHeader
        heading="Schools"
        text="Manage schools in the school system."
      />
      {grades.length === 0 ? (
      <EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="file" />
        <EmptyPlaceholder.Title>No grades listed</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          You don&apos;t have any grades yet. Start by adding some.
        </EmptyPlaceholder.Description>
        <Button>Add Grades</Button>
        </EmptyPlaceholder>
      ) : (
        <DataTable
          data={grades}
          count={count}
          columns={gradesTableColumns}
        />
      )}
    </>
  );
}
