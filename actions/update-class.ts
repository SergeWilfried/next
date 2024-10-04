import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { UpdateClassSchema } from "@/lib/validations/class";

export async function updateClass(data: UpdateClassSchema) {
    const { id } = data;
    try {
      const session = await auth();
  
      if (!session?.user) {
        throw new Error("Unauthorized");
      }

      const response = await prisma.class.update({
        where: {
          id: id,
        },
        data: {
          ...data,
          students: data.students ? {
            set: data.students.map(id => ({ id }))
          } : undefined,
          enrollments: data.enrollments ? {
            set: data.enrollments.map(id => ({ id }))
          } : undefined,
          applications: data.applications ? {
            set: data.applications.map(id => ({ id }))
          } : undefined,
          teachers: data.teachers ? {
            set: data.teachers.map(id => ({ id }))
          } : undefined,
          courses: data.courses ? {
            set: data.courses.map(id => ({ id }))
          } : undefined,
          grades: data.grades ? {
            set: data.grades.map(id => ({ id }))
          } : undefined,
        },
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
