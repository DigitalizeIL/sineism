"use server"

import { BookmarkIdentifiers, IBookmark } from "../lib/interfaces/IBookmark"

import { bookmarkService } from "../lib/services/BookmarkService"
import { revalidatePath } from "next/cache"

type SaveBookmarkArgs = {
    isActive: boolean
    ids: BookmarkIdentifiers
    itemIdToBookmark: string
    page: number
    pathForRevalidation?: string
    activeBookmark?: IBookmark | null
}

export const saveBookmark = async ({
    ids,
    isActive,
    itemIdToBookmark,
    page,
    activeBookmark,
    pathForRevalidation,
}: SaveBookmarkArgs) => {
    if (isActive && activeBookmark?.id) {
        await bookmarkService.deleteBookmark(activeBookmark?.id)
    } else {
        await bookmarkService.upsertBookmark({
            ...ids,
            bookmarkedItemId: itemIdToBookmark,
            page,
        })
    }

    pathForRevalidation && revalidatePath(pathForRevalidation)
}
