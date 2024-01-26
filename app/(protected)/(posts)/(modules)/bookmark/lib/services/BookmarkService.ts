import "server-only"

import {
    BookmarkIdentifiers,
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
                identifiers: {
                    userId: ids.userId,
                    referenceId: ids.referenceId,
                    referenceIdType: ids.referenceType,
                    ...(ids.extraId && { extraId: ids.extraId }),
                },
            },
        })
    }

    const upsertBookmark = async (
        ids: BookmarkIdentifiers,
        item: IBookmark
    ): Promise<IBookmark> => {
        return prisma.bookmark.upsert({
            where: {
                identifiers: ids,
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
