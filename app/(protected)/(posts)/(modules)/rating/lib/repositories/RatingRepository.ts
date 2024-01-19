import "server-only"
import prisma from "@/lib/prisma"
import {
    IRating,
    IRatingCreate,
} from "@/app/(protected)/(posts)/(modules)/rating/lib/interfaces/IRating"
import { GetRating } from "@/app/(protected)/(posts)/(modules)/rating/lib/interfaces/RatingQuery"

export class RatingRepository {
    async getAll(): Promise<IRating[]> {
        return prisma.rating.findMany()
    }

    async get(filter: GetRating): Promise<IRating | null> {
        return prisma.rating.findFirst({
            where: {
                id: filter.id,
            },
        })
    }

    async create(item: IRatingCreate): Promise<IRating> {
        return prisma.rating.create({
            data: item,
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
