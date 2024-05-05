import { FC, Suspense } from "react"

import { ICategory } from "@/app/(protected)/(posts)/(modules)/categories/lib/category.interface"
import { PaginationControlles } from "@/app/_core/components/Pagination/PaginationControlls"
import { SubHeader } from "@/components/Layout"

type CategoryHeaderProps = {
    category: ICategory
}

export const CategoryHeader: FC<CategoryHeaderProps> = async ({ category }) => {
    return (
        <SubHeader
            title={category.name}
            bookmarkReferenceType={category.id?.toString()}
            Pagination={
                <Suspense>
                    <PaginationControlles />
                </Suspense>
            }
        />
    )
}
