import "server-only"

import {
    CreatePostDto,
    EditPostDto,
    GetAllPostsQuery,
    IPost,
} from "@/app/(protected)/(posts)/lib/post.interface"

import { BaseContentRepository } from "@/app/_core/lib/repository/baseContent.repository"
import { DEFAULT_PAGE_SIZE } from "../(modules)/categories/consts/pagination"
import { POST_PROPERTY_FOR_CURSOR } from "@/app/_core/consts/pagination.consts"
import { PaginationCursorResponse } from "@/app/_core/types/pagination.types"
import { SettingKey } from "../(modules)/settings/lib/settings.interface"
import prisma from "@/lib/prisma"
import { settingsService } from "../(modules)/settings/lib/settings.service"

export class PostsDbRepository extends BaseContentRepository {
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

    private async getLowestAvailablePostNumber(
        categoryId: number
    ): Promise<number> {
        const postNumbers: Pick<IPost, "postNumber">[] =
            await prisma.post.findMany({
                where: {
                    categoryId,
                },
                select: {
                    postNumber: true,
                },
                orderBy: {
                    postNumber: "asc",
                },
            })

        const numbers = postNumbers.map((p) => p.postNumber)

        for (let i = 0; i < numbers.length; i++) {
            if (numbers[i] !== i + 1) {
                return i + 1 // +1 because post numbers are 1-based
            }
        }

        return numbers.length + 1
    }

    public async getPaginationCursorBoundary(
        categoryId: number,
        side: "first" | "last"
    ): Promise<number> {
        const postNumbers = await prisma.post.findMany({
            where: {
                categoryId,
            },
            select: {
                [POST_PROPERTY_FOR_CURSOR]: true,
            },
            orderBy: {
                id: side === "first" ? "asc" : "desc",
            },
            take: 1,
        })

        const cursor = postNumbers[0]?.[
            POST_PROPERTY_FOR_CURSOR
        ] as unknown as number

        return cursor
    }

    public async getPaginationCursor(
        categoryId: number,
        currentCursor: number
    ): Promise<PaginationCursorResponse> {
        const postNumbers: Partial<IPost>[] = await prisma.post.findMany({
            where: {
                categoryId,
            },
            select: {
                [POST_PROPERTY_FOR_CURSOR]: true,
            },
            orderBy: {
                [POST_PROPERTY_FOR_CURSOR]: "asc",
            },
        })

        if (!postNumbers) {
            return {
                first: 0,
                last: 0,
                next: 0,
                previous: 0,
            }
        }

        const cursors = postNumbers.map(
            (item) => item[POST_PROPERTY_FOR_CURSOR] as unknown as number
        )

        return this.getPaginationCursors(cursors, currentCursor)
    }

    public async getAll(query?: GetAllPostsQuery): Promise<IPost[]> {
        return prisma.post.findMany({
            where: {
                ...(query?.ids && {
                    id: {
                        in: query.ids,
                    },
                }),
            },
            orderBy: {
                postNumber: "asc",
            },
        })
    }

    public async get(id: number): Promise<IPost | null> {
        return prisma.post.findUnique({
            where: { id },
        })
    }

    public async create(item: CreatePostDto): Promise<IPost> {
        return prisma.post.create({
            data: {
                content: item.content || "",
                title: item.title || "",
                categoryId: item.categoryId,
                authorId: item.authorId,
                postNumber: await this.getLowestAvailablePostNumber(
                    item.categoryId
                ),
            },
        })
    }

    public async update(id: number, item: EditPostDto): Promise<IPost> {
        return prisma.post.update({
            where: { id },
            data: item,
        })
    }

    public async deleteItem(id: number): Promise<void> {
        await prisma.post.delete({
            where: { id },
        })
    }
}

export const postsDbRepository = new PostsDbRepository()
