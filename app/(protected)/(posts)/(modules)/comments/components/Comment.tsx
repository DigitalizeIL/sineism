import { IComment } from "@/app/(protected)/(posts)/(modules)/comments/lib/interfaces/IComment"
import { usersService } from "@/app/(authentication)/lib/services/UsersService"
import { commentsService } from "@/app/(protected)/(posts)/(modules)/comments/lib/services/CommentsService"
import { revalidatePath } from "next/cache"
import { postsService } from "@/app/(protected)/(posts)/lib/services/PostsService"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"
import { AiFillDelete } from "react-icons/ai"
import { RatingContainer } from "@/app/(protected)/(posts)/(modules)/rating/components/RatingContainer"
import { Box } from "@/components/Box"
import { SaveBookmarkButton } from "@/app/(protected)/(posts)/(modules)/bookmark/components/SaveBookmarkButton"
import React from "react"

type CommentProps = {
    comment: IComment
    page?: number
}

export const Comment = async ({
    page,
    comment: { content, id, postIds, userId, commentNumber },
}: CommentProps) => {
    const author = await usersService.getUserById(userId)
    const posts = await postsService.getAllPosts({ ids: postIds })
    const session = await getAppServerSession()

    const deletePost = async () => {
        "use server"
        if (!id) return null
        await commentsService.deleteComment(id)

        revalidatePath("/posts")
    }

    if (!author) return null

    return (
        <Box>
            <div className="absolute top-4 left-4 flex flex-row gap-4">
                {session?.user?.role === "ADMIN" && (
                    <form action={deletePost}>
                        <button className="border-none bg-none">
                            <AiFillDelete />
                        </button>
                    </form>
                )}

                {session?.user?.id && (
                    <SaveBookmarkButton
                        pathForRevalidation={`/comments`}
                        ids={{
                            referenceType: "comment",
                            userId: session.user.id,
                        }}
                        itemIdToBookmark={id.toString()}
                        page={page || 1}
                    />
                )}

                <RatingContainer commentId={id} />
            </div>
            <div className="flex items-center mb-2 text-xl font-bold gap-1">
                {/*<div className="bg-gray-300 rounded-full w-8 h-8 mr-2"></div>*/}
                <span>{commentNumber} |</span>
                <div>{author?.name}</div>
            </div>
            <div
                className={"flex flex-row gap-2"}
                dir={"rtl"}>
                <span>{"הגיב על פוסט/ים:"}</span>
                {posts.map((post) => (
                    <span key={post.id}>{post.title}, </span>
                ))}
            </div>
            <div className="text-gray-700">{content}</div>
        </Box>
    )
}
