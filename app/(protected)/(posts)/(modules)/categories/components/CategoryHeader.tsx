import { FC, Suspense } from "react"

import { ICategory } from "@/app/(protected)/(posts)/(modules)/categories/lib/category.interface"
import { PaginationContainer } from "../../../../../_core/components/Pagination/Pagination.container"
import { SubHeader } from "@/components/Layout"
import { getLastPostCursor } from "./CategoryPage"
import { getPaginationId } from "../lib/categories.context"

type CategoryHeaderProps = {
    category: ICategory
}

export const CategoryHeader: FC<CategoryHeaderProps> = async ({ category }) => {
    const page = getPaginationId()
    const lastCursor = getLastPostCursor()

    return (
        <SubHeader
            title={category.name}
            bookmarkReferenceType={category.id?.toString()}
            Pagination={
                <Suspense>
                    <PaginationContainer
                        lastCursor={lastCursor}
                        page={page}
                    />
                </Suspense>
            }
        />
    )
}
