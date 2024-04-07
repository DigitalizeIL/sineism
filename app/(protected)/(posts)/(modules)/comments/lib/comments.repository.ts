import "server-only"

import {
    CreateComment,
    IComment,
} from "@/app/(protected)/(posts)/(modules)/comments/lib/comment.interface"

import { COMMENTS_PROPERTY_FOR_CURSOR } from "@/app/_core/consts/pagination.consts"
import { DBPagination } from "@/app/_core/lib/pagination.types"
import prisma from "@/lib/prisma"
import { DEFAULT_PAGE_SIZE } from "../../categories/consts/pagination"
import { settingsService } from "../../settings/lib/settings.service"
import { SettingKey } from "../../settings/lib/settings.interface"

export class CommentsRepository {
    private itemsPerPage: number = DEFAULT_PAGE_SIZE;

    constructor() {
        this.initSettings()
    }

    private async initSettings() {
        this.itemsPerPage = await settingsService.getSettingValueByKey(SettingKey.posts_per_page, Number) || DEFAULT_PAGE_SIZE
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
    ): Promise<Array<number | null>> {
        const postNumbers = await prisma.comment.findMany({
            select: {
                [COMMENTS_PROPERTY_FOR_CURSOR]: true,
            },
            orderBy: {
                [COMMENTS_PROPERTY_FOR_CURSOR]: "asc",
            },
        });

        const cursors = postNumbers?.map((item) => item[COMMENTS_PROPERTY_FOR_CURSOR] as unknown as number) || [];

        const currentIndex = cursors.indexOf(currentCursor);

        if (currentIndex === -1) {
            return [1, cursors[cursors.length - 1]];
        }

        const previousCursor = cursors[currentIndex - this.itemsPerPage] ?? 1
        const nextCursor = cursors[currentIndex + this.itemsPerPage] ?? cursors[cursors.length - 1]

        return [previousCursor, nextCursor];
    }

}

export const commentsRepository = new CommentsRepository()
