import "server-only"
import {
    CategoriesDbRepository,
    categoriesDbRepository,
} from "@/app/(posts)/(modules)/categories/lib/repositories/CategoriesDbRepository"
import { ICategory } from "@/app/(posts)/(modules)/categories/lib/interfaces/ICategory"
import { Category } from "@/app/(posts)/(modules)/categories/lib/models/Category"

export interface CategoriesService {
    getAllCategories(): Promise<Category[]>

    getCategory(id: number, withPosts?: boolean): Promise<Category | null>

    createCategory(category: ICategory): Promise<Category>

    updateCategory(id: number, category: Category): Promise<Category>

    deleteCategory(id: number): Promise<void>
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

    const getCategory = async (
        id: number,
        withPosts?: boolean
    ): Promise<Category | null> => {
        const category = await dependencies.dbRepository.get(id, withPosts)
        console.log(category)
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

    return {
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
