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
    const parent = await prisma.parent.create({ data: validatedData });
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
    const parent = await prisma.parent.update({ where: { id }, data: validatedData });
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
