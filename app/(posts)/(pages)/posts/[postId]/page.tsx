import { postsService } from "@/app/(posts)/lib/services/PostsService"
import { notFound } from "next/navigation"
import { CreateCommentForm } from "@/app/(posts)/(modules)/comments/components/CreateCommentForm"
import { PostComments } from "@/app/(posts)/(modules)/comments/components/PostComments"

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
                <CreateCommentForm post={post} />
            </div>
        )
    } catch (e) {
        return notFound()
    }
}
