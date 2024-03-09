import { CommentsPagination } from "./CommentPagination"
import { SubHeader } from "@/components/Layout"
import { Suspense } from "react"

type CategoryHeaderProps = { page: number }

export const CommentHeader = async ({ page }: CategoryHeaderProps) => {
    return (
        <SubHeader
            title={"תגובות"}
            bookmarkReferenceType={"comment"}
            Pagination={
                <Suspense>
                    <CommentsPagination page={page} />
                </Suspense>
            }
        />
    )
}
