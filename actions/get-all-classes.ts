import { prisma } from "@/lib/db";


export async function getAllClasses() {
  try {
    const classes = await prisma.class.findMany();
    return {
        data: classes,
        error: null,
        count: classes.length,
    };
  } catch (error) {
    console.error(error);
    return {
        data: [],
        error: "Failed to fetch classes",
        count: 0,
    };
  }
}
