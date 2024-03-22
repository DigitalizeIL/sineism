import "server-only"

import {
    CreateComment,
    IComment,
} from "@/app/(protected)/(posts)/(modules)/comments/lib/comment.interface"

import { COMMENTS_PROPERTY_FOR_CURSOR } from "@/app/_core/consts/pagination.consts"
import { DBPagination } from "@/app/_core/lib/pagination.types"
import prisma from "@/lib/prisma"

export class CommentsRepository {
    constructor() {}

    getAll = async (pagination?: DBPagination): Promise<IComment[]> => {
        return prisma.comment.findMany({
            ...(pagination && {
                ...(pagination.cursor && {
                    where: {
                        [COMMENTS_PROPERTY_FOR_CURSOR]: {
                            gte: pagination.cursor || 0,
                        },
                    },
                }),
                ...(pagination.skip && {
                    skip: pagination.skip,
                }),
                take: pagination.take,
            }),
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

    public async getPaginationCursor(side: "first" | "last"): Promise<number> {
        const commentNumbers = await prisma.comment.findMany({
            select: {
                [COMMENTS_PROPERTY_FOR_CURSOR]: true,
            },
            orderBy: {
                id: side === "first" ? "asc" : "desc",
            },
            take: 1,
        })

        const cursor = commentNumbers[0][
            COMMENTS_PROPERTY_FOR_CURSOR
        ] as unknown as number

        return cursor
    }
}

export const commentsRepository = new CommentsRepository()
