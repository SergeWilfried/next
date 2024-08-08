import { prisma } from "@/lib/db";


export async function getAllEnrollment() {
    try {
        const enrollments = await prisma.enrollment.findMany();
        return { data: enrollments, error: null, count: enrollments.length };
    } catch (error) {
        console.error("Error fetching enrollments:", error);
        return { data: [], error: "Failed to fetch enrollments", count: 0 };
    }
}