import { Card } from "@/components/Card"
import { DeletePostButton } from "@/app/(protected)/(posts)/components/DeletePostButton"
import { USER_ROLES } from "@/app/(authentication)/lib/models/UserRole"
import { PostCreateOrEditForm } from "@/app/(protected)/(posts)/components/PostCreateOrEditForm"
import { ModalWithButton } from "@/components/Modal"
import { IPost } from "@/app/(protected)/(posts)/lib/interfaces/IPost"
import { SaveBookmarkButton } from "@/app/(protected)/(posts)/(modules)/bookmark/components/SaveBookmarkButton"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"
import { AiOutlineEdit } from "react-icons/ai"
import React from "react"

type PostFeedItemProps = {
    post: IPost
    page?: number
}

export const PostFeedItem = async ({ post, page }: PostFeedItemProps) => {
    const session = await getAppServerSession()

    return (
        <Card
            className={"w-full max-w-lg flex-col"}
            description={post.content}
            title={
                <div className="flex flex-row justify-between items-center w-full mb-4">
                    <div className={"flex flex-row "}>
                        <SaveBookmarkButton
                            categoryId={post.categoryId}
                            postId={post.id}
                            page={page || 1}
                        />
                    </div>
                    <div className="flex flex-row justify-center w-full">
                        <h3 className="text-lg font-medium text-stone-900 self-center !mb-0">
                            {post.title}
                        </h3>
                    </div>
                    <div className="flex items-center text-sm text-stone-500">
                        {post.postNumber || -1}
                    </div>
                    {session?.user?.role === USER_ROLES.admin ? (
                        <>
                            <DeletePostButton postId={post.id} />
                            <ModalWithButton buttonText={<AiOutlineEdit />}>
                                <PostCreateOrEditForm post={post} />
                            </ModalWithButton>
                        </>
                    ) : null}
                </div>
            }
        />
    )
}
