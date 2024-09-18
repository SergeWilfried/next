import { Payment } from "@prisma/client";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';

export async function getAllPayments(
  page: number = 1,
  limit: number = 10,
  sortBy: string = 'createdAt',
  sortOrder: 'asc' | 'desc' = 'desc',
  filters: Record<string, string> = {}
): Promise<{ data: Payment[] | null; count: number; error: Error | null }> {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sortBy,
      sortOrder,
      ...filters,
    });

    const response = await fetch(`${baseUrl}/api/payments?${queryParams}`);
    if (!response.ok) {
      throw new Error('Failed to fetch payments');
    }
    const payments = await response.json();
    return payments;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getPaymentById(id: string) : Promise<{ data: Payment | null, error: Error | null }> {
    try {
        const response = await fetch(`${baseUrl}/api/payments/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch payment');
        }
        const payment = await response.json();
        return payment;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function createPayment(payment: Payment) : Promise<{ data: Payment | null, error: Error | null }> {
    try {
        const response = await fetch(`${baseUrl}/api/payments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payment)
        });
        if (!response.ok) {
            throw new Error('Failed to create payment');
        }
        const createdPayment = await response.json();
        return createdPayment;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function updatePayment(id: string, payment: Payment) : Promise<{ data: Payment | null, error: Error | null }> {
    try {
        const response = await fetch(`${baseUrl}/api/payments/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payment)
        });
        if (!response.ok) {
            throw new Error('Failed to update payment');
        }
        const updatedPayment = await response.json();
        return updatedPayment;
    } catch (error) {
        console.error(error);
        throw error;
    }
}        
