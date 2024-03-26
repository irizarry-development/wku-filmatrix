import { z } from "zod";

export const createUserSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    name: z.string().min(1, "Name is required"),
    saltedPassword: z
        .string()
        .optional(),
    degree: z.string().optional(),
    classYear: z.string().optional(),
    hasOnboarded: z.boolean().optional(),
    address: z.string().optional(),
    credit: z.string().optional(),
    biography: z.string().optional(),
    allergies: z.string().optional(),
    medications: z.string().optional(),
    conditions: z.string().optional(),
    emergencyContactName: z.string().optional(),
    emergencyContactPhone: z.string().optional(),
    emergencyContactAddress: z.string().optional()
});

export const createVendorSchema = z.object({
    vendorName: z.string().min(1, "Vendor name is required"),
    vendorDescription: z.string().min(1, "Vendor description is required"),
    vendorAddress: z.string().min(1, "Vendor address is required"),
    vendorPhone: z.string().min(1, "Vendor phone is required"),
    vendorEmail: z.string().min(1, "Vendor email is required").email("Invalid email"),
    vendorContactName: z.string().min(1, "Vendor contact name is required"),
    vendorKeywords: z.string().min(1, "Vendor keywords are required")
});

export const createLocationSchema = z.object({
    locationName: z.string().min(1, "Location name is required"),
    locationDescription: z.string().min(1, "Location description is required"),
    locationAddress: z.string().min(1, "Location address is required"),
    locationPhone: z.string().min(1, "Location phone is required"),
    locationEmail: z.string().min(1, "Location email is required").email("Invalid email"),
    locationContactName: z.string().min(1, "Location contact name is required"),
    locationKeywords: z.string().min(1, "Location keywords are required")
});

export const onboardingBodySchema = z.object({
    name: z.string().min(1, "Name is required").max(128, "Name is too long"),
    outgoingEmail: z.string().email("Invalid email"),
    phoneNumber: z
        .string()
        .min(1, "Phone number is required")
        .max(16, "Phone number is too long"),
    address: z
        .string()
        .min(1, "Address is required")
        .max(512, "Address is too long"),
    credit: z
        .string()
        .min(1, "Credit is required")
        .max(128, "Credit is too long"),
    emergencyContactName: z
        .string()
        .min(1, "Emergency contact name is required")
        .max(128, "Emergency contact name is too long"),
    emergencyContactPhone: z
        .string()
        .min(1, "Emergency contact phone is required")
        .max(16, "Emergency contact phone is too long"),
    emergencyContactAddress: z
        .string()
        .min(1, "Emergency contact address is required")
        .max(512, "Emergency contact address is too long"),
    allergies: z.string(),
    medications: z.string(),
    conditions: z.string()
});
