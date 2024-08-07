import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { CreateStudentSchema, UpdateStudentSchema } from "@/lib/validations/student";
import { EnrollmentStatus } from "@prisma/client";


export async function getAllStudents() {
  try {
    const students = await prisma.student.findMany();
    return {
      error: null,
      data: students ?? [],
      count: students.length ?? 0,
    }
  } catch (error) {
    console.error(error)
    return {
      error: error,
      data: null,
    }
  }
}
  export async function updateStatus({ids, status}: {ids: string[], status: string}) {
    try {
       const response = await prisma.student.updateMany({
        where: {
          id: {
            in: ids,
          },
        },
        data: {
          status: status as EnrollmentStatus,
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
  export async function updateStudent(data: UpdateStudentSchema) {
    const { id } = data;
    try {
      const session = await auth();
  
      if (!session?.user || session?.user.id !== id) {
        throw new Error("Unauthorized");
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

  export async function updateGrade({ids, grade}: {ids: string[], grade: string}) {
    try {
      const response = await prisma.student.updateMany({
        where: {
          id: {
            in: ids,
          },
        },
        data: {
          grade: grade,
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

  export async function deleteStudents({ids}: {ids: string[]}) {
    try {
      await prisma.student.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      })
      return {
        error: null,
        data: null,
      }
    } catch (error) {
      console.error(error)
      return {
        error: error,
        data: null,
      }
    }
  }

  export async function createStudent(data: CreateStudentSchema) {
    try {
      const student = await prisma.student.create({
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

  export async function getStudent(userId: string) {
    try {
      const student = await prisma.student.findUnique({
        where: {
          id: userId,
        },
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

  export async function getStudents({page = 1, per_page = 10}: {page?: number, per_page?: number}) {
    try {
      const [students, count] = await Promise.all([
        prisma.student.findMany({
          skip: Math.max(0, (page - 1) * per_page),
          take: per_page,
        }),
        prisma.student.count()
      ])
      console.log(students);
      return {
        error: null,
        data: students,
        pageCount: Math.ceil(count / per_page),
        total: count,
      }
    } catch (error) {
      console.error(error)
      return {
        error: error,
        data: null,
      }
    }
  }

  export async function deleteStudent(userId: string) {
    try {
      const student = await prisma.student.delete({
        where: {
          id: userId,
        },
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
