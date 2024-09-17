import { z } from "zod"

export const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  id: z.string().optional(),
  phoneNumber: z.string().optional(),
  communicationPreference: z.enum(["SMS", "WHATSAPP", "PHONE"]).optional(),
  schoolId: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  operator: z.enum(["and", "or"]).optional(),
})

export const getParentsSchema = searchParamsSchema

export type GetParentsSchema = z.infer<typeof getParentsSchema>

export const createParentSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string().optional(),
  studentId: z.string(),
  phoneNumber: z.string(),
  communicationPreference: z.enum(["SMS", "WHATSAPP", "PHONE"]),
  emergencyContacts: z.array(z.object({
    name: z.string(),
    relationship: z.string(),
    phoneNumber: z.string(),
  })),
  schoolId: z.string(),
})

export type CreateParentSchema = z.infer<typeof createParentSchema>

export const updateParentSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string().optional(),
  phoneNumber: z.string().optional(),
  communicationPreference: z.enum(["SMS", "WHATSAPP", "PHONE"]).optional(),
  address: z.string().optional(),
  emergencyContacts: z.array(z.object({
    name: z.string(),
    relationship: z.string(),
    phoneNumber: z.string(),
  })).optional(),
  schoolId: z.string().optional(),
  studentId: z.string().optional(),
})

export type UpdateParentSchema = z.infer<typeof updateParentSchema>
