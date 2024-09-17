import { NextResponse } from 'next/server';
import { PrismaClient, SchoolCategory, SchoolType } from '@prisma/client';
import { createSchoolSchema } from '@/lib/validations/school';

const prisma = new PrismaClient();

// Create a new student
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = createSchoolSchema.parse(body);
    const school = await prisma.school.create({
      data: {
        ...validatedData,
        userId: body.userId, // Assuming userId is provided in the request body
        category: validatedData.category as SchoolCategory,
        type: validatedData.type as SchoolType, // Explicitly cast type to SchoolType
      },
    });
    return NextResponse.json(school);
  } catch (error) {
    console.error('Error creating school:', error);
    return NextResponse.error();
  }
}


export async function GET(req: Request) {
  try {
    // get the user id from the request url 
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const schools = await prisma.school.findMany({
      where: {
        userId: userId,
      },
    });
    return NextResponse.json({
        data: schools,
        count: schools.length,
        error: null,
    });
  } catch (error) {
    console.error('Error fetching schools:', error);
    return NextResponse.json({
        data: null,
        count: 0,
        error: error,
    });
  }
}
