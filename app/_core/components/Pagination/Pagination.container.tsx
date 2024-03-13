import { PaginationControls } from "@/app/_core/components/Pagination/PaginationControls"
import { getPaginationId } from "@/app/(protected)/(posts)/(modules)/categories/(pages)/[category-slug]/page"
import { getPostsPerPage } from "@/app/(protected)/(posts)/layout"

type PaginationContainerProps = {
    ids: number[]
}

export const PaginationContainer = async (props: PaginationContainerProps) => {
    const pageSize = getPostsPerPage()
    const page = getPaginationId() || 0
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
