import "server-only"

import {
    CategoriesDbRepository,
    CategoryWithoutPosts,
    categoriesDbRepository,
} from "@/app/(protected)/(posts)/(modules)/categories/lib/categories.repository"
import {
    CreateCategory,
    ICategory,
} from "@/app/(protected)/(posts)/(modules)/categories/lib/category.interface"

import { Pagination } from "@/app/_core/lib/pagination.types"
import prisma from "@/lib/prisma"

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
        await prisma?.$connect()
        const result = await this.dbRepository.get(
            data.filter,
            data.withPosts,
            data.pagination && {
                cursor: data.pagination.id,
                take: data.pagination.perPage,
            }
        )
        prisma?.$disconnect()
        return result
    }

    async createCategory(category: CreateCategory): Promise<ICategory> {
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
