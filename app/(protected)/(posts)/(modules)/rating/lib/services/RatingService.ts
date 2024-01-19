import "server-only"
import {
    ratingRepository,
    RatingRepository,
} from "@/app/(protected)/(posts)/(modules)/rating/lib/repositories/RatingRepository"
import { GetRating } from "@/app/(protected)/(posts)/(modules)/rating/lib/interfaces/RatingQuery"
import { IRating } from "@/app/(protected)/(posts)/(modules)/rating/lib/interfaces/IRating"

export type RatingServiceDependencies = {
    dbRepository: RatingRepository
}

export class RatingService {
    private dbRepository: RatingRepository

    constructor(dependencies: RatingServiceDependencies) {
        this.dbRepository = dependencies.dbRepository
    }

    async getAllRatings(): Promise<IRating[]> {
        return await this.dbRepository.getAll()
    }

    async getRating(data: { filter: GetRating }): Promise<IRating | null> {
        return await this.dbRepository.get(data.filter)
    }

    async createRating(rating: IRating): Promise<IRating> {
        return await this.dbRepository.create(rating)
    }

    async updateRating(id: number, rating: Partial<IRating>): Promise<IRating> {
        return await this.dbRepository.update(id, rating)
    }

    async deleteRating(id: number): Promise<void> {
        await this.dbRepository.deleteItem(id)
    }

    async countRatings(): Promise<number> {
        return await this.dbRepository.count()
    }
}

export const categoriesService = new RatingService({
    dbRepository: ratingRepository,
})
