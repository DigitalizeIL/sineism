import { COMMENTS_PROPERTY_FOR_CURSOR } from "@/app/_core/consts/pagination.consts"
import { IComment } from "../lib/comment.interface"
import { PaginationContainer } from "@/app/_core/components/Pagination/Pagination.container"
import { SubHeader } from "@/components/Layout"
import { Suspense } from "react"

type CategoryHeaderProps = { page: number; comments: IComment[] }

export const CommentHeader = async ({
    page,
    comments,
}: CategoryHeaderProps) => {
    return (
        <SubHeader
            title={"תגובות"}
            bookmarkReferenceType={"comment"}
            Pagination={
                <Suspense>
                    <PaginationContainer
                        page={page}
                        ids={comments.map(
                            (comment) => comment[COMMENTS_PROPERTY_FOR_CURSOR]
                        )}
                    />
                </Suspense>
            }
        />
    )
}
