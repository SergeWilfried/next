import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { 
  getParentsSchema, 
  createParentSchema, 
  updateParentSchema 
} from '@/lib/validations/parents';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = createParentSchema.parse(body);
    const { schoolId, ...parentData } = validatedData;

    const parent = await prisma.parent.create({
      data: {
        firstName: parentData.firstName,
        lastName: parentData.lastName,
        middleName: parentData.middleName,
        gender: parentData.gender,
        dateOfBirth: parentData.dateOfBirth,
        maritalStatus: parentData.maritalStatus,
        phoneNumber: parentData.phoneNumber,
        communicationPreference: parentData.communicationPreference,
        emergencyContacts: parentData.emergencyContacts,
        address: {
          create: parentData.address,
        },
        school: {
          connect: { id: schoolId },
        },
        user: {
          connect: { id: parentData.userId },
        },
      },
    });
    return NextResponse.json(parent);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const validatedParams = getParentsSchema.parse(Object.fromEntries(searchParams));
    
    const parents = await prisma.parent.findMany({
      where: {
        id: validatedParams.id,
        phoneNumber: validatedParams.phoneNumber,
        communicationPreference: validatedParams.communicationPreference,
        schoolId: validatedParams.schoolId,
      },
      take: validatedParams.per_page,
      skip: (validatedParams.page - 1) * validatedParams.per_page,
    });
    
    return NextResponse.json(parents);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

    const body = await req.json();
    const validatedData = updateParentSchema.parse(body);
    const { address, ...otherData } = validatedData;

    const parent = await prisma.parent.update({
      where: { id },
      data: {
        ...otherData,
        address: address ? {
          update: address
        } : undefined
      }
    });

    return NextResponse.json(parent);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

  await prisma.parent.delete({ where: { id } });
  return NextResponse.json({ message: 'Parent deleted' });
}
