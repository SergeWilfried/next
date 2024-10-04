
import * as z from "zod"

export const newGradeSchema = z.object({
    studentId: z.string().min(1),
    schoolId: z.string().min(1),
    courseId: z.string().min(1),
    name: z.string().min(1),
    description: z.string().optional(),
    score: z.number().min(0),
})
export type NewGradeSchema = z.infer<typeof newGradeSchema>


export const updateGradeSchema = z.object({
    id: z.string().min(1),
    studentId: z.string().min(1),
    schoolId: z.string().min(1),
    classId: z.string().min(1),
    courseId: z.string().min(1),
    name: z.string().min(1),
    description: z.string().optional(),
    score: z.number().min(0),
})
export type UpdateGradeSchema = z.infer<typeof updateGradeSchema>
