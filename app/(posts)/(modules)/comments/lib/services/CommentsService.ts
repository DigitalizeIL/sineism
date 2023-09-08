import "server-only"
import {
    commentsDbRepository,
    CommentsDbRepository,
} from "@/app/(posts)/(modules)/comments/lib/repositories/CommentsDbRepository"
import { Comment } from "@/app/(posts)/(modules)/comments/lib/models/Comment"
import { IComment } from "@/app/(posts)/(modules)/comments/lib/interfaces/IComment"

export interface CommentsService {
    getAllComments(postId: number): Promise<Comment[]>

    getComment(id: number): Promise<Comment | null>

    createComment(comment: IComment): Promise<Comment>

    updateComment(id: number, comment: Comment): Promise<Comment>

    deleteComment(id: number): Promise<void>
}

export type CommentsServiceDependencies = {
    dbRepository: CommentsDbRepository
}

export const createCommentsService = (
    dependencies: CommentsServiceDependencies
): CommentsService => {
    const getAllComments = async (postId: number): Promise<Comment[]> => {
        const comments = await dependencies.dbRepository.getAllForPost(postId)

        return comments.map((comment) => Comment.fromJson(comment))
    }

    const getComment = async (id: number): Promise<Comment | null> => {
        const comment = await dependencies.dbRepository.get(id)

        if (!comment) return null

        return Comment.fromJson(comment)
    }

    const createComment = async (comment: IComment): Promise<Comment> => {
        const createdComment = await dependencies.dbRepository.create(comment)

        return Comment.fromJson(createdComment)
    }

    const updateComment = async (
        id: number,
        comment: Comment
    ): Promise<Comment> => {
        const updatedComment = await dependencies.dbRepository.update(
            id,
            comment.toJson()
        )

        return Comment.fromJson(updatedComment)
    }

    const deleteComment = async (id: number): Promise<void> => {
        await dependencies.dbRepository.deleteItem(id)
    }

    return {
        getAllComments,
        getComment,
        createComment,
        updateComment,
        deleteComment,
    }
}

export const commentsService = createCommentsService({
    dbRepository: commentsDbRepository,
})
