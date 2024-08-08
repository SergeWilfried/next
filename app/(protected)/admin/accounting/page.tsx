import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import { Button } from "@/components/ui/button";
import { getAllPayments } from "@/actions/get-payment";
import PaymentsLoading from "./loading";
import { DataTable } from "@/components/data-table/data-table";
import { paymentsTableColumns } from "./columns";

export const metadata = constructMetadata({
  title: "Payments – School Management System",
  description: "Manage payments in the school system.",
});

export default async function PaymentsPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/login");

    // Get all students without pagination
    const { data: payments, count } = await getAllPayments();
  return (
    <>
      <DashboardHeader
        heading="Payments"
        text="Manage payments in the school system."
      />
      {payments === null ? (
        <PaymentsLoading />
      ) : payments.length === 0 ? (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="file" />
          <EmptyPlaceholder.Title>No payments listed</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          You don&apos;t have any payments yet. Start by adding some.
        </EmptyPlaceholder.Description>
          <Button>Add Payments</Button>
        </EmptyPlaceholder>
      ) : (
        <DataTable columns={paymentsTableColumns} data={payments} pageCount={count} />
      )}
    </>
  );
}
