import { DEFAULT_PAGE_SIZE } from "@/app/(protected)/(posts)/(modules)/categories/consts/pagination"
import { ICategory } from "@/app/(protected)/(posts)/(modules)/categories/lib/category.interface"
import { SettingKey } from "@/app/(protected)/(posts)/(modules)/settings/lib/settings.interface"
import { SubHeader } from "@/components/Layout"
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
    const postsCount = await categoriesService.countCategoryPosts(category.id!)
    const postsPerPage = await settingsService.getSettingByKey(
        SettingKey.posts_per_page
    )
    const pageSize = Number(postsPerPage?.value) || DEFAULT_PAGE_SIZE

    return (
        <SubHeader
            title={category.name}
            page={page}
            pageSize={pageSize}
            itemsCount={postsCount}
            bookmarkReferenceType={category.id?.toString()}
        />
    )
}
