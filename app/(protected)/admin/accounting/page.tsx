import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import { getAllPayments } from "@/actions/get-payment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChartComponent } from "@/components/charts/pie-chart-interactive";
import TransactionsList from "@/components/dashboard/transactions-list";

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
  const paymentsByMonth = [
    { month: "January", paid: 1000, due: 1000 },
    { month: "February", paid: 1000, due: 1000 },
    { month: "March", paid: 1000, due: 1000 },
    { month: "April", paid: 1000, due: 1000 },
    { month: "May", paid: 1000, due: 1000 },
    { month: "June", paid: 1000, due: 1000 },
    { month: "July", paid: 1000, due: 1000 },
    { month: "August", paid: 1000, due: 1000 },
    { month: "September", paid: 1000, due: 1000 },
    { month: "October", paid: 1000, due: 1000 },
    { month: "November", paid: 1000, due: 1000 },
    { month: "December", paid: 1000, due: 1000 },
  ]; // Logic to group payments by month
  const thisMonth = (month: string) => {
    const currentMonth = paymentsByMonth.find(m => m.month === month) ?? { paid: 0, due: 0 };
    const previousMonthIndex = paymentsByMonth.findIndex(m => m.month === month) - 1;
    const previousMonth = previousMonthIndex >= 0 ? paymentsByMonth[previousMonthIndex] : { paid: 0, due: 0 };
    return {
      paid: currentMonth.paid,
      due: currentMonth.due,
      // compare to previous month
    trend: currentMonth.paid / previousMonth.paid
    }
  };
  return (
    <>
      <DashboardHeader
        heading="Financial Overview"
        text="Key metrics and trends for the school's financial health."
      />   

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
            <CardTitle>Payments By Month</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChartComponent data={paymentsByMonth} />
          </CardContent>
        </Card>
        <TransactionsList />
      </div>
    </>
  );
}