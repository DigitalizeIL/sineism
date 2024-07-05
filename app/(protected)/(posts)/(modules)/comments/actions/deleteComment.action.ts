"use server"

import { revalidatePath } from "next/cache"
import { commentsService } from "../lib/comments.service"

export const deleteComment = async ({ id }: { id: number }) => {
    if (!id) return null
    await commentsService.deleteComment(id)

    revalidatePath("/comments")
}
