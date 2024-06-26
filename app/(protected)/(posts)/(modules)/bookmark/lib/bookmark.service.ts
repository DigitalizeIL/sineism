import "server-only"

import {
    BookmarkIdentifiers,
    BookmarkReference,
    CreateBookmark,
    IBookmark,
} from "@/app/(protected)/(posts)/(modules)/bookmark/lib/bookmark.interface"

import prisma from "@/lib/prisma"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"

export const createBookmarkService = () => {
    const getBookmarkById = async (id: number): Promise<IBookmark | null> => {
        return prisma.bookmark.findUnique({
            where: { id },
        })
    }

    const getBookmark = async (
        reference?: BookmarkReference
    ): Promise<IBookmark | null> => {
        const session = await getAppServerSession()
        if (!reference || !session?.user?.id) {
            return null
        }

        return prisma.bookmark.findUnique({
            where: {
                identifiers: {
                    referenceType: reference,
                    userId: session.user.id,
                },
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
