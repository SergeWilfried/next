import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/data-table";
import { parentsTableColumns } from "./columns";
import { getAllParents } from "@/actions/get-parents-action";
import ParentsLoading from "./loading";
import { NewParentDialog } from "./add-parent-dialog";

export const metadata = constructMetadata({
  title: "Parents – School Management System",
  description: "Manage parents in the school system.",
});

export default async function ParentsPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/login");

  // Get all parents without pagination
  const { data: parents, count } = await getAllParents();

  return (
    <>
      <DashboardHeader
        heading="Parents"
        items={[
          { href: "/", label: "Home" },
          { href: "/admin", label: "Admin" },
          { href: "/admin/parents", label: "Parents" },
        ]}
      >
        <NewParentDialog />
      </DashboardHeader>
      {parents === null ? (
        <ParentsLoading />
      ) : parents.length === 0 ? (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="file" />
          <EmptyPlaceholder.Title>No parents listed</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any parents yet. Start by adding some.
          </EmptyPlaceholder.Description>
          <Button>Import from Excel</Button>
        </EmptyPlaceholder>
      ) : (
        <DataTable href="/admin/parents" columns={parentsTableColumns} data={parents} pageCount={count} />
      )}
    </>
  );
}