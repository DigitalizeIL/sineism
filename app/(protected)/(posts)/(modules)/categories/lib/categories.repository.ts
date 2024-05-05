import "server-only"

import {
    CreateCategory,
    ICategory,
} from "@/app/(protected)/(posts)/(modules)/categories/lib/category.interface"

import { DBPagination } from "@/app/_core/lib/pagination.types"
import { GetCategoryFilter } from "@/app/(protected)/(posts)/(modules)/categories/lib/categories.service"
import { POST_PROPERTY_FOR_CURSOR } from "@/app/_core/consts/pagination.consts"
import prisma from "@/lib/prisma"

export type CategoryWithoutPosts = Omit<ICategory, "posts">

export class CategoriesDbRepository {
    async getAll(): Promise<ICategory[]> {
        return prisma.category.findMany()
    }

    async get(
        filter: GetCategoryFilter,
        withPosts?: boolean,
        pagination?: DBPagination
    ): Promise<ICategory | null> {
        if (!filter.id && !filter.path) {
            return null
        }

        let paginationQuery: any = {}

        if (pagination) {
            paginationQuery.take = pagination.take

            if (pagination.cursor) {
                paginationQuery.where = {
                    [POST_PROPERTY_FOR_CURSOR]: {
                        gte: pagination.cursor || 0,
                    },
                }
            }

            if (pagination.skip) {
                paginationQuery.skip = pagination.skip
            }
        }

        return prisma.category.findFirst({
            where: {
                ...(filter.id && {
                    id: filter.id,
                }),
                ...(filter.path && {
                    path: filter.path,
                }),
            },
            include: {
                posts: withPosts
                    ? {
                          ...paginationQuery,
                          orderBy: {
                              postNumber: "asc",
                          },
                      }
                    : false,
            },
        })
    }

    async create(item: CreateCategory): Promise<ICategory> {
        return prisma.category.create({
            data: item,
        })
    }

    async update(id: number, item: CategoryWithoutPosts): Promise<ICategory> {
        return prisma.category.update({
            where: { id },
            data: item,
        })
    }

    async deleteItem(id: number): Promise<void> {
        await prisma.category.delete({
            where: { id },
        })
    }

    async count(): Promise<number> {
        return prisma.category.count()
    }

    async countPosts(categoryId: number): Promise<number> {
        return prisma.post.count({
            where: { categoryId },
        })
    }
}

export const categoriesDbRepository = new CategoriesDbRepository()
