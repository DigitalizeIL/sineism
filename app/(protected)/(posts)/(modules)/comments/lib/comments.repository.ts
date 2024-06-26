import "server-only"

import {
    CreateComment,
    IComment,
} from "@/app/(protected)/(posts)/(modules)/comments/lib/comment.interface"

import { BaseContentRepository } from "@/app/_core/lib/repository/baseContent.repository"
import { COMMENTS_PROPERTY_FOR_CURSOR } from "@/app/_core/consts/pagination.consts"
import { DBPagination } from "@/app/_core/lib/pagination.types"
import { PaginationCursorResponse } from "@/app/_core/types/pagination.types"
import prisma from "@/lib/prisma"

export class CommentsRepository extends BaseContentRepository {
    getAll = async (pagination?: DBPagination): Promise<IComment[]> => {
        const paginationQuery: any = {}

        if (pagination) {
            paginationQuery.take = pagination.take

            if (pagination.cursor) {
                paginationQuery.where = {
                    [COMMENTS_PROPERTY_FOR_CURSOR]: {
                        gte: pagination.cursor || 0,
                    },
                }
            }

            if (pagination.skip) {
                paginationQuery.skip = pagination.skip
            }
        }

        return prisma.comment.findMany({
            ...paginationQuery,
            orderBy: {
                commentNumber: "asc",
            },
        })
    }

    getAllForPost = async (postId: number): Promise<IComment[]> => {
        return prisma.comment.findMany({
            where: {
                postIds: {
                    has: postId,
                },
            },
        })
    }

    get = async (id: number): Promise<IComment | null> => {
        return prisma.comment.findUnique({
            where: { id },
        })
    }

    create = async (item: CreateComment): Promise<IComment> => {
        return prisma.comment.create({
            data: item,
        })
    }

    update = async (id: number, item: IComment): Promise<IComment> => {
        return prisma.comment.update({
            where: { id },
            data: item,
        })
    }

    deleteItem = async (id: number) => {
        return prisma.comment.delete({
            where: { id },
        })
    }

    count = () => {
        return prisma.comment.count()
    }

    public async getPaginationCursor(
        currentCursor: number
    ): Promise<PaginationCursorResponse> {
        const comments: Partial<IComment>[] = await prisma.comment.findMany({
            select: {
                [COMMENTS_PROPERTY_FOR_CURSOR]: true,
            },
            orderBy: {
                [COMMENTS_PROPERTY_FOR_CURSOR]: "asc",
            },
        })

        if (!comments) {
            return {
                first: 0,
                last: 0,
                next: 0,
                previous: 0,
            }
        }

        const cursors = comments.map(
            (item) => item[COMMENTS_PROPERTY_FOR_CURSOR] as unknown as number
        )

        return this.getPaginationCursors(cursors, currentCursor)
    }
}

export const commentsRepository = new CommentsRepository()
