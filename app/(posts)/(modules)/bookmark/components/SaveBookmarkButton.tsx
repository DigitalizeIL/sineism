import { Button } from "@/components/Button"
import { bookmarkService } from "@/app/(posts)/(modules)/bookmark/lib/services/BookmarkService"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"
import { revalidatePath } from "next/cache"

export const SaveBookmarkButton = async (props: {
    categoryId: number
    postId: number
    page: number
    isActive?: boolean
}) => {
    const session = await getAppServerSession()

    if (!session?.user) return null

    const saveBookmark = async () => {
        "use server"
        if (!session) return console.log("no user")

        await bookmarkService.upsertBookmark({
            postId: props.postId,
            categoryId: props.categoryId,
            userId: session.user?.id,
            page: props.page,
        })

        revalidatePath(`/categories/${props.categoryId}`)
    }

    return (
        <form action={saveBookmark}>
            <Button
                type={props.isActive ? "primary" : "ghost"}
                className="bg-blue-500 hover:bg-blue-600">
                Bookmark
            </Button>
        </form>
    )
}
