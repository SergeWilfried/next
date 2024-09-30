import EnhancedStudentProfile from "@/components/user-profile/page";

export default function ProfilePage({ params }: { params: { id: string } }) {
  return (
    <EnhancedStudentProfile id={params.id} />
  )
}
