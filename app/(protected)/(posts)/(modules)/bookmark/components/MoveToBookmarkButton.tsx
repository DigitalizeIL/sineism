import { bookmarkService } from "@/app/(protected)/(posts)/(modules)/bookmark/lib/services/BookmarkService"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"
import { Button } from "@/components/Button"
import { redirect } from "next/navigation"
import { BiBookBookmark } from "react-icons/bi"

export const MoveToBookmarkButton = async (props: {
    categoryPath: string
    categoryId: number
}) => {
    const session = await getAppServerSession()
    if (!session?.user) return null

    const activeBookmark = await bookmarkService.getBookmarkByUserAndCategory(
        session?.user?.id,
        props.categoryId
    )

    const moveToCategory = async () => {
        "use server"
        if (!activeBookmark?.page) return
        redirect(
            `/categories/${props.categoryPath}?page=${activeBookmark?.page}`
        )
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
