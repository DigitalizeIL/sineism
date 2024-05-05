import { FC, Suspense } from "react"

import { Comment } from "./Comment"
import { CommentHeader } from "@/app/(protected)/(posts)/(modules)/comments/components/CommentHeader"
import { ContentFeed } from "@/app/_core/views/ContentFeed"
import { DEFAULT_PAGE_SIZE } from "../../categories/consts/pagination"
import { PaginationControlles } from "@/app/_core/components/Pagination/PaginationControlls"
import { SettingKey } from "../../settings/lib/settings.interface"
import { commentsService } from "../lib/comments.service"
import { settingsService } from "../../settings/lib/settings.service"

type PageProps = {
    paginationId: number
}

export const CommentsPage: FC<PageProps> = async ({ paginationId }) => {
    const itemsPerPage = await settingsService.getSettingValueByKey(
        SettingKey.posts_per_page,
        Number,
        DEFAULT_PAGE_SIZE
    )

    const comments = await commentsService.getAllComments({
        id: paginationId,
        perPage: itemsPerPage,
    })

    const paginationCursors =
        await commentsService.getPaginationCursors(paginationId)

    return (
        <ContentFeed
            cursor={paginationId}
            pageSize={itemsPerPage}
            items={comments}
            cursors={paginationCursors}
            Header={<CommentHeader />}
            feedItems={comments.map((comment) => (
                <Comment
                    page={paginationId}
                    comment={comment}
                    key={comment.id}
                />
            ))}
            Footer={
                <Suspense>
                    <div className="w-3/12 flex justify-end">
                        <PaginationControlles />
                    </div>
                </Suspense>
            }
        />
    )
}
