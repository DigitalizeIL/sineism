import { ICategory } from "@/app/(protected)/(posts)/(modules)/categories/lib/category.interface"
import { PaginationContainer } from "../../../../../_core/components/Pagination/Pagination.container"
import { SubHeader } from "@/components/Layout"
import { Suspense } from "react"
import { categoriesService } from "../lib/categories.service"

type CategoryHeaderProps = {
    category: ICategory
    page: number
}

export const CategoryHeader = async ({
    category,
    page,
}: CategoryHeaderProps) => {
    return (
        <SubHeader
            title={category.name}
            bookmarkReferenceType={category.id?.toString()}
            Pagination={
                <Suspense>
                    <PaginationContainer
                        page={page}
                        countFunction={() =>
                            category.id
                                ? categoriesService.countCategoryPosts(
                                      category.id
                                  )
                                : Promise.resolve(0)
                        }
                    />
                </Suspense>
            }
        />
    )
}
