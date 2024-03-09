import { BookmarkIdentifiers } from "@/app/(protected)/(posts)/(modules)/bookmark/lib/bookmark.interface"
import { SaveBookmarkButton } from "./SaveBookmarkButton"
import { bookmarkService } from "@/app/(protected)/(posts)/(modules)/bookmark/lib/bookmark.service"
import { saveBookmark } from "../lib/saveBookmark.action"

export type SaveBookmarkButtonContainerProps = {
    ids: BookmarkIdentifiers
    page: number
    itemIdToBookmark: string
    pathForRevalidation?: string
}

export const SaveBookmarkButtonContainer = async ({
    ids,
    itemIdToBookmark,
    page,
    pathForRevalidation,
}: SaveBookmarkButtonContainerProps) => {
    const activeBookmark = await bookmarkService.getBookmark(ids)

    const isActive = activeBookmark?.bookmarkedItemId === itemIdToBookmark

    const onClick = async () => {
        "use server"

        await saveBookmark({
            ids,
            isActive,
            itemIdToBookmark,
            page,
            activeBookmark,
            pathForRevalidation,
        })
    }

    return (
        <SaveBookmarkButton
            onSaveClick={onClick}
            isActive={isActive}
        />
    )
}
