"use server"

import { db } from "@/lib/db"

export const getArtworks = async () => {
    const artworks = await db.artwork.findMany({
        include: {
            user: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return {
        artworks
    }
}

export const getAuthor = async (id: string) => {
    const author = await db.user.findUnique({
        where: {
            id
        }
    })

    return {
        author
    }
}