import { PaginationControlles } from "@/app/_core/components/Pagination/PaginationControlls"
import { SubHeader } from "@/components/Layout"
import { Suspense } from "react"

export const CommentHeader = async ({}) => {
    return (
        <SubHeader
            title={"תגובות"}
            bookmarkReferenceType={"comment"}
            Pagination={
                <Suspense>
                    <PaginationControlles />
                </Suspense>
            }
        />
    )
}
