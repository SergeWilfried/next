import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/data-table";
import { applicationsTableColumns } from "./columns";
import ApplicationsLoading from "./loading";
import { getAllApplications } from "@/lib/api";


export const metadata = constructMetadata({
  title: "Applications – School Management System",
  description: "Manage applications in the school system.",
});

export default async function ApplicationsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role === "USER" || user.role === 'PARENT') {
    redirect("/dashboard");
  }
  // Fetch applications
  const { data: applications, count, error } = await getAllApplications();

  return (
    <>
      <DashboardHeader
        heading="Applications"
        items={[
          { href: "/", label: "Home" },
          { href: "/admin", label: "Admin" },
          { href: "/admin/applications", label: "Applications" },
        ]}
      />
      {error ? (
        <div>Error loading applications. Please try again later.</div>
      ) : applications === undefined ? (
        <ApplicationsLoading />
      ) : applications.length > 0 ? (
        <DataTable href="/admin/applications" columns={applicationsTableColumns} data={applications} pageCount={count} />
      ) : (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="file" />
          <EmptyPlaceholder.Title>No applications listed</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any applications yet. Start by adding some.
          </EmptyPlaceholder.Description>
          <Button>Import Applications</Button>
        </EmptyPlaceholder>
      )}
    </>
  );
}
