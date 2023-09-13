import { bookmarkService } from "@/app/(posts)/(modules)/bookmark/lib/services/BookmarkService"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"
import { Button } from "@/components/Button"
import { redirect } from "next/navigation"

export const MoveToBookmarkButton = async (props: { categoryId: number }) => {
    const session = await getAppServerSession()
    if (!session?.user) return null

    const activeCategory = await bookmarkService.getBookmarkByUserAndCategory(
        session?.user?.id,
        props.categoryId
    )

    const moveToCategory = async () => {
        "use server"
        redirect(`/categories/${props.categoryId}?page=${activeCategory?.page}`)
    }

    return (
        <form
            action={moveToCategory}
            className={"flex items-center justify-center h-full px-4"}>
            <Button
                type={"ghost"}
                className="bg-blue-500 hover:bg-blue-600">
                GoTo Bookmark
            </Button>
        </form>
    )
}
