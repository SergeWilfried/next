import { z } from "zod"

export const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  name: z.string().optional(),
  position: z.string().optional(),
  department: z.string().optional(),
  email: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  operator: z.enum(["and", "or"]).optional(),
})

export const getStaffSchema = searchParamsSchema

export type GetStaffSchema = z.infer<typeof getStaffSchema>

export const createStaffSchema = z.object({
  name: z.string(),
  position: z.string(),
  department: z.string().optional(),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
  schoolId: z.string(),
  classId: z.string().optional(),
})

export type CreateStaffSchema = z.infer<typeof createStaffSchema>

export const updateStaffSchema = z.object({
  id: z.string().min(1),
  name: z.string().optional(),
  position: z.string().optional(),
  department: z.string().optional(),
  email: z.string().email().optional(),
  phoneNumber: z.string().optional(),
  classId: z.string().optional(),
})

export type UpdateStaffSchema = z.infer<typeof updateStaffSchema>
