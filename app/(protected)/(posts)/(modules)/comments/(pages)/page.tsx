import { commentsService } from "@/app/(protected)/(posts)/(modules)/comments/lib/services/CommentsService"
import { Comment } from "@/app/(protected)/(posts)/(modules)/comments/components/Comment"

export default async function CommentsPage() {
    const comments = await commentsService.getAllComments()

    return (
        <div className={"flex justify-center items-center h-screen"}>
            {comments.map((comment) => (
                <Comment
                    comment={comment}
                    key={comment.id}
                />
            )) || "No Comments"}
        </div>
    )
}
