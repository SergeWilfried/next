import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import MapView from "@/components/mapview/page";

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
        heading="Map View"
        items={[
          { href: "/", label: "Home" },
          { href: "/admin", label: "Admin" },
          { href: "/admin/map", label: "Map" },
        ]}
      />
      <MapView />
    </>
  );
}
