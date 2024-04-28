import { FC, Suspense } from "react"

import {
    PaginationControlles,
} from "@/app/_core/components/Pagination/PaginationControlls"
import { SubHeader } from "@/components/Layout"

type CategoryHeaderProps = {
    page: number
}

export const CommentHeader: FC<CategoryHeaderProps> = async ({
    page,
}) => {
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
