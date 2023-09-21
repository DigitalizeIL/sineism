import "server-only"

import { CrudRepository } from "@/lib/repositories/CrudRepository"
import prisma from "@/lib/prisma"
import { IComment } from "@/app/(protected)/(posts)/(modules)/comments/lib/interfaces/IComment"

export interface CommentsDbRepository extends CrudRepository<IComment> {
    getAllForPost(postId: number): Promise<IComment[]>
}

export const createCommentsDbRepository = (): CommentsDbRepository => {
    const getAll = async (): Promise<IComment[]> => {
        return prisma.comment.findMany()
    }

    const getAllForPost = async (postId: number): Promise<IComment[]> => {
        return prisma.comment.findMany({
            where: {
                postId,
            },
        })
    }

    const get = async (id: number): Promise<IComment | null> => {
        return prisma.comment.findUnique({
            where: { id },
        })
    }

    const create = async (item: IComment): Promise<IComment> => {
        return prisma.comment.create({
            data: item,
        })
    }

    const update = async (id: number, item: IComment): Promise<IComment> => {
        return prisma.comment.update({
            where: { id },
            data: item,
        })
    }

    const deleteItem = async (id: number): Promise<void> => {
        await prisma.comment.delete({
            where: { id },
        })
    }

    return {
        getAll,
        getAllForPost,
        get,
        create,
        update,
        deleteItem,
    }
}

export const commentsDbRepository = createCommentsDbRepository()
