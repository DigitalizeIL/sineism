import { FC, Suspense } from "react"

import { ICategory } from "@/app/(protected)/(posts)/(modules)/categories/lib/category.interface"
import { POST_PROPERTY_FOR_CURSOR } from "@/app/_core/consts/pagination.consts"
import { PaginationContainer } from "../../../../../_core/components/Pagination/Pagination.container"
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
                    <PaginationContainer
                        ids={
                            category.posts?.map(
                                (post) => post[POST_PROPERTY_FOR_CURSOR]
                            ) || []
                        }
                    />
                </Suspense>
            }
        />
    )
}
