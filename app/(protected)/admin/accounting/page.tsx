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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DonutChartComponent } from "@/components/charts/donut";
import { InteractiveBarChart } from "@/components/charts/interactive-bar-chart";
import { LineChartComponent } from "@/components/charts/line-chart";

export const metadata = constructMetadata({
  title: "Accounting – School Management System",
  description: "Manage payments in the school system.",
});

export default async function PaymentsPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/login");

  const { data: payments, count } = await getAllPayments();
  
  // Add these new calculations
  const totalRevenue = payments ? payments.reduce((sum, payment) => sum + payment.amount, 0) : 0;
  const expectedRevenue = 1000000; // This should be fetched from your database or calculated based on your business logic
  const revenueProgress = (totalRevenue / expectedRevenue) * 100;
  const averagePayment = totalRevenue / 5;
  const paymentsByMonth = {}; // Logic to group payments by month
  const paymentsByCategory = {}; // Logic to group payments by category

  return (
    <>
      <DashboardHeader
        heading="Payments"
        text="Manage payments and view financial health of the school."
      />
      
      {/* Add this new card for revenue progress */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Revenue Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChartComponent 
            value={revenueProgress} 
            max={100} 
            className="mb-2 h-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Current: ${totalRevenue.toFixed(2)}</span>
            <span>Expected: ${expectedRevenue.toFixed(2)}</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {revenueProgress.toFixed(1)}% of expected revenue collected
          </p>
        </CardContent>
      </Card>

      {/* Existing cards and charts */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${averagePayment.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{5}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95%</div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <InteractiveBarChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Payment Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChartComponent />
          </CardContent>
        </Card>
      </div>

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