import { Button } from "@/components/Button"
import { bookmarkService } from "@/app/(protected)/(posts)/(modules)/bookmark/lib/services/BookmarkService"
import { BsBookmarkPlus } from "react-icons/bs"
import { BookmarkIdentifiers } from "@/app/(protected)/(posts)/(modules)/bookmark/lib/interfaces/IBookmark"
import { revalidatePath } from "next/cache"

type Props = {
    ids: BookmarkIdentifiers
    page: number
    itemIdToBookmark: string
    pathForRevalidation?: string
}
export const SaveBookmarkButton = async ({
    ids,
    page,
    itemIdToBookmark,
    pathForRevalidation,
}: Props) => {
    const activeBookmark = await bookmarkService.getBookmark(ids)

    const isActive = activeBookmark?.bookmarkedItemId === itemIdToBookmark

    const saveBookmark = async () => {
        "use server"

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

    return (
        <form action={saveBookmark}>
            <Button
                type={isActive ? "primary" : "ghost"}
                className="bg-blue-500 hover:bg-blue-600">
                <BsBookmarkPlus />
            </Button>
        </form>
    )
}
