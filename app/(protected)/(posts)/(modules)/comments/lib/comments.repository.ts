import "server-only"

import {
    CreateComment,
    IComment,
} from "@/app/(protected)/(posts)/(modules)/comments/lib/comment.interface"

import { BaseContentRepository } from "@/app/_core/lib/repository/baseContent.repository"
import { COMMENTS_PROPERTY_FOR_CURSOR } from "@/app/_core/consts/pagination.consts"
import { DBPagination } from "@/app/_core/lib/pagination.types"
import { DEFAULT_PAGE_SIZE } from "../../categories/consts/pagination"
import { PaginationCursorResponse } from "@/app/_core/types/pagination.types"
import { SettingKey } from "../../settings/lib/settings.interface"
import prisma from "@/lib/prisma"
import { settingsService } from "../../settings/lib/settings.service"

export class CommentsRepository extends BaseContentRepository {
    constructor() {
        super()
        this.initSettings()
    }

    private async initSettings() {
        this.itemsPerPage = await settingsService.getSettingValueByKey(
            SettingKey.posts_per_page,
            Number,
            DEFAULT_PAGE_SIZE
        )
    }

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
