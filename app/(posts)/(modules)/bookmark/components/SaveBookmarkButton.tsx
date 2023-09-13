import { Button } from "@/components/Button"
import { bookmarkService } from "@/app/(posts)/(modules)/bookmark/lib/services/BookmarkService"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"

export const SaveBookmarkButton = async (props: {
    postId: number
    page: number
}) => {
    const session = await getAppServerSession()

    const saveBookmark = async () => {
        "use server"
        if (!session) return console.log("no user")

        const res = await bookmarkService.upsertBookmark({
            postId: props.postId,
            userId: session.user?.id,
            page: props.page,
        })

        console.log("res", res)
    }

    if (!session) return null

    return (
        <form action={saveBookmark}>
            <Button
                type={"ghost"}
                className="bg-blue-500 hover:bg-blue-600">
                Bookmark
            </Button>
        </form>
    )
}
