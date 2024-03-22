import { FC, Suspense } from "react"
import {
    PaginationContainer,
    PaginationCursorBoundery,
} from "@/app/_core/components/Pagination/Pagination.container"

import { SubHeader } from "@/components/Layout"

type CategoryHeaderProps = {
    page: number
    paginationCursorBoundery: PaginationCursorBoundery
}

export const CommentHeader: FC<CategoryHeaderProps> = async ({
    page,
    paginationCursorBoundery,
}) => {
    return (
        <SubHeader
            title={"תגובות"}
            bookmarkReferenceType={"comment"}
            Pagination={
                <Suspense>
                    <PaginationContainer
                        page={page}
                        cursorBoundery={paginationCursorBoundery}
                    />
                </Suspense>
            }
        />
    )
}
