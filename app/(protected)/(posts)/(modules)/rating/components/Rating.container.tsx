import { Rating } from "@/app/(protected)/(posts)/(modules)/rating/components/Rating"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"
import { ratingService } from "@/app/(protected)/(posts)/(modules)/rating/lib/rating.service"
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

        await new Promise((res: any) => {
            setTimeout(() => res(1), 2000)
        })

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
