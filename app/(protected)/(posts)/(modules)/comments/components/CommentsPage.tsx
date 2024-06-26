import { FC, Suspense } from "react"

import { SubHeader } from "@/app/_core/components/Layout"
import { PaginationControlles } from "@/app/_core/components/Pagination/PaginationControlls"
import { COMMENTS_PROPERTY_FOR_CURSOR } from "@/app/_core/consts/pagination.consts"
import { ContentFeed } from "@/app/_core/views/ContentFeed"
import { bookmarkService } from "../../bookmark/lib/bookmark.service"
import { commentsService } from "../lib/comments.service"
import { Comment } from "./Comment"

type PageProps = {
    paginationId: number
}

export const CommentsPage: FC<PageProps> = async ({ paginationId }) => {
    const comments = await commentsService.getAllPopulatedCommentsWithRating()

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
