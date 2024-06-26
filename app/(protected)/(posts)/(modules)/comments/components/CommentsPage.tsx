import { FC, Suspense } from "react"

import { Comment } from "./Comment"
import { ContentFeed } from "@/app/_core/views/ContentFeed"
import { DEFAULT_PAGE_SIZE } from "../../categories/consts/pagination"
import { PaginationControlles } from "@/app/_core/components/Pagination/PaginationControlls"
import { SettingKey } from "../../settings/lib/settings.interface"
import { commentsService } from "../lib/comments.service"
import { settingsService } from "../../settings/lib/settings.service"
import { COMMENTS_PROPERTY_FOR_CURSOR } from "@/app/_core/consts/pagination.consts"
import { SubHeader } from "@/app/_core/components/Layout"

type PageProps = {
    paginationId: number
}

export const CommentsPage: FC<PageProps> = async ({ paginationId }) => {
    const itemsPerPage = await settingsService.getSettingValueByKey(
        SettingKey.posts_per_page,
        Number,
        DEFAULT_PAGE_SIZE
    )

    const comments = await commentsService.getAllComments()

    return (
        <ContentFeed
            cursor={paginationId}
            pageSize={itemsPerPage}
            Header={
                <SubHeader
                    title={"תגובות"}
                    Pagination={
                        <Suspense>
                            <PaginationControlles />
                        </Suspense>
                    }
                />
            }
            feedItems={
                comments?.map((comment) => ({
                    cursor: comment[COMMENTS_PROPERTY_FOR_CURSOR],
                    item: comment,
                    Component: (
                        <Comment
                            comment={comment}
                            key={comment.id}
                        />
                    ),
                })) || []
            }
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
