import { FC, Suspense } from "react"
import {
    PaginationContainer,
    PaginationCursorBoundery,
} from "@/app/_core/components/Pagination/Pagination.container"

import { ICategory } from "@/app/(protected)/(posts)/(modules)/categories/lib/category.interface"
import { SubHeader } from "@/components/Layout"

type CategoryHeaderProps = {
    category: ICategory
    paginationCursorBoundery: PaginationCursorBoundery
    paginationId: number
}

export const CategoryHeader: FC<CategoryHeaderProps> = async ({
    category,
    paginationCursorBoundery,
    paginationId,
}) => {
    return (
        <SubHeader
            title={category.name}
            bookmarkReferenceType={category.id?.toString()}
            Pagination={
                <Suspense>
                    <PaginationContainer
                        cursorBoundery={paginationCursorBoundery}
                        page={paginationId}
                    />
                </Suspense>
            }
        />
    )
}
