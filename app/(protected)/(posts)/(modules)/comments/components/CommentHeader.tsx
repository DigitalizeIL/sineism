import { FC, Suspense } from "react"
import {
    PaginationContainer,
} from "@/app/_core/components/Pagination/Pagination.container"

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
                    <PaginationContainer
                        page={page}
                    />
                </Suspense>
            }
        />
    )
}
