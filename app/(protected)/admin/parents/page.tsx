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
        text="Manage parents in the school system."
      />
      {parents === null ? (
        <ParentsLoading />
      ) : parents.length === 0 ? (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="file" />
          <EmptyPlaceholder.Title>No parents listed</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any parents yet. Start by adding some.
          </EmptyPlaceholder.Description>
          <Button>Add Parents</Button>
        </EmptyPlaceholder>
      ) : (
        <DataTable columns={parentsTableColumns} data={parents} pageCount={count} />
      )}
    </>
  );
}