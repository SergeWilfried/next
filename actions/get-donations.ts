import { prisma } from "@/lib/db";

export async function getAllDonations() {
    try {
        const donations = await prisma.donation.findMany();
        return { data: donations, error: null, count: donations.length };
    } catch (error) {
        console.error("Error fetching donations:", error);
        return { data: [], error: "Failed to fetch donations", count: 0 };
    }
}
