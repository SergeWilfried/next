import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import { MapClientWrapper } from "@/components/mapview/wrapper";

export const metadata = constructMetadata({
  title: "Map View – School Management System",
  description: "View school locations on a map.",
});

export default async function MapPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/login");

  return (
    <>
      <DashboardHeader
        heading="Carte"
        items={[
          { href: "/", label: "Accueil" },
          { href: "/admin", label: "Admin" },
          { href: "/admin/map", label: "Map" },
        ]}
      />
      <MapClientWrapper />
    </>
  );
}