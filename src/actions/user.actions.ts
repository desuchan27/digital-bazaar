"use server"

import * as z from 'zod';
import { avatarFormSchema, bioFormSchema, userSettingsSchema } from "@/schema";
import { db } from '@/lib/db';
import { validateRequest } from '@/auth';

export const editProfile = async (values: z.infer<typeof userSettingsSchema>) => {

    const { name, username, bio, password, newPassword } = values

    const session = await validateRequest()
    const sessionId = session.user?.id

    const existingUser = await db.user.findFirst({
        where: {
            id: sessionId
        }
    })

    if (!existingUser) {
        return {
            error: 'Unauthorized'
        }
    } else {
        await db.user.update({
            where: {
                id: sessionId
            },
            data: {
                name,
                username,
                bio
            }
        })
        return {
            success: 'Profile updated successfully'
        }
    }
}

export const uploadAvatar = async (values: z.infer<typeof avatarFormSchema>) => {

    const { imageUrl } = values

    const session = await validateRequest()
    const sessionId = session.user?.id

    const existingUser = await db.user.findFirst({
        where: {
            id: sessionId
        }
    })

    if (!existingUser) {
        return {
            error: 'Unauthorized'
        }
    } else {
        await db.user.update({
            where: {
                id: sessionId
            },
            data: {
                image: imageUrl
            }
        })
        return {
            success: 'Avatar updated successfully'
        }
    }

}

export const addBio = async (values: z.infer<typeof bioFormSchema>) => {

    const { bio } = values
    const session = await validateRequest()

    const sessionId = session.user?.id

    const existingUser = await db.user.findFirst({
        where: {
            id: sessionId
        }
    })

    if (!existingUser) {
        return {
            error: 'Unauthorized'
        }
    } else {
        await db.user.update({
            where: {
                id: sessionId
            },
            data: {
                bio
            }
        })
        return {
            success: 'Bio added successfully'
        }
    }
}

export const editBio = async (values: z.infer<typeof bioFormSchema>) => {

    const { bio } = values
    const session = await validateRequest()

    const sessionId = session.user?.id

    const existingUser = await db.user.findFirst({
        where: {
            id: sessionId
        }
    })

    if (!existingUser) {
        return {
            error: 'Unauthorized'
        }
    } else {
        await db.user.update({
            where: {
                id: sessionId
            },
            data: {
                bio
            }
        })
        return {
            message: 'Bio updated successfully'
        }
    }
}