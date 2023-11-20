import "server-only"
import { Post } from "@/app/(protected)/(posts)/lib/models/Post"
import prisma from "@/lib/prisma"
import {
    CreatePostDto,
    EditPostDto,
} from "@/app/(protected)/(posts)/lib/interfaces/IPost"

export interface PostsDbRepository {
    getAll: () => Promise<Post[]>
    get: (id: number) => Promise<Post>
    create: (item: CreatePostDto) => Promise<Post>
    update: (id: number, item: EditPostDto) => Promise<Post>
    deleteItem: (id: number) => Promise<void>
}

export const createPostsDbRepository = (): PostsDbRepository => {
    const getAll = async (): Promise<Post[]> => {
        const postsResult = await prisma.post.findMany()

        return postsResult.map(Post.fromJson)
    }

    const get = async (id: number): Promise<Post> => {
        const postResult = await prisma.post.findUnique({
            where: { id },
        })

        return Post.fromJson(postResult)
    }

    const create = async (item: CreatePostDto): Promise<Post> => {
        const postResult = await prisma.post.create({
            data: {
                content: item.content || "",
                title: item.title || "",
                categoryId: item.categoryId,
                authorId: item.authorId,
            },
        })

        return Post.fromJson(postResult)
    }

    const update = async (id: number, item: EditPostDto): Promise<Post> => {
        const postResult = await prisma.post.update({
            where: { id },
            data: item,
        })

        return Post.fromJson(postResult)
    }

    const deleteItem = async (id: number): Promise<void> => {
        await prisma.post.delete({
            where: { id },
        })
    }

    return {
        getAll,
        get,
        create,
        update,
        deleteItem,
    }
}

export const postsDbRepository = createPostsDbRepository()
