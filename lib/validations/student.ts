import { z } from "zod"

export const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  parentId: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  middleName: z.string().optional(),
  dateOfBirth: z.string().optional(),
  grade: z.string().optional(),
  schoolId: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  operator: z.enum(["and", "or"]).optional(),
})


export const getStudentsSchema = searchParamsSchema

export type GetStudentsSchema = z.infer<typeof getStudentsSchema>

export const createStudentSchema = z.object({
  parentId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string().optional(),
  dateOfBirth:  z.date({
    required_error: "A date of birth is required.",
  }),
  grade: z.string(),
  allergies: z.string().optional(),
  medicalNotes: z.string().optional(),
  schoolId: z.string(),
})

export type CreateStudentSchema = z.infer<typeof createStudentSchema>

export const updateStudentSchema = z.object({
  id: z.string(),
  parentId: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  middleName: z.string().optional(),
  dateOfBirth: z.coerce.date().optional(),
  grade: z.string().optional(),
  allergies: z.string().optional(),
  medicalNotes: z.string().optional(),
  schoolId: z.string().optional(),
})

export type UpdateStudentSchema = z.infer<typeof updateStudentSchema>