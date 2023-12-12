import "server-only"
import {
    commentsDbRepository,
    CommentsDbRepository,
} from "@/app/(protected)/(posts)/(modules)/comments/lib/repositories/CommentsDbRepository"
import {
    CreateCommentType,
    IComment,
} from "@/app/(protected)/(posts)/(modules)/comments/lib/interfaces/IComment"
import { quotaService } from "@/app/(protected)/(payment)/(modules)/comments/lib/QuotaService"

export interface CommentsService {
    getAllComments(): Promise<IComment[]>

    getPostComments(postId: number): Promise<IComment[]>

    getComment(id: number): Promise<IComment | null>

    createComment(comment: CreateCommentType): Promise<IComment>

    updateComment(id: number, comment: Partial<IComment>): Promise<IComment>

    deleteComment(id: number): Promise<void>
}

export type CommentsServiceDependencies = {
    dbRepository: CommentsDbRepository
}

export const createCommentsService = (
    dependencies: CommentsServiceDependencies
): CommentsService => {
    const getAllComments = async (): Promise<IComment[]> => {
        return await dependencies.dbRepository.getAll()
    }

    const getPostComments = async (postId: number): Promise<IComment[]> => {
        return await dependencies.dbRepository.getAllForPost(postId)
    }

    const getComment = async (id: number): Promise<IComment | null> => {
        return await dependencies.dbRepository.get(id)
    }

    const createComment = async (
        comment: CreateCommentType
    ): Promise<IComment> => {
        const createdComment = await dependencies.dbRepository.create(comment)
        await quotaService.consumeQuota(createdComment.userId)

        return createdComment
    }

    const updateComment = async (
        id: number,
        comment: Partial<IComment>
    ): Promise<IComment> => {
        return await dependencies.dbRepository.update(id, comment)
    }

    const deleteComment = async (id: number): Promise<void> => {
        await dependencies.dbRepository.deleteItem(id)
    }

    return {
        getAllComments,
        getPostComments,
        getComment,
        createComment,
        updateComment,
        deleteComment,
    }
}

export const commentsService = createCommentsService({
    dbRepository: commentsDbRepository,
})
