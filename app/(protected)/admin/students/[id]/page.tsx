import { DashboardHeader } from "@/components/dashboard/header";
import EnhancedStudentProfile from "@/components/user-profile/page";

export default function ProfilePage({ params }: { params: { id: string } }) {
  return (
    <>
      <DashboardHeader
        heading="Student Profile"
        items={[
          { href: "/", label: "Home" },
          { href: "/admin", label: "Admin" },
          { href: "/admin/students", label: "Students" },
          { href: `/admin/students/${params.id}`, label: "Profile" },
        ]}
      />
      <EnhancedStudentProfile id={params.id} />
    </>
  )
}
