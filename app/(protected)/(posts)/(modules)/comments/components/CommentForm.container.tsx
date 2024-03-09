import { CommentForm } from "@/app/(protected)/(posts)/(modules)/comments/components/CommentForm"
import { CreateComment } from "@/app/(protected)/(posts)/(modules)/comments/lib/comment.interface"
import { EMPTY_COMMENT_ID } from "../comments.consts"
import { IPost } from "@/app/(protected)/(posts)/lib/post.interface"
import { commentsService } from "@/app/(protected)/(posts)/(modules)/comments/lib/comments.service"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"
import { postsService } from "@/app/(protected)/(posts)/lib/posts.service"
import { revalidatePath } from "next/cache"

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

    async function createComment(formData: FormData) {
        "use server"
        const content = formData.get("content") as string
        const postIds = (formData.get("postIds") as string)
            .split("|")
            .map(Number)

        if (!session?.user || !content || !postIds) {
            // TODO: show error
            console.log("no content", session, content, props.specificPost)
            return
        }

        const newComment: CreateComment = {
            userId: session.user.id,
            postIds,
            content,
        }

        await commentsService.createComment(newComment)

        revalidatePath("/posts")
    }

    const postOptions = posts.map((post) => ({
        value: post.id,
        label: post.title,
    }))

    return (
        <CommentForm
            post={props.specificPost}
            createComment={createComment}
            postOptions={[
                {
                    value: EMPTY_COMMENT_ID,
                    label: "#",
                },
                ...postOptions,
            ]}
        />
    )
}
