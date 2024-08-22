import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import { getAllPayments } from "@/actions/get-payment";
import InfoCard from "@/components/dashboard/info-card";
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
  const txCount = count ? count : 0;
  const averagePayment = txCount > 0 ? totalRevenue / txCount : 0;

  const paymentsByMonth = [
      { month: "january", paid: 250000, due: 100000, fill: "var(--color-january)" },
      { month: "february", paid: 305000, due: 150000, fill: "var(--color-february)" },
      { month: "march", paid: 237000, due: 120000, fill: "var(--color-march)" },
      { month: "april", paid: 173000, due: 100000, fill: "var(--color-april)" },
      { month: "may", paid: 209000, due: 150000, fill: "var(--color-may)" },
  ]; 
  // Logic to group payments by month
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <InfoCard
          title="Total Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          type="dollarSign"
          change="+18% from last month"
        />
        <InfoCard
          title="Average Payment"
          value={`$${isNaN(averagePayment) ? '0.00' : averagePayment.toFixed(2)}`}
          type="accounting"
          change="+18% from last month"
        />
        <InfoCard
          title="Total Payments"
          value={txCount.toString()}
          type="fileText"
          change="+18% from last month"
        />
        <InfoCard
          title="Payment Rate"
          value={`${(totalRevenue / expectedRevenue) * 100}%`}
          type="percent"
          change="+8% from last month"
        />
      </div>

      <div className="flex flex-col gap-5 md:flex-row md:justify-between">
          <div className="w-full md:w-[50%]">
            <PieChartComponent title="Monthly Payments" data={paymentsByMonth} />
          </div>
          <div className="w-full md:w-[50%]">
            <TransactionsList />
          </div>
        </div>
    </>
  );
}