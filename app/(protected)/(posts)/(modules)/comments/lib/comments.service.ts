import "server-only"

import {
    CommentsRepository,
    commentsRepository,
} from "@/app/(protected)/(posts)/(modules)/comments/lib/comments.repository"
import {
    CreateComment,
    IComment,
} from "@/app/(protected)/(posts)/(modules)/comments/lib/comment.interface"
import {
    QuotaRepository,
    quotaRepository,
} from "@/app/(protected)/(payment)/(modules)/comments/lib/quota.repository"

import { DBPagination, Pagination } from "@/app/_core/lib/pagination.types"
import { SettingKey } from "@/app/(protected)/(posts)/(modules)/settings/lib/settings.interface"
import { settingsService } from "@/app/(protected)/(posts)/(modules)/settings/lib/settings.service"

export class CommentsService {
    constructor(
        private readonly commentsRepository: CommentsRepository,
        private readonly quotaService: QuotaRepository
    ) {}

    getAllComments = async (pagination?: Pagination): Promise<IComment[]> => {
        

        return await this.commentsRepository.getAll(
            pagination && {
                cursor: pagination.id,
                take: pagination.perPage,
            }
        )
    }

    getPostComments = async (postId: number): Promise<IComment[]> => {
        return await this.commentsRepository.getAllForPost(postId)
    }

    getComment = async (id: number): Promise<IComment | null> => {
        return await this.commentsRepository.get(id)
    }

    createComment = async (comment: CreateComment): Promise<IComment> => {
        const createdComment = await this.commentsRepository.create(comment)

        const priceSetting = await settingsService.getSettingByKey(
            SettingKey.comments_cost_usd
        )
        const price = Number(priceSetting?.value)

        if (price > 0) {
            await this.quotaService.consumeQuota(createdComment.userId)
        }

        return createdComment
    }

    updateComment = async (
        id: number,
        comment: IComment
    ): Promise<IComment> => {
        return await this.commentsRepository.update(id, comment)
    }

    deleteComment = async (id: number): Promise<void> => {
        const deleted = await this.commentsRepository.deleteItem(id)
        await this.quotaService.addQuota(deleted.userId, 1)
    }

    count = (): Promise<number> => {
        return this.commentsRepository.count()
    }

    public async getPaginationCursors(currentCursor?: number) {
        return this.commentsRepository.getPaginationCursor(currentCursor || 1)
    }
}

export const commentsService = new CommentsService(
    commentsRepository,
    quotaRepository
)
