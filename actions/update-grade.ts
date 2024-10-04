import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { UpdateGradeSchema } from "@/lib/validations/grade";

export async function updateGrade(data: UpdateGradeSchema) {
    const { id } = data;
    try {
      const session = await auth();
  
      if (!session?.user) {
        throw new Error("Unauthorized");
      }

      const response = await prisma.grade.update({
        where: {
          id: id,
        },
        data: data,
      })

      return {
        error: null,
        data: response,
      }
    } catch (error) {
      console.error(error)
      return {
        error: error,
        data: null,
      }
    }
}
