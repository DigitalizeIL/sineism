import "server-only"

import { IBookmark } from "@/app/(posts)/(modules)/bookmark/lib/interfaces/IBookmark"
import prisma from "@/lib/prisma"

export interface BookmarkService {
    getBookmark(id: number): Promise<IBookmark | null>

    createOrUpdateBookmark(category: Partial<IBookmark>): Promise<IBookmark>

    deleteBookmark(id: number): Promise<void>
}

export const createBookmarkService = (): BookmarkService => {
    const getBookmark = async (
        id: number,
        withPosts?: boolean
    ): Promise<IBookmark | null> => {
        return prisma.bookmark.findUnique({
            where: { id },
            include: {
                posts: withPosts,
            },
        })
    }

    const createOrUpdateBookmark = async (
        item: IBookmark
    ): Promise<IBookmark> => {
        return prisma.bookmark.update({
            data: item,
        })
    }

    const deleteBookmark = async (id: number): Promise<void> => {
        await prisma.bookmark.delete({
            where: { id },
        })
    }

    return {
        getBookmark,
        createOrUpdateBookmark,
        deleteBookmark,
    }
}

export const bookmarkService = createBookmarkService()
