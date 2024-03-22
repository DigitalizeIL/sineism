import { FC, Suspense } from "react"

import { ICategory } from "@/app/(protected)/(posts)/(modules)/categories/lib/category.interface"
import { PaginationContainer } from "../../../../../_core/components/Pagination/Pagination.container"
import { SubHeader } from "@/components/Layout"

type CategoryHeaderProps = {
    category: ICategory
    lastCursor: number
    paginationId: number
}

export const CategoryHeader: FC<CategoryHeaderProps> = async ({
    category,
    lastCursor,
    paginationId,
}) => {
    return (
        <SubHeader
            title={category.name}
            bookmarkReferenceType={category.id?.toString()}
            Pagination={
                <Suspense>
                    <PaginationContainer
                        lastCursor={lastCursor}
                        page={paginationId}
                    />
                </Suspense>
            }
        />
    )
}
