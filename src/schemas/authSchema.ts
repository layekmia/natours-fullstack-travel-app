import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().min(1, 'Email is required').email("Please enter a valid email"),
    password: z.string().min(1, 'password is required').min(8, 'password must be at least 8 character')
})

export const signupSchema = z.object({
    name: z.string().min(1, "name is required").min(3, 'name must be at least 3 characters').max(50, 'name cannot exceed 50 characters'),
    email: z.string().min(1, 'Email is required').email("Please enter a valid email"),
    password: z.string().min(1, 'password is required').min(8, 'password must be at least 8 character').regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password')
}).refine((data) => data.password === data.confirmPassword, {
    message: "password don't match",
    path: ["confirmPassword"]
})

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signUpSchema>;
