import { prisma } from "@/lib/db";


export async function getAllGrades() {
  try {
    const grades = await prisma.grade.findMany();
    return {
        data: grades,
        error: null,
        count: grades.length,
    };
  } catch (error) {
    console.error(error);
    return {
        data: [],
        error: "Failed to fetch grades",
        count: 0,
    };
  }
}