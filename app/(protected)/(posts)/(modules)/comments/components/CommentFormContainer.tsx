import { commentsService } from "@/app/(protected)/(posts)/(modules)/comments/lib/services/CommentsService"
import { IPost } from "@/app/(protected)/(posts)/lib/interfaces/IPost"
import { revalidatePath } from "next/cache"
import { postsService } from "@/app/(protected)/(posts)/lib/services/PostsService"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"
import { CommentForm } from "@/app/(protected)/(posts)/(modules)/comments/components/CommentForm"
import { FormResponse } from "@/components/Form/types"
import { CreateComment } from "@/app/(protected)/(posts)/(modules)/comments/lib/interfaces/IComment"

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

    async function createComment(formData: FormData): Promise<FormResponse> {
        "use server"

        const validation = CreateComment.safeParse({
            userId: session?.user?.id,
            content: formData.get("content"),
            postId: formData.get("postId")
                ? Number(formData.get("postId"))
                : undefined,
        })

        if (!validation.success) {
            return {
                success: false,
                errors: validation.error.flatten(),
            }
        }

        await commentsService.createComment(validation.data)

        revalidatePath("/posts")

        return {
            success: true,
        }
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
