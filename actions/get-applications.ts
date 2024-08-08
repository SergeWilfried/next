import { prisma } from "@/lib/db";

export async function getApplications() {
 try {
  const applications = await prisma.application.findMany();
  return {
    data: applications,
    count: applications.length,
    error: null,
  };
 } catch (error) {
    console.error(error);
    return {
      data: [],
      count: 0,
      error: "Failed to fetch applications",
    };
  }
}