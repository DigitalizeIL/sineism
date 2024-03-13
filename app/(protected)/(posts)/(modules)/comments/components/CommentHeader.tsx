import { IComment } from "../lib/comment.interface"
import { PaginationContainer } from "@/app/_core/components/Pagination/Pagination.container"
import { SubHeader } from "@/components/Layout"
import { Suspense } from "react"

type CategoryHeaderProps = { page: number; comments: IComment[] }

export const CommentHeader = async ({ page }: CategoryHeaderProps) => {
    return (
        <SubHeader
            title={"תגובות"}
            bookmarkReferenceType={"comment"}
            Pagination={
                <Suspense>
                    <PaginationContainer
                        page={page}
                        lastCursor={0}
                    />
                </Suspense>
            }
        />
    )
}
