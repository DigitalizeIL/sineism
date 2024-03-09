import { DEFAULT_PAGE_SIZE } from "@/app/(protected)/(posts)/(modules)/categories/consts/pagination"
import { PaginationControls } from "@/app/_core/components/PaginationControls"
import { SettingKey } from "@/app/(protected)/(posts)/(modules)/settings/lib/settings.interface"
import { categoriesService } from "@/app/(protected)/(posts)/(modules)/categories/lib/categories.service"
import { settingsService } from "@/app/(protected)/(posts)/(modules)/settings/lib/settings.service"

type CategoryPaginationProps = {
    categoryId: number
    page: number
}

export const CatogoryPagination = async (props: CategoryPaginationProps) => {
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
