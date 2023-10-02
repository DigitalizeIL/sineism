import { Button } from "@/components/Button"
import { commentsService } from "@/app/(protected)/(posts)/(modules)/comments/lib/services/CommentsService"
import { IComment } from "@/app/(protected)/(posts)/(modules)/comments/lib/interfaces/IComment"
import { IPost } from "@/app/(protected)/(posts)/lib/interfaces/IPost"
import { TextArea } from "@/components/Form/TextArea"
import { revalidatePath } from "next/cache"
import clsx from "clsx"
import { Select } from "@/components/Form/Select"
import { postsService } from "@/app/(protected)/(posts)/lib/services/PostsService"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"

type CreateCommentButtonProps = {
    post?: IPost
    className?: string
}

export const CreateCommentForm = async (props: CreateCommentButtonProps) => {
    let posts: IPost[] = []

    if (!props.post) {
        posts = await postsService.getAllPosts()
    }

    async function createComment(formData: FormData) {
        "use server"
        const session = await getAppServerSession()
        const content = formData.get("content") as string
        const postId = Number(formData.get("postId") as string)

        if (!session?.user || !content || isNaN(postId)) {
            // TODO: show error
            console.log("no content", session, content, props.post)
            return
        }

        const newComment: IComment = {
            userId: session.user.id,
            postId,
            content,
        }

        await commentsService.createComment(newComment)

        revalidatePath("/posts")
    }

    return (
        <div className={clsx(["flex flex-col space-y-2 p-3", props.className])}>
            <form action={createComment}>
                <TextArea
                    name="content"
                    className="w-full"
                    placeholder={"Comment on the post"}
                />
                {props.post ? (
                    <input
                        type={"hidden"}
                        name={"postId"}
                        value={props.post.id}
                    />
                ) : (
                    <Select
                        name={"postId"}
                        options={posts?.map((post) => ({
                            value: post.id,
                            label: post.title,
                        }))}
                    />
                )}
                <Button
                    type="ghost"
                    className={"text-3xl text-black"}>
                    Create comment
                </Button>
            </form>
        </div>
    )
}
