import { z } from 'zod'

export const createUserSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    saltedPassword: z.string().min(1, 'Password is required').min(8, 'Password must be at least 8 characters long')
})