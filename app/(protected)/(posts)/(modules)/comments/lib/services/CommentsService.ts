import "server-only"
import {
    commentsDbRepository,
    CommentsDbRepository,
} from "@/app/(protected)/(posts)/(modules)/comments/lib/repositories/CommentsDbRepository"
import { Comment } from "@/app/(protected)/(posts)/(modules)/comments/lib/models/Comment"
import { IComment } from "@/app/(protected)/(posts)/(modules)/comments/lib/interfaces/IComment"

export interface CommentsService {
    getAllComments(): Promise<IComment[]>

    getPostComments(postId: number): Promise<IComment[]>

    getComment(id: number): Promise<IComment | null>

    createComment(comment: IComment): Promise<IComment>

    updateComment(id: number, comment: Comment): Promise<IComment>

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

    const createComment = async (comment: IComment): Promise<IComment> => {
        return await dependencies.dbRepository.create(comment)
    }

    const updateComment = async (
        id: number,
        comment: IComment
    ): Promise<IComment> => {
        const updatedComment = await dependencies.dbRepository.update(
            id,
            comment
        )

        return Comment.fromJson(updatedComment)
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
