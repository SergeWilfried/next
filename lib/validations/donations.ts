import { z } from "zod"

export const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  donorName: z.string().optional(),
  amount: z.number().optional(),
  donationType: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  operator: z.enum(["and", "or"]).optional(),
})

export const getDonationsSchema = searchParamsSchema

export type GetDonationsSchema = z.infer<typeof getDonationsSchema>

export const createDonationSchema = z.object({
  donorName: z.string(),
  amount: z.number().positive(),
  donationType: z.string(),
  donationDate: z.date(),
  schoolId: z.string(),
  studentId: z.string().optional(),
})

export type CreateDonationSchema = z.infer<typeof createDonationSchema>

export const updateDonationSchema = z.object({
  donorName: z.string().optional(),
  amount: z.number().positive().optional(),
  donationType: z.string().optional(),
  donationDate: z.date().optional(),
  studentId: z.string().optional(),
  schoolId: z.string().optional(),
})

export type UpdateDonationSchema = z.infer<typeof updateDonationSchema>
