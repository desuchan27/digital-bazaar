import * as z from 'zod'

export const registerUserSchema = z.object({
    email: z.string().email({
        message: 'Email is required'
    }),
    username: z.string().min(5, {
        message: 'Must have at least 5 characters'
    }),
    name: z.string().min(1, {
        message: 'Enter your full name'
    }),
    password: z.string().min(8, {
        message: 'Must have at least 8 characters'
    }),
    confirmPassword: z.string().min(1, {
        message: 'Enter the same password'
    }),
    userType: z.string().min(1, {
        message: 'Select a user type'
    }),
})

export const loginUserSchema = z.object({
    email: z.string().email({
        message: 'Email is required'
    }),
    password: z.string().min(8, {
        message: 'Must have at least 8 characters'
    }),
})

export const userSettingsSchema = z.object({
    name: z.string().min(1).optional(),
    username: z.string().min(1).optional(),
    bio: z.string().max(100, {
        message: 'Characters cannot exceed over 100'
    }).optional(),
    password: z.string().optional(),
    newPassword: z.string().optional(),
})

export const bioFormSchema = z.object({
    bio: z.string().max(100,
        {
            message: 'Characters cannot exceed over 100'
        }
    ),
})

export const avatarFormSchema = z.object({
    imageUrl: z.string()
})