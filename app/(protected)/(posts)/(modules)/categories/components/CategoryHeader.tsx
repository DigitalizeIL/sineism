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
                        <Pagination
                            page={page}
                            categoryId={category.id}
                        />
                    </Suspense>
                )
            }
        />
    )
}

const Pagination = async (props: { page: number; categoryId: number }) => {
    const postsCount = await categoriesService.countCategoryPosts(
        props.categoryId
    )
    const postsPerPage = await settingsService.getSettingByKey(
        SettingKey.posts_per_page
    )
    const pageSize = Number(postsPerPage?.value) || DEFAULT_PAGE_SIZE

    return (
        <PaginationControls
            shouldHidePageNumber={true}
            totalPages={Math.ceil(postsCount / pageSize)}
            page={props.page}
        />
    )
}
