import "server-only"
import { ICategory } from "@/app/(protected)/(posts)/(modules)/categories/lib/interfaces/ICategory"
import { Pagination } from "@/lib/types/pagination"
import {
    CategoriesDbRepository,
    categoriesDbRepository,
    CategoryWithoutPosts,
} from "@/app/(protected)/(posts)/(modules)/categories/lib/repositories/CategoriesDbRepository"

export type GetCategoryFilter = {
    id?: number
    path?: string
}

export type CategoriesServiceDependencies = {
    dbRepository: CategoriesDbRepository
}

export class CategoriesService {
    private dbRepository: CategoriesDbRepository

    constructor(dependencies: CategoriesServiceDependencies) {
        this.dbRepository = dependencies.dbRepository
    }

    async getAllCategories(): Promise<ICategory[]> {
        return await this.dbRepository.getAll()
    }

    async getCategory(data: {
        filter: GetCategoryFilter
        withPosts?: boolean
        pagination?: Pagination
    }): Promise<ICategory | null> {
        return await this.dbRepository.get(
            data.filter,
            data.withPosts,
            data.pagination && {
                skip: (data.pagination.page - 1) * data.pagination.perPage,
                take: data.pagination.perPage,
            }
        )
    }

    async createCategory(category: ICategory): Promise<ICategory> {
        return await this.dbRepository.create(category)
    }

    async updateCategory(
        id: number,
        category: CategoryWithoutPosts
    ): Promise<ICategory> {
        return await this.dbRepository.update(id, category)
    }

    async deleteCategory(id: number): Promise<void> {
        await this.dbRepository.deleteItem(id)
    }

    async countCategories(): Promise<number> {
        return await this.dbRepository.count()
    }

    async countCategoryPosts(categoryId: number): Promise<number> {
        return await this.dbRepository.countPosts(categoryId)
    }
}

export const categoriesService = new CategoriesService({
    dbRepository: categoriesDbRepository,
})
