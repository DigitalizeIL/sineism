import { IComment } from "@/app/(protected)/(posts)/(modules)/comments/lib/interfaces/IComment"
import { usersService } from "@/app/(authentication)/lib/services/UsersService"
import { commentsService } from "@/app/(protected)/(posts)/(modules)/comments/lib/services/CommentsService"
import { revalidatePath } from "next/cache"
import { postsService } from "@/app/(protected)/(posts)/lib/services/PostsService"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"
import { AiFillDelete } from "react-icons/ai"

type CommentProps = {
    comment: IComment
}

export const Comment = async (props: CommentProps) => {
    const author = await usersService.getUserById(props.comment.userId)
    const post = await postsService.getPost(props.comment.postId)
    const session = await getAppServerSession()

    const deletePost = async () => {
        "use server"
        if (!props.comment.id) return null
        await commentsService.deleteComment(props.comment.id)

        revalidatePath("/posts")
    }

    if (!author) return null

    return (
        <div className="bg-white p-4 mt-4 rounded shadow-md w-3/4 mx-auto relative">
            {session?.user?.role === "ADMIN" && (
                <form action={deletePost}>
                    <button className="border-none bg-none">
                        <AiFillDelete className="absolute top-1 right-1" />
                    </button>
                </form>
            )}
            <div className="flex items-center mb-2">
                {/*<div className="bg-gray-300 rounded-full w-8 h-8 mr-2"></div>*/}
                <div className="text-xl font-bold">{author?.name}</div>
            </div>
            <div dir={"rtl"}>
                {"הגיב על פוסט:"} {post.title}
            </div>
            <div className="text-gray-700">{props.comment.content}</div>
        </div>
    )
}
