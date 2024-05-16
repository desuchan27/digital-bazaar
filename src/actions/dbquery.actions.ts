"use server"

import { validateRequest } from "@/auth"
import { db } from "@/lib/db"

export const getUser = async (userId: string) => {

    const getUser = await db.user.findUnique({
        where: {
            id: userId
        }
    })

    return getUser
}