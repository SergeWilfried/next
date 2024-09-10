import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import {
  getDonationsSchema,
  createDonationSchema,
  updateDonationSchema,
} from "@/lib/validations/donations";

export async function GET(request: NextRequest) {
  try {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const validatedParams = getDonationsSchema.parse(searchParams);

    const { page, per_page, sort, donorName, amount, donationType, from, to, operator } = validatedParams;

    const donations = await prisma.donation.findMany({
      where: {
        ...(donorName && { donorName: { contains: donorName, mode: 'insensitive' } }),
        ...(amount && { amount }),
        ...(donationType && { donationType }),
        ...(from && to && {
          donationDate: {
            gte: new Date(from),
            lte: new Date(to),
          },
        }),
      },
      orderBy: sort ? { [sort]: 'asc' } : undefined,
      skip: (page - 1) * per_page,
      take: per_page,
    });

    const total = await prisma.donation.count();

    return NextResponse.json({
      data: donations,
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
    const validatedData = createDonationSchema.parse(body);

    const donation = await prisma.donation.create({
      data: {
        ...validatedData,
        /// FIXME: parentId is not defined
        date: validatedData.donationDate,
      },
    });

    return NextResponse.json(donation, { status: 201 });
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
    const validatedData = updateDonationSchema.parse(updateData);

    const donation = await prisma.donation.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(donation);
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

    await prisma.donation.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Donation deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
