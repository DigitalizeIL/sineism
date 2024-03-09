import "server-only"

import {
    GetAllRatingsFilter,
    GetRatingFilter,
    IRating,
    IRatingCreate,
} from "@/app/(protected)/(posts)/(modules)/rating/lib/rating.interface"
import {
    RatingRepository,
    ratingRepository,
} from "@/app/(protected)/(posts)/(modules)/rating/lib/rating.repository"

export type RatingServiceDependencies = {
    dbRepository: RatingRepository
}

export class RatingService {
    private dbRepository: RatingRepository

    constructor(dependencies: RatingServiceDependencies) {
        this.dbRepository = dependencies.dbRepository
    }

    async getAllRatings(filter: GetAllRatingsFilter): Promise<IRating[]> {
        return await this.dbRepository.getAll(filter)
    }

    async getRating(data: {
        filter: GetRatingFilter
    }): Promise<IRating | null> {
        return await this.dbRepository.get(data.filter)
    }

    async createRating(rating: IRatingCreate): Promise<IRating> {
        return await this.dbRepository.create(rating)
    }

    async updateRating(id: number, rating: Partial<IRating>): Promise<IRating> {
        return await this.dbRepository.update(id, rating)
    }

    async deleteRating(id: number): Promise<void> {
        await this.dbRepository.delete(id)
    }

    async countRatings(): Promise<number> {
        return await this.dbRepository.count()
    }

    async getRatingAverage(filter: GetAllRatingsFilter) {
        const posts = await this.dbRepository.getAll(filter)

        return (
            posts.reduce((acc, post) => acc + (post.rating || 0), 0) /
            posts.length
        )
    }
}

export const ratingService = new RatingService({
    dbRepository: ratingRepository,
})
