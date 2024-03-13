import {
    COMMENTS_PROPERTY_FOR_CURSOR,
    PAGINATION_URL_PARAM_KEY,
} from "@/app/_core/consts/pagination.consts"

import { Comment } from "../components/Comment"
import { CommentHeader } from "@/app/(protected)/(posts)/(modules)/comments/components/CommentHeader"
import { ContentFeed } from "@/app/_core/views/ContentFeed"
import { DEFAULT_PAGE_SIZE } from "../../categories/consts/pagination"
import { PaginationContainer } from "@/app/_core/components/Pagination/Pagination.container"
import { SettingKey } from "../../settings/lib/settings.interface"
import { Suspense } from "react"
import { commentsService } from "../lib/comments.service"
import { settingsService } from "../../settings/lib/settings.service"

type PageProps = {
    searchParams?: { [key: string]: string }
}

export default async function CommentsPage(props: PageProps) {
    let paginationId = Number(props.searchParams?.[PAGINATION_URL_PARAM_KEY])
    if (isNaN(paginationId)) paginationId = 1

    const itemsPerPageValue = await settingsService.getSettingByKey(
        SettingKey.posts_per_page
    )
    const itemsPerPage = itemsPerPageValue?.value
        ? Number(itemsPerPageValue?.value)
        : DEFAULT_PAGE_SIZE

    const comments = await commentsService.getAllComments({
        pagination: {
            id: paginationId,
            perPage: itemsPerPage,
        },
    })

    return (
        <ContentFeed
            items={comments}
            Header={
                <CommentHeader
                    page={paginationId}
                    comments={comments}
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
                    <PaginationContainer
                        page={paginationId}
                        lastCursor={0}
                    />
                </Suspense>
            }
        />
    )
}
