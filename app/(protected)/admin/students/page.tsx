import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { DashboardHeader } from "@/components/dashboard/header";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import { DataTable } from "@/components/data-table/data-table";
import { studentsTableColumns } from "./columns";
import StudentsLoading from "./loading";
import { NewStudentDialog } from "./add-students-dialog";
import { Button } from "@/components/ui/button";
import { getStudents } from "@/lib/api";

export default async function StudentsPage() {
	const user = await getCurrentUser();
	if (!user || user.role !== "ADMIN") redirect("/login");

	const { data: students, count, error } = await getStudents({
		page: 1,
		limit: 10,
		schoolId: user.schools?.[0]?.id ?? "",
		search: "",
		sort: "asc",
		sortBy: "firstName",
	});

	if (error) {
		console.error('Error fetching students:', error);
		// Handle error state
	}

	return (
		<>
			<DashboardHeader
				heading="Students"
				items={[
					{ href: "/admin", label: "Admin" },
					{ href: "/admin/students", label: "Students" },
				]}
			>
				<NewStudentDialog />
			</DashboardHeader>
			{!students ? (
				<StudentsLoading />
			) : students.length === 0 ? (
				<EmptyPlaceholder>
					<EmptyPlaceholder.Icon name="file" />
					<EmptyPlaceholder.Title>No students listed</EmptyPlaceholder.Title>
					<EmptyPlaceholder.Description>
						You don&apos;t have any students yet. Start by adding some.
					</EmptyPlaceholder.Description>
					<Button>Import from Excel</Button>
				</EmptyPlaceholder>
			) : (
				<DataTable columns={studentsTableColumns} data={students} pageCount={count} />
			)}
		</>
	);
}
