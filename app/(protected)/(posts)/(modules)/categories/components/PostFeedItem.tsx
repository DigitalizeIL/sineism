import React, { Suspense } from "react"

import { Card } from "@/components/Card"
import { DeletePostButton } from "@/app/(protected)/(posts)/components/DeletePostButton"
import { IPost } from "@/app/(protected)/(posts)/lib/post.interface"
import { LoadingDots } from "@/app/_core/components/LoadingDots"
import { POST_PROPERTY_FOR_CURSOR } from "@/app/_core/consts/pagination.consts"
import { PostCreateOrEditFormContainer } from "@/app/(protected)/(posts)/components/PostCreateOrEditForm.container"
import { Rating } from "../../rating/components/Rating"
import { RatingContainer } from "@/app/(protected)/(posts)/(modules)/rating/components/Rating.container"
import { SaveBookmarkButtonContainer } from "@/app/(protected)/(posts)/(modules)/bookmark/components/SaveBookmarkButton.container"
import { UserRole } from "@/app/(authentication)/lib/types/userRole.types"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"

type PostFeedItemProps = {
    post: IPost
    page?: number
}

export const PostFeedItem = async ({ post, page }: PostFeedItemProps) => {
    const session = await getAppServerSession()

    return (
        <Card
            className={
                "flex-col p-4 my-4 rounded shadow-md w-3/4 mx-auto relative"
            }
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

                    <div className={"flex flex-row"}>
                        <Suspense fallback={<LoadingDots height={40} />}>
                            {session?.user?.id && (
                                <SaveBookmarkButtonContainer
                                    pathForRevalidation={`/categories/${post.categoryId}`}
                                    ids={{
                                        referenceType:
                                            post.categoryId.toString(),
                                        userId: session.user.id,
                                    }}
                                    itemIdToBookmark={post[
                                        POST_PROPERTY_FOR_CURSOR
                                    ].toString()}
                                    page={page || 1}
                                />
                            )}
                        </Suspense>
                    </div>
                    <Suspense>
                        {session?.user?.role === UserRole.admin ? (
                            <>
                                <DeletePostButton postId={post.id} />
                                <PostCreateOrEditFormContainer post={post} />
                            </>
                        ) : null}
                    </Suspense>
                    <Suspense
                        fallback={
                            <Rating
                                totalRating={0}
                                userRating={0}
                            />
                        }>
                        <RatingContainer postId={post.id} />
                    </Suspense>
                </div>
            }
        />
    )
}
