import { ICategory } from "@/app/(protected)/(posts)/(modules)/categories/lib/interfaces/ICategory"
import { MoveToBookmarkButton } from "@/app/(protected)/(posts)/(modules)/bookmark/components/MoveToBookmarkButton"
import { categoriesService } from "@/app/(protected)/(posts)/(modules)/categories/lib/services/CategoriesService"
import { DEFAULT_PAGE_SIZE } from "@/app/(protected)/(posts)/(modules)/categories/consts/pagination"
import { settingsService } from "@/app/(protected)/(posts)/(modules)/settings/lib/services/SettingsService"
import { SettingKey } from "@/app/(protected)/(posts)/(modules)/settings/lib/interfaces/ISettings"
import { SubHeader } from "@/components/Layout"

type CategoryHeaderProps = { category: ICategory; page: number }

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
            actions={
                category.id !== undefined && (
                    <MoveToBookmarkButton
                        categoryId={category.id}
                        categoryPath={category.path}
                    />
                )
            }
        />
    )
}
