import { CommentsPage } from "../components/CommentsPage"
import { LoadingDotsOverlay } from "@/app/_core/components/LoadingDots"
import { PAGINATION_URL_PARAM_KEY } from "@/app/_core/consts/pagination.consts"
import { Suspense } from "react"

type PageProps = {
    searchParams?: { [key: string]: string }
}

export default async function page(props: PageProps) {
    let paginationId = Number(props.searchParams?.[PAGINATION_URL_PARAM_KEY])
    if (isNaN(paginationId)) paginationId = 1

    return (
        <Suspense fallback={<LoadingDotsOverlay />}>
            <CommentsPage paginationId={paginationId} />
        </Suspense>
    )
}
