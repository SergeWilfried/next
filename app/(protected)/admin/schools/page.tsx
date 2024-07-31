import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import { Button } from "@/components/ui/button";

export const metadata = constructMetadata({
  title: "Schools – School Management System",
  description: "Manage schools in the school system.",
});

export default async function SchoolsPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/login");

  return (
    <>
      <DashboardHeader
        heading="Schools"
        text="Manage schools in the school system."
      />
      <EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="file" />
        <EmptyPlaceholder.Title>No schools listed</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          You don't have any schools yet. Start by adding some.
        </EmptyPlaceholder.Description>
        <Button>Add Schools</Button>
      </EmptyPlaceholder>
    </>
  );
}
