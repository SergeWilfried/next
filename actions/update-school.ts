import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { UpdateSchoolSchema } from "@/lib/validations/school";

export async function updateSchool(data: UpdateSchoolSchema) {
    const { id } = data;
    try {
      const session = await auth();
  
      if (!session?.user) {
        throw new Error("Unauthorized");
      }

      const response = await prisma.school.update({
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
