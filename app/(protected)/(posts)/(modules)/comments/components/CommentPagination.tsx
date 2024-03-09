import { DEFAULT_PAGE_SIZE } from "@/app/(protected)/(posts)/(modules)/categories/consts/pagination"
import { PaginationControls } from "@/app/_core/components/PaginationControls"
import { SettingKey } from "@/app/(protected)/(posts)/(modules)/settings/lib/settings.interface"
import { commentsService } from "@/app/(protected)/(posts)/(modules)/comments/lib/comments.service"
import { settingsService } from "@/app/(protected)/(posts)/(modules)/settings/lib/settings.service"

export const CommentsPagination = async (props: { page: number }) => {
    const commentsCount = await commentsService.count()

    const commentsPerPage = await settingsService.getSettingByKey(
        SettingKey.posts_per_page
    )
    const pageSize = Number(commentsPerPage?.value) || DEFAULT_PAGE_SIZE

    return (
        <PaginationControls
            shouldHidePageNumber={true}
            totalPages={Math.ceil(commentsCount / pageSize)}
            page={props.page}
        />
    )
}
