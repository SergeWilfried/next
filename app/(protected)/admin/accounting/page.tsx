import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import { getAllPayments } from "@/actions/get-payment";
import { InfoCard } from "@/components/dashboard/info-card";
import { PieChartComponent } from "@/components/charts/pie-chart-interactive";
import TransactionsList from "@/components/dashboard/transactions-list";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
  const txCount = count ? count : 0;
  const averagePayment = totalRevenue / txCount;
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

      {/* Updated cards using InfoCard component */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <InfoCard
          title="Total Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          icon="dollar-sign"
        />
        <InfoCard
          title="Average Payment"
          value={`$${averagePayment.toFixed(2)}`}
          icon="credit-card"
        />
        <InfoCard
          title="Total Payments"
          value={txCount.toString()}
          icon="file-text"
        />
        <InfoCard
          title="Payment Rate"
          value="95%"
          icon="percent"
        />
      </div>

      <div className="flex flex-col gap-5 md:flex-row md:justify-between">
        <div className="w-full md:w-[50%]">
          <Card>
            <CardHeader>
              <CardTitle>Payments By Month</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChartComponent data={paymentsByMonth} />
          </CardContent>
        </Card>
        <div className="w-full md:w-[50%]">
          <TransactionsList />
        </div>
        </div>
      </div>
    </>
  );
}