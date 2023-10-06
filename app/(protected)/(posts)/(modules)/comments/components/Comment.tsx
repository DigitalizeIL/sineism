import { IComment } from "@/app/(protected)/(posts)/(modules)/comments/lib/interfaces/IComment"
import { usersService } from "@/app/(authentication)/lib/services/UsersService"
import { commentsService } from "@/app/(protected)/(posts)/(modules)/comments/lib/services/CommentsService"
import { BiExit } from "react-icons/bi"
import { revalidatePath } from "next/cache"

type CommentProps = {
    comment: IComment
}

export const Comment = async (props: CommentProps) => {
    const author = await usersService.getUserById(props.comment.userId)

    const deletePost = async () => {
        "use server"
        if (!props.comment.id) return null
        await commentsService.deleteComment(props.comment.id)

        revalidatePath("/posts")
    }

    if (!author) return null

    return (
        <div className="bg-white p-4 mt-4 rounded shadow-md w-3/4 mx-auto relative">
            <form action={deletePost}>
                <button className="border-none bg-none">
                    <BiExit className="absolute top-1 right-1" />
                </button>
            </form>
            <div className="flex items-center mb-2">
                <div className="bg-gray-300 rounded-full w-8 h-8 mr-2"></div>
                <div className="text-xl font-bold">{author?.name}</div>
            </div>
            <div className="text-gray-700">{props.comment.content}</div>
        </div>
    )
}
