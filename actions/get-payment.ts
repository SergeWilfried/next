import { prisma } from "@/lib/db";


export async function getAllPayments() {
  try {
    const payments = await prisma.payment.findMany();
    return {
      error: null,
      data: payments ?? [],
      count: payments.length ?? 0,
    }
  } catch (error) {
    console.error(error)
    return {
      error: error,
      data: null,
    }
  }
}