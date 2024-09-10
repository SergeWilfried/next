import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import {
  getApplicationsSchema,
  createApplicationSchema,
  updateApplicationSchema,
} from "@/lib/validations/applications";

export async function GET(request: NextRequest) {
  try {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const validatedParams = getApplicationsSchema.parse(searchParams);

    const { page, per_page, sort, studentName, grade, status, from, to, operator } = validatedParams;

    const applications = await prisma.application.findMany({
      where: {
        ...(studentName && { studentName: { contains: studentName, mode: 'insensitive' } }),
        ...(grade && { grade }),
        ...(status && { status }),
        ...(from && to && {
          applicationDate: {
            gte: new Date(from),
            lte: new Date(to),
          },
        }),
      },
      orderBy: sort ? { [sort]: 'asc' } : undefined,
      skip: (page - 1) * per_page,
      take: per_page,
    });

    const total = await prisma.application.count();

    return NextResponse.json({
      data: applications,
      meta: {
        total,
        page,
        per_page,
        total_pages: Math.ceil(total / per_page),
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createApplicationSchema.parse(body);

    const application = await prisma.application.create({
      data: {
        ...validatedData,
      },
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    const validatedData = updateApplicationSchema.parse(updateData);

    const application = await prisma.application.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(application);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    await prisma.application.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Application deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
