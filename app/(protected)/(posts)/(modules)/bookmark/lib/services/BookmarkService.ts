import "server-only"

import {
    BookmarkIdentifiers,
    CreateBookmark,
    IBookmark,
} from "@/app/(protected)/(posts)/(modules)/bookmark/lib/interfaces/IBookmark"

import prisma from "@/lib/prisma"

export const createBookmarkService = () => {
    const getBookmarkById = async (id: number): Promise<IBookmark | null> => {
        return prisma.bookmark.findUnique({
            where: { id },
        })
    }

    const getBookmark = async (
        ids: BookmarkIdentifiers
    ): Promise<IBookmark | null> => {
        return prisma.bookmark.findUnique({
            where: {
                identifiers: ids,
            },
        })
    }

    const upsertBookmark = async (
        item: CreateBookmark
    ): Promise<IBookmark | null> => {
        return prisma.bookmark.upsert({
            where: {
                identifiers: {
                    userId: item.userId,
                    referenceType: item.referenceType,
                },
            },
            update: item,
            create: item,
        })
    }

    const deleteBookmark = async (id: number): Promise<void> => {
        await prisma.bookmark.delete({
            where: { id },
        })
    }

    return {
        getBookmarkById,
        getBookmark,
        upsertBookmark,
        deleteBookmark,
    }
}

export const bookmarkService = createBookmarkService()
