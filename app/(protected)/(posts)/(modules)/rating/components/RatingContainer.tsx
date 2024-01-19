import { ratingService } from "@/app/(protected)/(posts)/(modules)/rating/lib/services/RatingService"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"
import { Rating } from "@/app/(protected)/(posts)/(modules)/rating/components/Rating"
import { revalidatePath } from "next/cache"

type RatingProps = {
    postId?: number
    commentId?: number
}

export const RatingContainer = async ({ commentId, postId }: RatingProps) => {
    const session = await getAppServerSession()
    if (!session?.user || !(postId || commentId)) {
        return
    }

    const rating = await ratingService.getRating({
        filter: {
            userId: session.user.id,
            postId,
            commentId,
        },
    })

    const totalRating = await ratingService.getRatingAverage({
        postId,
        commentId,
    })

    const updateRating = async (ratingNumber: number | null, path: string) => {
        "use server"

        if (!session?.user?.id) {
            return
        }

        if (rating) {
            await ratingService.updateRating(rating?.id, {
                rating: ratingNumber,
            })
        } else {
            await ratingService.createRating({
                rating: ratingNumber,
                commentId: commentId || null,
                postId: postId || null,
                userId: session?.user?.id,
            })
        }

        revalidatePath(path)
    }

    return (
        <Rating
            totalRating={totalRating}
            userRating={rating?.rating || null}
            onChange={updateRating}
        />
    )
}
