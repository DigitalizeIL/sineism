import { CommentsPagination } from "./CommentPagination"
import { PaginationContainer } from "@/app/_core/components/Pagination/Pagination.container"
import { SubHeader } from "@/components/Layout"
import { Suspense } from "react"
import { commentsService } from "../lib/comments.service"

type CategoryHeaderProps = { page: number }

export const CommentHeader = async ({ page }: CategoryHeaderProps) => {
    return (
        <SubHeader
            title={"תגובות"}
            bookmarkReferenceType={"comment"}
            Pagination={
                <Suspense>
                    <PaginationContainer
                        page={page}
                        countFunction={commentsService.count}
                    />
                </Suspense>
            }
        />
    )
}
