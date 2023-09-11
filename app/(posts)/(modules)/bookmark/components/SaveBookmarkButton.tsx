import { Button } from "@/components/Button"
import { bookmarkService } from "@/app/(posts)/(modules)/bookmark/lib/services/BookmarkService"
import { usersService } from "@/app/(authentication)/lib/services/UsersService"

export const SaveBookmarkButton = async (props: {
    postId: number
    page: number
}) => {
    const user = (await usersService.getCurrentUser())?.toJson()

    const saveBookmark = async () => {
        "use server"

        await bookmarkService.upsertBookmark({
            postId: props.postId,
            userId: user.id,
            page: props.page,
        })
    }

    if (!user) return null

    return (
        <form action={saveBookmark}>
            <Button
                type={"ghost"}
                className="bg-blue-500 hover:bg-blue-600 text-white">
                Bookmark
            </Button>
        </form>
    )
}
