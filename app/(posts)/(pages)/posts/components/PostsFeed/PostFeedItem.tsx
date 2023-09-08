import { Post } from "@/app/(posts)/lib/models/Post"
import { Card } from "@/components/Card"
import { DeletePostButton } from "@/app/(posts)/components/DeletePostButton"
import { getServerSession } from "next-auth"
import { usersService } from "@/app/(authentication)/lib/services/UsersService"
import { USER_ROLES } from "@/app/(authentication)/lib/models/UserRole"
import { PostCreateOrEditForm } from "@/app/(posts)/components/PostCreateOrEditForm"
import { ModalWithButton } from "@/components/Modal"

export const PostFeedItem = async ({ post }: { post: Post }) => {
    const session = await getServerSession()
    if (!session?.user) return null

    const user = await usersService.getUserByEmail(session.user.email!)
    if (!user) return null

    return (
        <Card
            className={"w-full max-w-lg"}
            title={post.title}
            description={post.content}
            actions={
                user.role === USER_ROLES.admin
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
                    : []
            }
        />
    )
}
