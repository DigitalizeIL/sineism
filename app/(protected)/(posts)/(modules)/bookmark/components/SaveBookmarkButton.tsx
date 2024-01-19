import { Button } from "@/components/Button"
import { bookmarkService } from "@/app/(protected)/(posts)/(modules)/bookmark/lib/services/BookmarkService"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"
import { revalidatePath } from "next/cache"
import { BsBookmarkPlus } from "react-icons/bs"

export const SaveBookmarkButton = async (props: {
    categoryId: number
    postId: number
    page: number
}) => {
    const session = await getAppServerSession()

    if (!session?.user) return null

    const activeBookmark = await bookmarkService.getBookmarkByUserAndCategory(
        session.user.id,
        props.categoryId
    )

    const isActive = activeBookmark?.postId === props.postId

    const saveBookmark = async () => {
        "use server"
        if (!session.user?.id) return console.log("no user")

        if (isActive && activeBookmark?.id) {
            await bookmarkService.deleteBookmark(activeBookmark?.id)
        } else {
            await bookmarkService.upsertBookmark({
                postId: props.postId,
                categoryId: props.categoryId,
                userId: session.user?.id,
                page: props.page,
            })
        }

        revalidatePath(`/categories/${props.categoryId}`)
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
