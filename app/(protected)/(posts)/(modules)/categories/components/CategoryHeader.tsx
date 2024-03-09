import { CatogoryPagination } from "./CategoryPagination"
import { DEFAULT_PAGE_SIZE } from "@/app/(protected)/(posts)/(modules)/categories/consts/pagination"
import { ICategory } from "@/app/(protected)/(posts)/(modules)/categories/lib/category.interface"
import { PaginationControls } from "@/app/_core/components/PaginationControls"
import { SettingKey } from "@/app/(protected)/(posts)/(modules)/settings/lib/settings.interface"
import { SubHeader } from "@/components/Layout"
import { Suspense } from "react"
import { categoriesService } from "@/app/(protected)/(posts)/(modules)/categories/lib/categories.service"
import { settingsService } from "@/app/(protected)/(posts)/(modules)/settings/lib/settings.service"

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
                category.id && (
                    <Suspense>
                        <CatogoryPagination
                            page={page}
                            categoryId={category.id}
                        />
                    </Suspense>
                )
            }
        />
    )
}
