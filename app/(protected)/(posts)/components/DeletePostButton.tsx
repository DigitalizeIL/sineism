import { AiOutlineDelete } from "react-icons/ai"
import { Button } from "@/components/Button"
import { FiDelete } from "react-icons/fi"
import { postsService } from "@/app/(protected)/(posts)/lib/posts.service"
import { revalidatePath } from "next/cache"

export const DeletePostButton = (props: { postId: number }) => {
    const deletePost = async () => {
        "use server"
        await postsService.deletePost(props.postId)
        revalidatePath("/posts")
    }

    return (
        <div className="flex flex-col space-y-2">
            <form action={deletePost}>
                <Button
                    type="ghost"
                    className={"text-3xl text-black"}>
                    <AiOutlineDelete />
                </Button>
            </form>
        </div>
    )
}
