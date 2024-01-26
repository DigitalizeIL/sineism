import { DEFAULT_PAGE_SIZE } from "@/app/(protected)/(posts)/(modules)/categories/consts/pagination"
import { settingsService } from "@/app/(protected)/(posts)/(modules)/settings/lib/services/SettingsService"
import { SettingKey } from "@/app/(protected)/(posts)/(modules)/settings/lib/interfaces/ISettings"
import { SubHeader } from "@/components/Layout"
import { commentsService } from "@/app/(protected)/(posts)/(modules)/comments/lib/services/CommentsService"

type CategoryHeaderProps = { page: number }

export const CommentHeader = async ({ page }: CategoryHeaderProps) => {
    const postsCount = await commentsService.count()

    const postsPerPage = await settingsService.getSettingByKey(
        SettingKey.posts_per_page
    )
    const pageSize = Number(postsPerPage?.value) || DEFAULT_PAGE_SIZE

    return (
        <SubHeader
            title={"תגובות"}
            page={page}
            pageSize={pageSize}
            itemsCount={postsCount}
        />
    )
}
