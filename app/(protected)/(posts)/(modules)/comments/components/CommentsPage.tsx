import { FC, Suspense } from "react"

import { Comment } from "./Comment"
import { CommentHeader } from "@/app/(protected)/(posts)/(modules)/comments/components/CommentHeader"
import { ContentFeed } from "@/app/_core/views/ContentFeed"
import { DEFAULT_PAGE_SIZE } from "../../categories/consts/pagination"
import { PaginationContainer } from "@/app/_core/components/Pagination/Pagination.container"
import { SettingKey } from "../../settings/lib/settings.interface"
import { commentsService } from "../lib/comments.service"
import { settingsService } from "../../settings/lib/settings.service"

type PageProps = {
    paginationId: number
}

export const CommentsPage: FC<PageProps> = async ({ paginationId }) => {
    const itemsPerPage = await settingsService.getSettingValueByKey(
        SettingKey.posts_per_page,
        Number
    )

    const comments = await commentsService.getAllComments({
        id: paginationId,
        perPage: itemsPerPage || DEFAULT_PAGE_SIZE,
    })

    const paginationCursorBoundery =
        await commentsService.getPaginationCursorBoundery()

    return (
        <ContentFeed
            items={comments}
            Header={
                <CommentHeader
                    paginationCursorBoundery={paginationCursorBoundery}
                    page={paginationId}
                />
            }
            FeedItems={comments.map((comment) => (
                <Comment
                    page={paginationId}
                    comment={comment}
                    key={comment.id}
                />
            ))}
            Footer={
                <Suspense>
                    <div className="w-2/12">
                        <PaginationContainer
                            page={paginationId}
                            cursorBoundery={paginationCursorBoundery}
                        />
                    </div>
                </Suspense>
            }
        />
    )
}
