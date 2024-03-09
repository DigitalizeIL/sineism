import { DEFAULT_PAGE_SIZE } from "@/app/(protected)/(posts)/(modules)/categories/consts/pagination"
import { PaginationControls } from "@/app/_core/components/PaginationControls"
import { SettingKey } from "@/app/(protected)/(posts)/(modules)/settings/lib/settings.interface"
import { settingsService } from "@/app/(protected)/(posts)/(modules)/settings/lib/settings.service"

type PaginationContainerProps = {
    countFunction: () => Promise<number>
    page: number
}

export const PaginationContainer = async (props: PaginationContainerProps) => {
    const itemsCount = await props.countFunction()
    const itemsPerPage = await settingsService.getSettingByKey(
        SettingKey.posts_per_page
    )
    const pageSize = Number(itemsPerPage?.value) || DEFAULT_PAGE_SIZE

    return (
        <PaginationControls
            shouldHidePageNumber={true}
            totalPages={Math.ceil(itemsCount / pageSize)}
            page={props.page}
        />
    )
}
