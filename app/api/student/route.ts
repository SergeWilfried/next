import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { createStudentSchema, getStudentsSchema, updateStudentSchema } from '@/lib/validations/student';

const prisma = new PrismaClient();

// Create a new student
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = createStudentSchema.parse(body);

    const student = await prisma.student.create({
      data: {
        ...validatedData,
        dateOfBirth: new Date(validatedData.dateOfBirth),
      },
    });
    return NextResponse.json(student);
  } catch (error) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Error creating student' }, { status: 500 });
  }
}

// Get all students or a specific student
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const validatedParams = getStudentsSchema.parse(Object.fromEntries(searchParams));

    const students = await prisma.student.findMany({
      where: {
        parentId: validatedParams.parentId,
        firstName: validatedParams.firstName,
        lastName: validatedParams.lastName,
        middleName: validatedParams.middleName,
        dateOfBirth: validatedParams.dateOfBirth ? new Date(validatedParams.dateOfBirth) : undefined,
        classId: validatedParams.grade,
        schoolId: validatedParams.schoolId,
      },
      include: { parent: true, school: true },
      take: validatedParams.per_page,
      skip: (validatedParams.page - 1) * validatedParams.per_page,
      orderBy: validatedParams.sort ? { [validatedParams.sort]: 'asc' } : undefined,
    });
    return NextResponse.json(students);
  } catch (error) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Error fetching students' }, { status: 500 });
  }
}

// Update a student
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const validatedData = updateStudentSchema.parse(body);

    const updatedStudent = await prisma.student.update({
      where: { id: validatedData.id },
      data: {
        ...validatedData,
        dateOfBirth: validatedData.dateOfBirth ? new Date(validatedData.dateOfBirth) : undefined,
      },
    });
    return NextResponse.json(updatedStudent);
  } catch (error) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Error updating student' }, { status: 500 });
  }
}

// Delete a student
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Student ID is required' }, { status: 400 });
    }

    await prisma.student.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Student deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting student' }, { status: 500 });
  }
}
