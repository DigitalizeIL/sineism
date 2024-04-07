import { FC, Suspense } from "react"
import {
    PaginationContainer,
} from "@/app/_core/components/Pagination/Pagination.container"

import { ICategory } from "@/app/(protected)/(posts)/(modules)/categories/lib/category.interface"
import { SubHeader } from "@/components/Layout"

type CategoryHeaderProps = {
    category: ICategory
    paginationId: number
}

export const CategoryHeader: FC<CategoryHeaderProps> = async ({
    category,
    paginationId,
}) => {
    return (
        <SubHeader
            title={category.name}
            bookmarkReferenceType={category.id?.toString()}
            Pagination={
                <Suspense>
                    <PaginationContainer
                        page={paginationId}
                    />
                </Suspense>
            }
        />
    )
}
