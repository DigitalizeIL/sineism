import "server-only"
import {
    CreateComment,
    IComment,
} from "@/app/(protected)/(posts)/(modules)/comments/lib/interfaces/IComment"
import {
    commentsDbRepository,
    CommentsDbRepository,
} from "@/app/(protected)/(posts)/(modules)/comments/lib/repositories/CommentsDbRepository"
import {
    quotaService,
    QuotaService,
} from "@/app/(protected)/(payment)/(modules)/comments/lib/QuotaService"
import { Pagination } from "@/lib/types/pagination"

export class CommentsService {
    private readonly quotaService: QuotaService

    constructor(
        private commentsDbRepository: CommentsDbRepository,
        quotaService: QuotaService
    ) {
        this.quotaService = quotaService
    }

    getAllComments = async ({
        pagination,
    }: {
        pagination: Pagination
    }): Promise<IComment[]> => {
        return await this.commentsDbRepository.getAll({
            ...(pagination && {
                skip: (pagination.page - 1) * pagination.perPage,
                take: pagination.perPage,
            }),
        })
    }

    getPostComments = async (postId: number): Promise<IComment[]> => {
        return await this.commentsDbRepository.getAllForPost(postId)
    }

    getComment = async (id: number): Promise<IComment | null> => {
        return await this.commentsDbRepository.get(id)
    }

    createComment = async (comment: CreateComment): Promise<IComment> => {
        const createdComment = await this.commentsDbRepository.create(comment)
        await this.quotaService.consumeQuota(createdComment.userId)

        return createdComment
    }

    updateComment = async (
        id: number,
        comment: IComment
    ): Promise<IComment> => {
        return await this.commentsDbRepository.update(id, comment)
    }

    deleteComment = async (id: number): Promise<void> => {
        await this.commentsDbRepository.deleteItem(id)
    }

    count = (): Promise<number> => {
        return this.commentsDbRepository.count()
    }
}

export const commentsService = new CommentsService(
    commentsDbRepository,
    quotaService
)
