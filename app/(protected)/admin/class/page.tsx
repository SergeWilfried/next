import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import { Button } from "@/components/ui/button";
import { getAllDonations } from "@/actions/get-donations";
import ClassLoading from "./loading";
import { DataTable } from "@/components/data-table/data-table";
import { classTableColumns } from "./columns";

export const metadata = constructMetadata({
  title: "Donations – School Management System",
  description: "Manage donations in the school system.",
});

export default async function ClassPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/login");


  // Fetch classes from the server
  // TODO: Fetch classes from the server
  // FIXME: This is a temporary placeholder for the classes table
  const { data: donations, error, count } = await getAllDonations();
  return (
    <>
      <DashboardHeader
        heading="Classes"
        text="Manage your school classes."
      />
      {donations === null ? (
        <ClassLoading />
      ) : donations.length === 0 ? (  
      <EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="building" />
        <EmptyPlaceholder.Title>No classes listed</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          You don&apos;t have any classes yet. Start by adding some.
        </EmptyPlaceholder.Description>
        <Button>Add Donations</Button>
      </EmptyPlaceholder>
    ) : (
      <DataTable data={donations} columns={classTableColumns} pageCount={count} />
    )}
    </>
  );
}
