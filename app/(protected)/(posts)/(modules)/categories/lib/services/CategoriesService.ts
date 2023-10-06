import "server-only"
import {
    CategoriesDbRepository,
    categoriesDbRepository,
} from "@/app/(protected)/(posts)/(modules)/categories/lib/repositories/CategoriesDbRepository"
import { ICategory } from "@/app/(protected)/(posts)/(modules)/categories/lib/interfaces/ICategory"
import { Category } from "@/app/(protected)/(posts)/(modules)/categories/lib/models/Category"
import { Pagination } from "@/lib/types/pagination"

export interface CategoriesService {
    getAllCategories(): Promise<Category[]>

    getCategory(data: {
        id: number
        withPosts?: boolean
        pagination?: Pagination
    }): Promise<Category | null>

    createCategory(category: ICategory): Promise<Category>

    updateCategory(id: number, category: Category): Promise<Category>

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
    const getAllCategories = async (): Promise<Category[]> => {
        const categories = await dependencies.dbRepository.getAll()

        return categories.map((category) => Category.fromJson(category))
    }

    const getCategory = async (data: {
        id: number
        withPosts?: boolean
        pagination?: Pagination
    }): Promise<Category | null> => {
        if (!data.id) return null

        const category = await dependencies.dbRepository.get(
            data.id,
            data.withPosts,
            data.pagination && {
                skip: (data.pagination.page - 1) * data.pagination.perPage,
                take: data.pagination.perPage,
            }
        )

        if (!category) return null

        return Category.fromJson(category)
    }

    const createCategory = async (category: ICategory): Promise<Category> => {
        const createdCategory = await dependencies.dbRepository.create(category)

        return Category.fromJson(createdCategory)
    }

    const updateCategory = async (
        id: number,
        category: Partial<ICategory>
    ): Promise<Category> => {
        const updatedCategory = await dependencies.dbRepository.update(
            id,
            category
        )

        return Category.fromJson(updatedCategory)
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
