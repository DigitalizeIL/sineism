import { CommentsModal } from "@/app/(protected)/(payment)/(modules)/comments/components/CommentsModal"
import { CreateComment } from "@/app/(protected)/(posts)/(modules)/comments/lib/comment.interface"
import { IPost } from "@/app/(protected)/(posts)/lib/post.interface"
import { categoriesService } from "../../categories/lib/categories.service"
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

    const categories = await categoriesService.getAllCategories()

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

    return (
        <CommentsModal
            categories={categories}
            post={props.specificPost}
            createComment={createComment}
            posts={posts}
        />
    )
}
