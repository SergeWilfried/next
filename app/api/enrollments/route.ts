import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { createEnrollmentSchema, getEnrollmentsSchema, updateEnrollmentSchema } from '@/lib/validations/enrollement'

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const body = createEnrollmentSchema.parse(json)
    const enrollment = await prisma.enrollment.create({
      data: {
        academicYear: { connect: { id: body.academicYear } },
        class: { connect: { id: body.classId } },
        parent: { connect: { id: body.parentId } },
        school: { connect: { id: body.schoolId } },
        student: { connect: { id: body.studentId } },
        status: body.status
      },
    })
    return NextResponse.json(enrollment)
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const params = getEnrollmentsSchema.parse(Object.fromEntries(searchParams))
  
  // Implement filtering, sorting, and pagination logic here
  const enrollments = await prisma.enrollment.findMany(/* Add query options */)
  
  return NextResponse.json(enrollments)
}

export async function PUT(req: Request) {
  try {
    const json = await req.json()
    const { id, ...updateData } = updateEnrollmentSchema.parse(json)
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: { id },
    });
    if (!existingEnrollment) {
      throw new Error(`Enrollment with id ${id} not found`);
    }
    const enrollment = await prisma.enrollment.update({
      where: { id },
      data: {
        ...updateData,
        academicYear: {
          connect: { id: updateData.academicYear }
        }
      },
    })
    return NextResponse.json(enrollment)
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
