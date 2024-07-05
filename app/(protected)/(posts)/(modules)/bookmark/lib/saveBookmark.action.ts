"use server"

import { getServerSession } from "next-auth"
import {
    BookmarkIdentifiers,
    BookmarkReference,
    IBookmark,
} from "./bookmark.interface"

import { bookmarkService } from "./bookmark.service"
import { revalidatePath } from "next/cache"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"

export type SaveBookmarkArgs = {
    isActive: boolean
    reference: BookmarkReference
    itemId: number
    pathname: string
}

export const saveBookmark = async ({
    isActive,
    itemId,
    reference,
    pathname,
}: SaveBookmarkArgs) => {
    const session = await getAppServerSession(true)

    if (isActive) {
        await bookmarkService.deleteBookmark(itemId)
    } else {
        await bookmarkService.upsertBookmark({
            userId: session.user.id,
            referenceType: reference,
            bookmarkedItemId: itemId,
        })
    }

    revalidatePath(pathname)
}
