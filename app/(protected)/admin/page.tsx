import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import InfoCard from "@/components/dashboard/info-card";
import TransactionsList from "@/components/dashboard/transactions-list";
import { AttendanceChartComponent } from "@/components/charts/attendance-chart";
export const metadata = constructMetadata({
  title: "Admin – Gesco",
  description: "Page d'administration réservée à la gestion administrative.",
});

export default async function AdminPage() {
  const attendanceData = [
    { month: "Janvier", present: 186, absent: 80 },
    { month: "Février", present: 305, absent: 200 },
    { month: "Mars", present: 237, absent: 120 },
    { month: "Avril", present: 73, absent: 190 },
    { month: "Mai", present: 209, absent: 130 },
    { month: "Juin", present: 214, absent: 140 },
  ]
  
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role === "USER" || user.role === 'PARENT') {
    redirect("/dashboard");
  } 
  return (
    <>
      <DashboardHeader
        heading="Panneau d'administration"
        text="Accès réservé aux utilisateurs ayant le rôle ADMINISTRATEUR."
      />
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <InfoCard title="Total des étudiants" value="1,234" type="students" change="+5% par rapport à l'année dernière" />
          <InfoCard title="Total des enseignants" value="78" type="teachers" change="+2 depuis l'année dernière" />
          <InfoCard title="Nouvelles inscriptions" value="156" type="students" change="+12% cette année" />
          <InfoCard title="Revenu mensuel" value="125 000 €" type="accounting" change="+8% par rapport au mois dernier" />
        </div>
        <div className="flex flex-col gap-5 md:flex-row md:justify-between">
          <div className="h-[300px] w-full sm:h-[400px] md:w-1/2 lg:h-[500px] xl:h-[600px]">
            <AttendanceChartComponent title="Présence" data={attendanceData} />
          </div>
          <div className="h-[300px] w-full sm:h-[400px] md:w-1/2 lg:h-[500px] xl:h-[600px]">
            <TransactionsList />
          </div>
        </div>
      </div>
    </>
  );
}