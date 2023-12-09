import "server-only"
import {
    CategoriesDbRepository,
    categoriesDbRepository,
} from "@/app/(protected)/(posts)/(modules)/categories/lib/repositories/CategoriesDbRepository"
import { ICategory } from "@/app/(protected)/(posts)/(modules)/categories/lib/interfaces/ICategory"
import { Category } from "@/app/(protected)/(posts)/(modules)/categories/lib/models/Category"
import { Pagination } from "@/lib/types/pagination"

export interface CategoriesService {
    getAllCategories(): Promise<ICategory[]>

    getCategory(data: {
        id: number
        withPosts?: boolean
        pagination?: Pagination
    }): Promise<ICategory | null>

    createCategory(category: ICategory): Promise<ICategory>

    updateCategory(id: number, category: Category): Promise<ICategory>

    deleteCategory(id: number): Promise<void>

    countCategories(): Promise<number>

    countCategoryPosts(categoryId: number): Promise<number>
}

export type CategoriesServiceDependencies = {
    dbRepository: CategoriesDbRepository
}

export const createCategoriesService = (
    dependencies: CategoriesServiceDependencies
): CategoriesService => {
    const getAllCategories = async (): Promise<ICategory[]> => {
        return await dependencies.dbRepository.getAll()
    }

    const getCategory = async (data: {
        id: number
        withPosts?: boolean
        pagination?: Pagination
    }): Promise<ICategory | null> => {
        return await dependencies.dbRepository.get(
            data.id,
            data.withPosts,
            data.pagination && {
                skip: (data.pagination.page - 1) * data.pagination.perPage,
                take: data.pagination.perPage,
            }
        )
    }

    const createCategory = async (category: ICategory): Promise<ICategory> => {
        return await dependencies.dbRepository.create(category)
    }

    const updateCategory = async (
        id: number,
        category: Partial<ICategory>
    ): Promise<ICategory> => {
        return await dependencies.dbRepository.update(id, category)
    }

    const deleteCategory = async (id: number): Promise<void> => {
        await dependencies.dbRepository.deleteItem(id)
    }

    const countCategories = async (): Promise<number> => {
        return await dependencies.dbRepository.count()
    }

    const countCategoryPosts = async (categoryId: number): Promise<number> => {
        return await dependencies.dbRepository.countPosts(categoryId)
    }

    return {
        countCategoryPosts,
        countCategories,
        getAllCategories,
        getCategory,
        createCategory,
        updateCategory,
        deleteCategory,
    }
}

export const categoriesService = createCategoriesService({
    dbRepository: categoriesDbRepository,
})
