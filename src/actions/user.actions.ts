"use server"

import * as z from 'zod';
import { avatarFormSchema, bioFormSchema, serviceFormSchema, userSettingsSchema } from "@/schema";
import { db } from '@/lib/db';
import { validateRequest } from '@/auth';

export const uploadAvatar = async (values: z.infer<typeof avatarFormSchema>) => {
    const { imageUrl } = values;
    console.log('Received imageUrl:', imageUrl); // Log received imageUrl

    try {
        const session = await validateRequest();
        const sessionId = session.user?.id;

        const existingUser = await db.user.findFirst({
            where: {
                id: sessionId
            }
        });

        if (!existingUser) {
            return {
                error: 'Unauthorized'
            };
        } else {
            await db.user.update({
                where: {
                    id: existingUser.id
                },
                data: {
                    image: imageUrl
                }
            });
            console.log('Avatar updated successfully');
            return {
                success: 'Avatar updated successfully'
            };
        }
    } catch (error) {
        console.error('Error updating avatar:', error); // Log any errors
        return {
            error: 'An error occurred while updating the avatar'
        };
    }
};


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

export const addService = async (values: z.infer<typeof serviceFormSchema>) => {

    const { name, description, imageUrl, startingPrice } = values
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
        await db.services.create({
            data: {
                name: name,
                description: description,
                thumbnail: imageUrl,
                startingPrice: startingPrice,
                userId: existingUser.id
            }
        })
        return {
            success: 'Service added successfully'
        }
    }
}

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
                id: existingUser.id
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
                id: existingUser.id
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