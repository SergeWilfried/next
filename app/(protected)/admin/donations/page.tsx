import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import { Button } from "@/components/ui/button";
import DonationsLoading from "./loading";
import { DataTable } from "@/components/data-table/data-table";
import { donationsTableColumns } from "./columns";
import { getAllDonations } from "@/lib/api";
export const metadata = constructMetadata({
  title: "Donations – School Management System",
  description: "Manage donations in the school system.",
});

export default async function DonationsPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/login");


  // Fetch donations from the server
  const { data: donations, error, count } = await getAllDonations();
  return (
    <>
      <DashboardHeader
        heading="Donations"
        items={[
          { href: "/", label: "Home" },
          { href: "/admin", label: "Admin" },
          { href: "/admin/donations", label: "Donations" },
        ]}
      />
      {donations === null ? (
        <DonationsLoading />
      ) : donations.length === 0 ? (  
      <EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="file" />
        <EmptyPlaceholder.Title>No donations listed</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          You don&apos;t have any donations yet. Start by adding some.
        </EmptyPlaceholder.Description>
        <Button>Add Donations</Button>
      </EmptyPlaceholder>
    ) : (
      <DataTable href="/admin/donations" data={donations} columns={donationsTableColumns} pageCount={count} />
    )}
    </>
  );
}
