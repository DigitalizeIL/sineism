import { postsService } from "@/app/(protected)/(posts)/lib/services/PostsService"
import { notFound } from "next/navigation"
import { PostComments } from "@/app/(protected)/(posts)/(modules)/comments/components/PostComments"
import { CommentFormContainer } from "@/app/(protected)/(posts)/(modules)/comments/components/CommentFormContainer"

type PostPageProps = {
    params: { postId: number }
}

export default async function PostPage(props: PostPageProps) {
    const postId = Number(props.params.postId)

    if (isNaN(postId)) return notFound()

    try {
        const post = await postsService.getPost(postId)
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="text-xl whitespace-pre-wrap py-2">
                    {post.content}
                </div>
                <hr className="w-1/5 py-2" />
                <h3>comments</h3>
                <PostComments post={post} />
                <CommentFormContainer specificPost={post} />
            </div>
        )
    } catch (e) {
        return notFound()
    }
}
