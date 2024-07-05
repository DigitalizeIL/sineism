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
import { bookmarkService } from "../../bookmark/lib/bookmark.service"

type PageProps = {
    paginationId: number
}

export const CommentsPage: FC<PageProps> = async ({ paginationId }) => {
    const comments = await commentsService.getAllCommentsWithRating()

    const activeBookmark = await bookmarkService.getBookmark("comment")

    return (
        <ContentFeed
            cursor={paginationId}
            activeBookmark={activeBookmark}
            Header={<SubHeader title={"תגובות"} />}
            feedItems={
                comments?.map(({ comment, rating }) => ({
                    cursor: comment[COMMENTS_PROPERTY_FOR_CURSOR],
                    item: comment,
                    Component: (
                        <Comment
                            rating={rating}
                            isBookmarked={
                                comment.id === activeBookmark?.bookmarkedItemId
                            }
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
