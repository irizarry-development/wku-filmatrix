import {z} from "zod"

export const createUserSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    name: z.string().min(1, "Name is required"),
    saltedPassword: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters long")
})

export const onboardingBodySchema = z.object({
    name: z.string().min(1, "Name is required").max(128, "Name is too long"),
    outgoingEmail: z.string().email("Invalid email"),
    phoneNumber: z.string().min(1, "Phone number is required").max(16, "Phone number is too long"),
    address: z.string().min(1, "Address is required").max(512, "Address is too long"),
    credit: z.string().min(1, "Credit is required").max(128, "Credit is too long"),
    emergencyContactName: z.string().min(1, "Emergency contact name is required").max(128, "Emergency contact name is too long"),
    emergencyContactPhone: z.string().min(1, "Emergency contact phone is required").max(16, "Emergency contact phone is too long"),
    emergencyContactAddress: z.string().min(1, "Emergency contact address is required").max(512, "Emergency contact address is too long"),
    allergies: z.string(),
    medications: z.string(),
    conditions: z.string(),
})
