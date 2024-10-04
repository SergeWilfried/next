import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import {
  getPaymentsSchema,
  createPaymentSchema,
  updatePaymentSchema,
} from "@/lib/validations/payment";

export async function GET(request: NextRequest) {
  try {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const validatedParams = getPaymentsSchema.parse(searchParams);

    // Implement pagination, filtering, and sorting logic here
    const payments = await prisma.payment.findMany({
      // Add query options based on validatedParams
    });

    return NextResponse.json(payments);
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
    const validatedData = createPaymentSchema.parse(body);

    const payment = await prisma.payment.create({
      data: validatedData,
    });

    return NextResponse.json(payment, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    const validatedData = updatePaymentSchema.parse(updateData);
    const existingPayment = await prisma.payment.findUnique({
      where: { id },
    });
    if (!existingPayment) {
      throw new Error(`Payment with id ${id} not found`);
    }
    const payment = await prisma.payment.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(payment);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
