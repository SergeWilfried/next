import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/data-table";
import { enrollmentsTableColumns } from "./columns";
import { getAllEnrollments } from "@/lib/api";

export const metadata = constructMetadata({
  title: "Enrollments – School Management System",
  description: "Manage enrollments in the school system.",
});

export default async function EnrollmentsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role === "USER" || user.role === 'PARENT') {
    redirect("/dashboard");
  } else {
    redirect("/admin");
  }
  // Fetch enrollments from the server
  const { data: enrollments, error, count } = await getAllEnrollments();


  return (
    <>
      <DashboardHeader
        heading="Enrollments"
        items={[
          { href: "/", label: "Home" },
          { href: "/admin", label: "Admin" },
          { href: "/admin/enrollments", label: "Enrollments" },
        ]}
      />
      {error && <div>{error}</div>}
      {enrollments.length === 0 ? (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="file" />
        <EmptyPlaceholder.Title>No enrollments listed</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          You don&apos;t have any enrollments yet. Start by adding some.
        </EmptyPlaceholder.Description>
        <Button>Import Enrollments</Button>
      </EmptyPlaceholder>
    ) : (
      <DataTable href="/admin/enrollments" data={enrollments} columns={enrollmentsTableColumns} pageCount={count} />
    )}
    </>
  );
}
