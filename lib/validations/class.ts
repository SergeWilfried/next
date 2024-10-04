

import * as z from "zod"

export const classSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Class name is required").max(100, "Class name must be 100 characters or less"),
  description: z.string().max(500, "Description must be 500 characters or less").optional(),
  schoolId: z.string().min(1, "School ID is required"),
  students: z.array(z.string()).optional(),
  enrollments: z.array(z.string()).optional(),
  applications: z.array(z.string()).optional(),
  teachers: z.array(z.string()).optional(),
  course: z.array(z.string()).optional(),
  grades: z.array(z.string()).optional()
})

export type ClassInput = z.infer<typeof classSchema>


export const updateParentSchema = z.object({
  id: z.string().min(1),
  name: z.string().optional(),
  description: z.string().optional(),
  schoolId: z.string().min(1, "School ID is required"),
  students: z.array(z.string()).optional(),
  enrollments: z.array(z.string()).optional(),
  applications: z.array(z.string()).optional(),
  teachers: z.array(z.string()).optional(),
  course: z.array(z.string()).optional(),
  grades: z.array(z.string()).optional()
})

export type UpdateClassSchema = z.infer<typeof updateParentSchema>


