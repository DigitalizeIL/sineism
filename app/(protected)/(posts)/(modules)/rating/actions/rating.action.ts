"use server"

import { revalidatePath } from "next/cache"
import { IRating } from "../lib/rating.interface"
import { ratingService } from "../lib/rating.service"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"

type UpdateRatingArgs = {
    rating?: IRating | null
    newRating: number | null
    path: string
    commentId?: number
    postId?: number
}

export const updateRating = async ({
    rating,
    newRating,
    path,
    commentId,
    postId,
}: UpdateRatingArgs) => {
    const session = await getAppServerSession(true)

    if (rating) {
        await ratingService.updateRating(rating?.id, {
            rating: newRating,
        })
    } else {
        await ratingService.createRating({
            rating: newRating,
            commentId: commentId || null,
            postId: postId || null,
            userId: session.user.id,
        })
    }

    revalidatePath(path)
}
