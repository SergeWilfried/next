import { prisma } from "@/lib/db";

export async function getAllReports() {
    try {
        const reports = await prisma.report.findMany();
        return { data: reports, error: null, count: reports.length };
    } catch (error) {
        return { data: [], error: "Failed to fetch reports", count: 0 };
    }
}