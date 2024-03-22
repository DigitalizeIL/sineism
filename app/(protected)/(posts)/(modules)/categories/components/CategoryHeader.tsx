import { FC, Suspense } from "react"
import {
    REQUEST_CONTEXT_KEYS,
    getRequestContext,
} from "@/app/_core/lib/context"

import { ICategory } from "@/app/(protected)/(posts)/(modules)/categories/lib/category.interface"
import { PaginationContainer } from "../../../../../_core/components/Pagination/Pagination.container"
import { SubHeader } from "@/components/Layout"

type CategoryHeaderProps = {
    category: ICategory
    lastCursor: number
}

export const CategoryHeader: FC<CategoryHeaderProps> = async ({
    category,
    lastCursor,
}) => {
    const page = getRequestContext<number>(REQUEST_CONTEXT_KEYS.paginationId)

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
