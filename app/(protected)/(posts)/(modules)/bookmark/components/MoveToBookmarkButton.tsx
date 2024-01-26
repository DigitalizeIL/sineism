import { bookmarkService } from "@/app/(protected)/(posts)/(modules)/bookmark/lib/services/BookmarkService"
import { Button } from "@/components/Button"
import { redirect } from "next/navigation"
import { BiBookBookmark } from "react-icons/bi"
import { BookmarkIdentifiers } from "@/app/(protected)/(posts)/(modules)/bookmark/lib/interfaces/IBookmark"

export const MoveToBookmarkButton = async ({
    userId,
    referenceType,
}: BookmarkIdentifiers) => {
    const activeBookmark = await bookmarkService.getBookmark({
        referenceType,
        userId,
    })

    const moveToCategory = async () => {
        "use server"
        if (!activeBookmark?.page) return

        redirect(`?page=${activeBookmark?.page}`)
    }

    if (!activeBookmark) return null

    return (
        <form
            action={moveToCategory}
            className={"flex items-center justify-center h-full px-4"}>
            <Button
                type={"ghost"}
                className="bg-blue-500 hover:bg-blue-600">
                <BiBookBookmark />
            </Button>
        </form>
    )
}
