import "server-only"

import { CrudRepository } from "@/lib/repositories/CrudRepository"
import prisma from "@/lib/prisma"
import { ICategory } from "@/app/(protected)/(posts)/(modules)/categories/lib/interfaces/ICategory"
import { DBPagination } from "@/lib/types/pagination"

type CategoryWithoutPosts = Omit<ICategory, "posts">

export interface CategoriesDbRepository extends CrudRepository<ICategory> {
    get(
        id: number,
        withPosts?: boolean,
        pagination?: DBPagination
    ): Promise<ICategory | null>

    count(): Promise<number>

    countPosts(categoryId: number): Promise<number>
}

export const createCategoriesDbRepository = (): CategoriesDbRepository => {
    const getAll = async (): Promise<ICategory[]> => {
        return prisma.category.findMany()
    }

    const get = async (
        id: number,
        withPosts?: boolean,
        pagination?: DBPagination
    ): Promise<ICategory | null> => {
        return prisma.category.findUnique({
            where: { id },
            include: {
                posts: withPosts
                    ? {
                          ...(pagination && {
                              skip: pagination.skip,
                              take: pagination.take,
                          }),
                          orderBy: {
                              postNumber: "asc",
                          },
                      }
                    : false,
            },
        })
    }

    const create = async (item: CategoryWithoutPosts): Promise<ICategory> => {
        return prisma.category.create({
            data: item,
        })
    }

    const update = async (
        id: number,
        item: CategoryWithoutPosts
    ): Promise<ICategory> => {
        return prisma.category.update({
            where: { id },
            data: item,
        })
    }

    const deleteItem = async (id: number): Promise<void> => {
        await prisma.category.delete({
            where: { id },
        })
    }

    const count = async (): Promise<number> => {
        return prisma.category.count()
    }

    const countPosts = async (categoryId: number): Promise<number> => {
        return prisma.post.count({
            where: { categoryId },
        })
    }

    return {
        countPosts,
        count,
        getAll,
        get,
        create,
        update,
        deleteItem,
    }
}

export const categoriesDbRepository = createCategoriesDbRepository()
