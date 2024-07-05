"use server"

import { revalidatePath } from "next/cache"
import { postsService } from "../lib/posts.service"

export const deletePost = async ({ postId }: { postId: number }) => {
    await postsService.deletePost(postId)
    revalidatePath("/posts")
}
