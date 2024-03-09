import { DEFAULT_PAGE_SIZE } from "@/app/(protected)/(posts)/(modules)/categories/consts/pagination"
import { PaginationControls } from "@/app/_core/components/PaginationControls"
import { SettingKey } from "@/app/(protected)/(posts)/(modules)/settings/lib/settings.interface"
import { settingsService } from "@/app/(protected)/(posts)/(modules)/settings/lib/settings.service"

type PaginationContainerProps = {
    page: number
    ids: number[]
}

export const PaginationContainer = async (props: PaginationContainerProps) => {
    const itemsPerPage = await settingsService.getSettingByKey(
        SettingKey.posts_per_page
    )

    const pageSize = Number(itemsPerPage?.value) || DEFAULT_PAGE_SIZE

    const page = props.page || 0
    const firstId = props.ids && props.ids[0]
    const lastId =
        props.ids &&
        (props.ids.length > 0 || undefined) &&
        props.ids[props.ids?.length - 1]

    const nextPage = (lastId ?? page) + 1
    let previousPage = (firstId ?? page) - pageSize
    if (previousPage < 0) previousPage = 0

    return (
        <PaginationControls
            nextPage={nextPage}
            page={page}
            previousPage={previousPage}
        />
    )
}
