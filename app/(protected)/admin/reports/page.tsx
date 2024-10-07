import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/data-table";
import { reportsTableColumns } from "./columns";
import { getAllReports } from "@/lib/api/report";

export const metadata = constructMetadata({
  title: "Reports – School Management System",
  description: "Manage reports in the school system.",
});

export default async function ReportsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role === "USER" || user.role === 'PARENT') {
    redirect("/dashboard");
  } 

  // Fetch reports from the server
  const { data: reports, error, count } = await getAllReports();
  return (
    <>
      <DashboardHeader
        heading="Reports"
        text="Manage reports in the school system."
      />
      {error && <div>{error}</div>}
      {reports.length === 0 ? (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="file" />
        <EmptyPlaceholder.Title>No reports listed</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          You don&apos;t have any reports yet. Start by adding some.
        </EmptyPlaceholder.Description>
        <Button>Add Reports</Button>
      </EmptyPlaceholder>
    ) : (
      <DataTable href="/admin/reports" data={reports} columns={reportsTableColumns} pageCount={count} />
    )}
    </>
  );
}
