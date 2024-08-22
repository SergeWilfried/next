import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import InfoCard from "@/components/dashboard/info-card";
import TransactionsList from "@/components/dashboard/transactions-list";
import { AttendanceChartComponent } from "@/components/charts/attendance-chart";
export const metadata = constructMetadata({
  title: "Admin – GesCo",
  description: "Admin page for only admin management.",
});

export default async function AdminPage() {
  const attendanceData = [
    { month: "January", present: 186, absent: 80 },
    { month: "February", present: 305, absent: 200 },
    { month: "March", present: 237, absent: 120 },
    { month: "April", present: 73, absent: 190 },
    { month: "May", present: 209, absent: 130 },
    { month: "June", present: 214, absent: 140 },
  ]
  
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/login");

  return (
    <>
      <DashboardHeader
        heading="Admin Panel"
        text="Access only for users with ADMIN role."
      />
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <InfoCard title="Total Students" value="1,234" type="students" change="+5% from last year" />
          <InfoCard title="Total Teachers" value="78" type="teachers" change="+2 since last year" />
          <InfoCard title="New Enrollments" value="156" type="students" change="+12% this year" />
          <InfoCard title="Monthly Revenue" value="$125,000" type="accounting" change="+8% from last month" />
        </div>
        <div className="flex flex-col gap-5 md:flex-row md:justify-between">
          <div className="w-full md:w-[50%]">
            <AttendanceChartComponent title="Attendance" data={attendanceData} />
          </div>
          <div className="w-full md:w-[50%]">
            <TransactionsList />
          </div>
        </div>
      </div>
    </>
  );
}