import { useId } from "react"
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
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  middleName: z.string().optional(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    country: z.string(),
  }),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  dateOfBirth: z.string(),
  maritalStatus: z.enum(['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED', 'OTHER']),
  phoneNumber: z.string(),
  communicationPreference: z.enum(["SMS", "WHATSAPP", "PHONE"]),
  emergencyContacts: z.array(z.object({
    name: z.string(),
    relationship: z.string(),
    phoneNumber: z.string(),
  })),
  schoolId: z.string(), // Add this line
  userId: z.string(),   // Add this line
})

export const parentSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "First name must be 50 characters or less"),
  middleName: z.string().max(50, "Middle name must be 50 characters or less").optional(),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name must be 50 characters or less"),
  gender: z.enum(["OTHER", "MALE", "FEMALE"], {
      errorMap: () => ({ message: "Please select a valid gender option" })
  }),
  phoneNumber: z.string().min(1, "Parent's phone number is required"),
  maritalStatus: z.enum(["SINGLE", "MARRIED", "DIVORCED", "WIDOWED", "OTHER"], {
      errorMap: () => ({ message: "Please select a valid marital status" })
  }),
  dateOfBirth: z.coerce.date().max(new Date(), "Date of birth cannot be in the future"),
  communicationPreference: z.array(z.enum(["EMAIL", "SMS", "PHONE"])).min(1, "Select at least one communication preference"),
  });
  
  export type ParentFormValues = z.infer<typeof parentSchema>;
  

export type CreateParentSchema = z.infer<typeof createParentSchema>

export const updateParentSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string().optional(),
  phoneNumber: z.string().optional(),
  communicationPreference: z.enum(["SMS", "WHATSAPP", "PHONE"]).optional(),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
  emergencyContacts: z.array(z.object({
    name: z.string(),
    relationship: z.string(),
    phoneNumber: z.string(),
  })).optional()
})

export type UpdateParentSchema = z.infer<typeof updateParentSchema>
