import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import ClassLoading from "./loading";
import { DataTable } from "@/components/data-table/data-table";
import { classTableColumns } from "./columns";
import AddClassDialog from "./add-class-dialog";
import { Button } from "@/components/ui/button";
/// TODO: Fetch classes from the server
async function getAllClasses() {
  const { data: classes, count } = await Promise.resolve({ data: [], count: 0 });
  return { data: classes, count, error: null };
}

export const metadata = constructMetadata({
  title: "Classes – School Management System",
  description: "Manage your school classes.",
});

export default async function ClassPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/login");


  // Fetch classes from the server
  // TODO: Fetch classes from the server
  // FIXME: This is a temporary placeholder for the classes table
  const { data: classes, error, count } = await getAllClasses();
  return (
    <>
      <DashboardHeader
        heading="Classes"
        items={[
          { href: "/", label: "Home" },
          { href: "/admin", label: "Admin" },
          { href: "/admin/classes", label: "Classes" },
        ]}
      >
        <AddClassDialog />
      </DashboardHeader>
      {classes === null ? (
        <ClassLoading />
      ) : classes.length === 0 ? (  
      <EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="building" />
        <EmptyPlaceholder.Title>No classes listed</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          You don&apos;t have any classes yet. Start by adding some.
        </EmptyPlaceholder.Description>
        <Button>Import from Excel</Button>
      </EmptyPlaceholder>
    ) : (
      <DataTable data={classes} columns={classTableColumns} pageCount={count} />
    )}
    </>
  );
}