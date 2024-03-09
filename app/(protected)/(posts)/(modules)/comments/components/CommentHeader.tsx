import { DEFAULT_PAGE_SIZE } from "@/app/(protected)/(posts)/(modules)/categories/consts/pagination"
import { SettingKey } from "@/app/(protected)/(posts)/(modules)/settings/lib/settings.interface"
import { SubHeader } from "@/components/Layout"
import { commentsService } from "@/app/(protected)/(posts)/(modules)/comments/lib/comments.service"
import { settingsService } from "@/app/(protected)/(posts)/(modules)/settings/lib/settings.service"

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
            bookmarkReferenceType={"comment"}
        />
    )
}
