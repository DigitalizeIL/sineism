import "server-only"
import { commentsDbRepository } from "@/app/(protected)/(posts)/(modules)/comments/lib/repositories/CommentsDbRepository"
import { Comment } from "@/app/(protected)/(posts)/(modules)/comments/lib/models/Comment"
import { IComment } from "@/app/(protected)/(posts)/(modules)/comments/lib/interfaces/IComment"
import { quotaService } from "@/app/(protected)/(payment)/(modules)/comments/lib/QuotaService"

export const createCommentsService = () => {
    const getAllComments = async (): Promise<IComment[]> => {
        return await commentsDbRepository.getAll()
    }

    const getPostComments = async (postId: number): Promise<IComment[]> => {
        return await commentsDbRepository.getAllForPost(postId)
    }

    const getComment = async (id: number): Promise<IComment | null> => {
        return await commentsDbRepository.get(id)
    }

    const createComment = async (comment: IComment): Promise<IComment> => {
        const createdComment = await commentsDbRepository.create(comment)
        await quotaService.consumeQuota(createdComment.userId)

        return createdComment
    }

    const updateComment = async (
        id: number,
        comment: IComment
    ): Promise<IComment> => {
        const updatedComment = await commentsDbRepository.update(id, comment)

        return Comment.fromJson(updatedComment)
    }

    const deleteComment = async (id: number): Promise<void> => {
        await commentsDbRepository.deleteItem(id)
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

export const commentsService = createCommentsService()
