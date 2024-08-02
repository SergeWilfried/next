import { z } from "zod"

export const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  name: z.string().optional(),
  address: z.string().optional(),
  phoneNumber: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  operator: z.enum(["and", "or"]).optional(),
})

export const getSchoolsSchema = searchParamsSchema

export type GetSchoolsSchema = z.infer<typeof getSchoolsSchema>

export const createSchoolSchema = z.object({
  name: z.string(),
  address: z.string(),
  phoneNumber: z.string(),
})

export type CreateSchoolSchema = z.infer<typeof createSchoolSchema>

export const updateSchoolSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  phoneNumber: z.string().optional(),
})

export type UpdateSchoolSchema = z.infer<typeof updateSchoolSchema>
