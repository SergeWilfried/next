import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import { Button } from "@/components/ui/button";

export const metadata = constructMetadata({
  title: "Donations – School Management System",
  description: "Manage donations in the school system.",
});

export default async function DonationsPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/login");

  return (
    <>
      <DashboardHeader
        heading="Donations"
        text="Manage donations in the school system."
      />
      <EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="file" />
        <EmptyPlaceholder.Title>No donations listed</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          You don't have any donations yet. Start by adding some.
        </EmptyPlaceholder.Description>
        <Button>Add Donations</Button>
      </EmptyPlaceholder>
    </>
  );
}
