import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { UpdateStudentSchema } from "@/lib/validations/student";

export async function updateStudent(data: UpdateStudentSchema) {
    const { id } = data;
    try {
      const session = await auth();
  
      if (!session?.user || session?.user.id !== id) {
        throw new Error("Unauthorized");
      }

      const existingStudent = await prisma.student.findUnique({
        where: { id: id },
      });
      if (!existingStudent) {
        throw new Error(`Student with id ${id} not found`);
      }

      const student = await prisma.student.update({
        where: {
          id: id,
        },
        data: data,
      })

      return {
        error: null,
        data: student,
      }
    } catch (error) {
      console.error(error)
      return {
        error: error,
        data: null,
      }
    }
}
