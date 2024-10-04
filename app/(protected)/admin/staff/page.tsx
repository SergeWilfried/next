import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import { Button } from "@/components/ui/button";
import StaffLoading from "./loading";
import { DataTable } from "@/components/data-table/data-table";
import { staffTableColumns } from "./columns";
import { NewStaffDialog } from "./add-staff-dialog";
import { getAllStaff } from "@/lib/api";

export const metadata = constructMetadata({
  title: "Staff – School Management System",
  description: "Manage staff in the school system.",
});

export default async function StaffPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/login");

  // Fetch staff data and count (you'll need to implement these functions)
  const { data: staff, count } = await getAllStaff();

  return (
    <>
      <DashboardHeader
        heading="Staff"
        items={[
          { href: "/", label: "Home" },
          { href: "/admin", label: "Admin" },
          { href: "/admin/staff", label: "Staff" },
        ]}
      >
        <NewStaffDialog />
      </DashboardHeader>
      {staff === null ? (
        <StaffLoading />
      ) : staff.length === 0 ? (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="file" />
          <EmptyPlaceholder.Title>No staff listed</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any staff yet. Start by adding some.
          </EmptyPlaceholder.Description>
          <Button>Import from Excel</Button>
        </EmptyPlaceholder>
      ) : (
        <DataTable href="/admin/staff" columns={staffTableColumns} data={staff} pageCount={count} />
      )}
    </>
  );
}