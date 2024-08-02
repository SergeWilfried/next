import { z } from "zod"
import { PaymentStatus, PaymentMethod } from "@prisma/client"

export const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  enrollmentId: z.string().optional(),
  status: z.nativeEnum(PaymentStatus).optional(),
  paymentMethod: z.nativeEnum(PaymentMethod).optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  operator: z.enum(["and", "or"]).optional(),
})

export const getPaymentsSchema = searchParamsSchema

export type GetPaymentsSchema = z.infer<typeof getPaymentsSchema>

export const createPaymentSchema = z.object({
  enrollmentId: z.string(),
  amount: z.number().positive(),
  status: z.nativeEnum(PaymentStatus),
  paymentDate: z.date(),
  paymentMethod: z.nativeEnum(PaymentMethod),
})

export type CreatePaymentSchema = z.infer<typeof createPaymentSchema>

export const updatePaymentSchema = z.object({
  amount: z.number().positive().optional(),
  status: z.nativeEnum(PaymentStatus).optional(),
  paymentDate: z.date().optional(),
  paymentMethod: z.nativeEnum(PaymentMethod).optional(),
})

export type UpdatePaymentSchema = z.infer<typeof updatePaymentSchema>
