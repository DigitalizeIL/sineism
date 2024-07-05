"use server"

import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"
import { POST_PROPERTY_FOR_CURSOR } from "@/app/_core/consts/pagination.consts"
import { revalidatePath } from "next/cache"
import { CreatePostDto, IPost } from "../lib/post.interface"
import { postsService } from "../lib/posts.service"

export const createPost = async (formData: FormData) => {
    const session = await getAppServerSession()
    const userId = session?.user?.id

    const id = Number(formData.get("id") as string)
    const title = formData.get("title") as string
    const postNumber = Number(formData.get("postNumber") as string)
    const content = formData.get("content") as string
    const categoryId = Number(formData.get("category") as string)

    let updatePost: IPost

    if (!userId) {
        return false
    }

    let redirectId: number

    if (id) {
        updatePost = await postsService.updatePost(id, {
            categoryId,
            content,
            postNumber,
            title,
        })

        redirectId = id
    } else {
        const post: CreatePostDto = {
            title,
            content,
            categoryId,
            authorId: userId,
        }
        updatePost = await postsService.createPost(post)
        redirectId = updatePost[POST_PROPERTY_FOR_CURSOR]
    }

    const redirectParam = redirectId ? `?page=${redirectId}` : ""

    revalidatePath(`/posts${redirectParam}`)

    return updatePost
}
