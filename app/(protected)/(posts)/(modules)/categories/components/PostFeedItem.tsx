import { Suspense } from "react"

import { UserRole } from "@/app/(authentication)/lib/types/userRole.types"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"
import { RatingContainer } from "@/app/(protected)/(posts)/(modules)/rating/components/Rating.container"
import { DeletePostButton } from "@/app/(protected)/(posts)/components/DeletePostButton"
import { IPost } from "@/app/(protected)/(posts)/lib/post.interface"
import { POST_PROPERTY_FOR_CURSOR } from "@/app/_core/consts/pagination.consts"
import { Card } from "@/components/Card"
import { SaveBookmarkButton } from "../../bookmark/components/SaveBookmarkButton"
import { Rating } from "../../rating/components/Rating"
import { PostCreateOrEditForm } from "../../../components/PostCreateOrEditForm"

type PostFeedItemProps = {
    post: IPost
    page?: number
    isItemBookmarked: boolean
}

export const PostFeedItem = async ({
    post,
    isItemBookmarked,
}: PostFeedItemProps) => {
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
                        {session?.user?.id && (
                            <SaveBookmarkButton
                                itemId={post[POST_PROPERTY_FOR_CURSOR]}
                                isActive={isItemBookmarked}
                                reference={post.categoryId.toString()}
                            />
                        )}
                    </div>
                    {session?.user?.role === UserRole.admin && (
                        <>
                            <DeletePostButton postId={post.id} />
                            <PostCreateOrEditForm post={post} />
                        </>
                    )}
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
