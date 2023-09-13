import { Card } from "@/components/Card"
import { DeletePostButton } from "@/app/(posts)/components/DeletePostButton"
import { USER_ROLES } from "@/app/(authentication)/lib/models/UserRole"
import { PostCreateOrEditForm } from "@/app/(posts)/components/PostCreateOrEditForm"
import { ModalWithButton } from "@/components/Modal"
import { IPost } from "@/app/(posts)/lib/interfaces/IPost"
import { SaveBookmarkButton } from "@/app/(posts)/(modules)/bookmark/components/SaveBookmarkButton"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"

type PostFeedItemProps = {
    post: IPost
    page: number
}

export const PostFeedItem = async ({ post }: PostFeedItemProps) => {
    const session = await getAppServerSession()

    return (
        <Card
            className={"w-full max-w-lg flex-col"}
            title={post.title}
            description={post.content}
            actions={[
                <SaveBookmarkButton
                    key={"bookmark"}
                    postId={post.id}
                    page={post.id}
                />,
                ...(session?.user?.role === USER_ROLES.admin
                    ? [
                          <DeletePostButton
                              key={"delete"}
                              postId={post.id}
                          />,
                          <ModalWithButton
                              key={"edit"}
                              buttonText={"Edit"}>
                              <PostCreateOrEditForm post={post} />
                          </ModalWithButton>,
                      ]
                    : []),
            ]}
        />
    )
}
