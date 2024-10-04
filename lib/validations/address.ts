
import * as z from "zod"

export const newAddressSchema = z.object({
    street: z.string().optional(),
    city: z.string().min(1),
    country: z.string().min(1),
    state: z.string().optional(),
    zipCode: z.string().optional(),
    location: z.string().optional(), 
})

export type NewAddressSchema = z.infer<typeof newAddressSchema>

export const updateAddressSchema = z.object({
    id: z.string().min(1),
    street: z.string().optional(),
    city: z.string().min(1),
    country: z.string().min(1),
    state: z.string().optional(),
    zipCode: z.string().optional(),
    location: z.string().optional(),     
})

export type UpdateAddressSchema = z.infer<typeof updateAddressSchema>
