import { AiFillDelete } from "react-icons/ai"
import { Box } from "@/components/Box"
import { Button } from "@/app/_core/components/Button"
import { COMMENTS_PROPERTY_FOR_CURSOR } from "@/app/_core/consts/pagination.consts"
import { EMPTY_COMMENT_ID } from "../comments.consts"
import { IComment } from "@/app/(protected)/(posts)/(modules)/comments/lib/comment.interface"
import React from "react"
import { TEXTS } from "../comments.texts"
import { commentsService } from "@/app/(protected)/(posts)/(modules)/comments/lib/comments.service"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"
import { postsService } from "@/app/(protected)/(posts)/lib/posts.service"
import { revalidatePath } from "next/cache"
import { usersService } from "@/app/(authentication)/lib/services/users.service"
import { SaveBookmarkButton } from "../../bookmark/components/SaveBookmarkButton"
import { Rating } from "../../rating/components/Rating"
import { deleteComment } from "../actions/deleteComment.action"

type CommentProps = {
    comment: IComment
    isBookmarked: boolean
    rating: number
}

export const Comment = async ({
    comment,
    rating,
    isBookmarked,
}: CommentProps) => {
    const { content, id, postIds, userId, commentNumber } = comment
    const author = await usersService.getUserById(userId)
    const posts = await postsService.getAllPosts({ ids: postIds })
    const session = await getAppServerSession()

    const userRating = comment.reviews?.find(
        (review) => review.userId === session?.user?.id
    )

    const isNoReference = postIds.includes(EMPTY_COMMENT_ID)
    const canDelete =
        session?.user?.id === userId || session?.user?.role === "ADMIN"

    if (!author) return null

    return (
        <Box>
            <div className="absolute top-4 left-4 flex flex-row gap-4">
                {canDelete && (
                    <form
                        action={deleteComment.bind(null, {
                            id,
                        })}>
                        <Button
                            htmlType="submit"
                            type={["warning-outline"]}>
                            <AiFillDelete />
                        </Button>
                    </form>
                )}

                {session?.user?.id && (
                    <SaveBookmarkButton
                        reference="comment"
                        itemId={comment[COMMENTS_PROPERTY_FOR_CURSOR]}
                        isActive={isBookmarked}
                    />
                )}

                <Rating
                    commentId={id}
                    totalRating={rating}
                    userRating={userRating}
                />
            </div>
            <div className="flex items-center mb-2 text-xl font-bold gap-1">
                {/*<div className="bg-gray-300 rounded-full w-8 h-8 mr-2"></div>*/}
                <span>{commentNumber} |</span>
                <div>{author?.name}</div>
            </div>
            {!isNoReference && (
                <div
                    className={"flex flex-row gap-2"}
                    dir={"rtl"}>
                    <span>{TEXTS.commentedOnPosts}</span>
                    {posts.map(
                        ({ post }) =>
                            post && (
                                <span key={post.id}>{post.postNumber}, </span>
                            )
                    )}
                </div>
            )}
            <div className="text-gray-700">{content}</div>
        </Box>
    )
}
