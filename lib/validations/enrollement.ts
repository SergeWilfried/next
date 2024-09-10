import { z } from "zod"

export const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  parentId: z.string().optional(),
  studentId: z.string().optional(),
  academicYear: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "GRADUATED"]).optional(),
  classId: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  operator: z.enum(["and", "or"]).optional(),
})

export const getEnrollmentsSchema = searchParamsSchema

export type GetEnrollmentsSchema = z.infer<typeof getEnrollmentsSchema>

export const createEnrollmentSchema = z.object({
  classId: z.string(),
  parentId: z.string(),
  studentId: z.string(),
  academicYear: z.string(),
  status: z.enum(["ACTIVE", "INACTIVE", "GRADUATED"]),
  schoolId: z.string(),
  totalFee: z.number(),
})

export type CreateEnrollmentSchema = z.infer<typeof createEnrollmentSchema>

export const updateEnrollmentSchema = z.object({
  id: z.string(),
  academicYear: z.string().optional(),
  grade: z.number().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "GRADUATED"]).optional(),
  totalFee: z.number().optional(),
  paidAmount: z.number().optional(),
})

export type UpdateEnrollmentSchema = z.infer<typeof updateEnrollmentSchema>
