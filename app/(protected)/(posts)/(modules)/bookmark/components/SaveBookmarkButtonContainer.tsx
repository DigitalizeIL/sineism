import {
    BookmarkIdentifiers,
    IBookmark,
} from "@/app/(protected)/(posts)/(modules)/bookmark/lib/interfaces/IBookmark"

import { BsBookmarkPlus } from "react-icons/bs"
import { Button } from "@/components/Button"
import { SaveBookmarkButton } from "./SaveBookmarkButton"
import { bookmarkService } from "@/app/(protected)/(posts)/(modules)/bookmark/lib/services/BookmarkService"
import { revalidatePath } from "next/cache"

export type SaveBookmarkButtonContainerProps = {
    ids: BookmarkIdentifiers
    page: number
    itemIdToBookmark: string
    pathForRevalidation?: string
}

export const SaveBookmarkButtonContainer = async (
    props: SaveBookmarkButtonContainerProps
) => {
    const activeBookmark = await bookmarkService.getBookmark(props.ids)

    const isActive = activeBookmark?.bookmarkedItemId === props.itemIdToBookmark

    return (
        <SaveBookmarkButton
            activeBookmark={activeBookmark}
            isActive={isActive}
            {...props}
        />
    )
}
