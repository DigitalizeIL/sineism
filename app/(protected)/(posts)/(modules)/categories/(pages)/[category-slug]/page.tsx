import { CategoryPage } from "../../components/CategoryPage"
import { LoadingDotsOverlay } from "@/app/_core/components/LoadingDots"
import { PAGINATION_URL_PARAM_KEY } from "@/app/_core/consts/pagination.consts"
import { Suspense } from "react"
import { serverContext } from "@/app/_core/lib/context"
import { setPaginationId } from "../../lib/categories.context"

type PageProps = {
    params: {
        "category-slug": string
    }
    searchParams?: { [key: string]: string }
}

export default async function Page(props: PageProps) {
    let paginationId = Number(props.searchParams?.[PAGINATION_URL_PARAM_KEY])
    if (isNaN(paginationId)) paginationId = 1

    setPaginationId(paginationId)

    return (
        <Suspense fallback={<LoadingDotsOverlay />}>
            <CategoryPage categorySlug={props.params["category-slug"]} />
        </Suspense>
    )
}
