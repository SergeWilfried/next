import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Fetch all staff members
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const schoolId = searchParams.get('schoolId');

  if (schoolId && !Number.isInteger(Number(schoolId))) {
    return NextResponse.json({ error: 'Invalid schoolId' }, { status: 400 });
  }

  try {
    const staff = await prisma.staff.findMany({
      where: schoolId ? { schoolId } : undefined,
      include: {
        school: true,
        Course: true,
        Class: true,
      },
    });
    return NextResponse.json(staff);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch staff' }, { status: 500 });
  }
}

// POST: Create a new staff member
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['position', 'name', 'email', 'schoolId'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 });
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }
    const newStaff = await prisma.staff.create({
      data: {
        position: body.position,
        department: body.department,
        name: body.name,
        email: body.email,
        phoneNumber: body.phoneNumber,
        school: {
          connect: { id: body.schoolId }
        },
        schoolId: body.schoolId,
        classId: body.classId,
        user: {
          connect: { id: body.userId }
        }
      },
      include: {
        school: true,
        Course: true,
        Class: true,
      },
    });
    return NextResponse.json(newStaff, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create staff member' }, { status: 500 });
  }
}

// PUT: Update a staff member
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: 'Staff ID is required' }, { status: 400 });
    }

    // Validate email format if provided
    if (updateData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(updateData.email)) {
        return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
      }
    }

    const updatedStaff = await prisma.staff.update({
      where: { id },
      data: updateData,
      include: {
        school: true,
        Course: true,
        Class: true,
      },
    });
    return NextResponse.json(updatedStaff);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update staff member' }, { status: 500 });
  }
}

// DELETE: Remove a staff member
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Staff ID is required' }, { status: 400 });
  }

  if (!Number.isInteger(Number(id))) {
    return NextResponse.json({ error: 'Invalid staff ID' }, { status: 400 });
  }

  try {
    await prisma.staff.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Staff member deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete staff member' }, { status: 500 });
  }
}
