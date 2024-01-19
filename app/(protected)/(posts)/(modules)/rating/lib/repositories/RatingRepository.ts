import "server-only"
import prisma from "@/lib/prisma"
import {
    IRating,
    IRatingCreate,
} from "@/app/(protected)/(posts)/(modules)/rating/lib/interfaces/IRating"
import {
    GetAllRatingsFilter,
    GetRatingFilter,
} from "@/app/(protected)/(posts)/(modules)/rating/lib/interfaces/RatingQuery"

export class RatingRepository {
    async getAll(filter: GetAllRatingsFilter): Promise<IRating[]> {
        return prisma.rating.findMany({
            where: {
                postId: filter.postId || null,
                commentId: filter.commentId || null,
            },
        })
    }

    async get(filter: GetRatingFilter): Promise<IRating | null> {
        return prisma.rating.findFirst({
            where: {
                ...("id" in filter && { id: filter.id }),
                ...("commentId" in filter && {
                    commentId: filter.commentId,
                    userId: filter.userId,
                }),
                ...("postId" in filter && {
                    postId: filter.postId,
                    userId: filter.userId,
                }),
            },
        })
    }

    async create(item: IRatingCreate): Promise<IRating> {
        return prisma.rating.create({
            data: {
                ...item,
                commentId: item.commentId || null,
                postId: item.postId || null,
            },
        })
    }

    async update(id: number, item: Partial<IRating>): Promise<IRating> {
        return prisma.rating.update({
            where: { id },
            data: item,
        })
    }

    async delete(id: number): Promise<void> {
        await prisma.rating.delete({
            where: { id },
        })
    }

    async count(): Promise<number> {
        return prisma.rating.count()
    }
}

export const ratingRepository = new RatingRepository()
