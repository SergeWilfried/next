import { z } from "zod"
import { ApplicationStatus } from "@prisma/client"

export const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  studentName: z.string().optional(),
  grade: z.string().optional(),
  status: z.nativeEnum(ApplicationStatus).optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  operator: z.enum(["and", "or"]).optional(),
})

export const getApplicationsSchema = searchParamsSchema

export type GetApplicationsSchema = z.infer<typeof getApplicationsSchema>

export const createApplicationSchema = z.object({
  studentName: z.string(),
  grade: z.string(),
  status: z.nativeEnum(ApplicationStatus),
  applicationDate: z.date(),
  schoolId: z.string(),
})

export type CreateApplicationSchema = z.infer<typeof createApplicationSchema>

export const updateApplicationSchema = z.object({
  studentName: z.string().optional(),
  grade: z.string().optional(),
  status: z.nativeEnum(ApplicationStatus).optional(),
  applicationDate: z.date().optional(),
})

export type UpdateApplicationSchema = z.infer<typeof updateApplicationSchema>
