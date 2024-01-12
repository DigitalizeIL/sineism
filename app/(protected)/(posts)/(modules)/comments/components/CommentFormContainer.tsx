import { commentsService } from "@/app/(protected)/(posts)/(modules)/comments/lib/services/CommentsService"
import { IComment } from "@/app/(protected)/(posts)/(modules)/comments/lib/interfaces/IComment"
import { IPost } from "@/app/(protected)/(posts)/lib/interfaces/IPost"
import { revalidatePath } from "next/cache"
import { postsService } from "@/app/(protected)/(posts)/lib/services/PostsService"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"
import {
    CommentForm,
    CommentFormDto,
} from "@/app/(protected)/(posts)/(modules)/comments/components/CommentForm"

type CommentFormContainerProps = {
    specificPost?: IPost
}

export const CommentFormContainer = async (
    props: CommentFormContainerProps
) => {
    let posts: IPost[] = []
    const session = await getAppServerSession()

    if (!session?.user) {
        return null
    }

    if (!props.specificPost) {
        posts = await postsService.getAllPosts()
    }

    const createComment = async (formData: CommentFormDto) => {
        "use server"

        if (!session.user?.id) {
            return "Please authenticate"
        }

        const newComment: IComment = {
            userId: session.user?.id,
            postId: formData.postId,
            content: formData.content,
        }

        await commentsService.createComment(newComment)

        revalidatePath("/posts")
    }

    return (
        <CommentForm
            post={props.specificPost}
            createComment={createComment}
            postOptions={posts.map((post) => ({
                value: post.id,
                label: post.title,
            }))}
        />
    )
}
