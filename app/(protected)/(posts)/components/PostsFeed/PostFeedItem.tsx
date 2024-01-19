import { Card } from "@/components/Card"
import { DeletePostButton } from "@/app/(protected)/(posts)/components/DeletePostButton"
import { USER_ROLES } from "@/app/(authentication)/lib/models/UserRole"
import { IPost } from "@/app/(protected)/(posts)/lib/interfaces/IPost"
import { SaveBookmarkButton } from "@/app/(protected)/(posts)/(modules)/bookmark/components/SaveBookmarkButton"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"
import React from "react"
import { PostCreateOrEditFormServer } from "@/app/(protected)/(posts)/components/PostCreateOrEditFormServer"
import { RatingContainer } from "@/app/(protected)/(posts)/(modules)/rating/components/RatingContainer"

type PostFeedItemProps = {
    post: IPost
    page?: number
}

export const PostFeedItem = async ({ post, page }: PostFeedItemProps) => {
    const session = await getAppServerSession()

    return (
        <Card
            className={"w-3/4 flex-col"}
            description={post.content}
            title={
                <div className="flex flex-row justify-between items-center w-full mb-4">
                    <div className="flex items-center text-lg">
                        {post.postNumber || -1}
                    </div>

                    <div className="flex flex-row justify-center w-full">
                        <h3 className="text-lg font-medium text-stone-900 self-center !mb-0">
                            {post.title}
                        </h3>
                    </div>

                    <div className={"flex flex-row "}>
                        <SaveBookmarkButton
                            categoryId={post.categoryId}
                            postId={post.id}
                            page={page || 1}
                        />
                    </div>
                    {session?.user?.role === USER_ROLES.admin ? (
                        <>
                            <DeletePostButton postId={post.id} />
                            <PostCreateOrEditFormServer post={post} />
                            <RatingContainer postId={post.id} />
                        </>
                    ) : null}
                </div>
            }
        />
    )
}
