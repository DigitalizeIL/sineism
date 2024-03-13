import "server-only"

import {
    CreatePostDto,
    EditPostDto,
    GetAllPostsQuery,
    IPost,
} from "@/app/(protected)/(posts)/lib/post.interface"

import { POST_PROPERTY_FOR_CURSOR } from "@/app/_core/consts/pagination.consts"
import prisma from "@/lib/prisma"

export class PostsDbRepository {
    private async getLowestAvailablePostNumber(): Promise<number> {
        const postNumbers = await prisma.post.findMany({
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

    public async getLastPaginationCursor(categoryId: number): Promise<number> {
        const postNumbers = await prisma.post.findMany({
            where: {
                categoryId,
            },
            select: {
                [POST_PROPERTY_FOR_CURSOR]: true,
            },
            orderBy: {
                id: "desc",
            },
            take: 1,
        })

        const cursor = postNumbers[0][
            POST_PROPERTY_FOR_CURSOR
        ] as unknown as number

        return cursor
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
                postNumber: await this.getLowestAvailablePostNumber(),
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
