import { Comment } from "@/app/(protected)/(posts)/(modules)/comments/components/Comment"
import { IComment } from "../lib/comment.interface"

type PageProps = {
    comments: IComment[]
}

export async function CommentsFeed(props: PageProps) {
    return (
        <div
            className={
                "flex justify-center items-center flex-col overflow-scroll h-auto"
            }>
            {props.comments.map((comment) => (
                <Comment
                    comment={comment}
                    key={comment.id}
                />
            ))}
        </div>
    )
}
