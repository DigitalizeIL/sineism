import { CategoryPage } from "../../components/CategoryPage"
import { LoadingDotsOverlay } from "@/app/_core/components/LoadingDots"
import { PAGINATION_URL_PARAM_KEY } from "@/app/_core/consts/pagination.consts"
import { REQUEST_CONTEXT_KEYS } from "@/app/_core/lib/context"
import { Suspense } from "react"

type PageProps = {
    params: {
        "category-slug": string
    }
    searchParams?: { [key: string]: string }
}

export default async function Page(props: PageProps) {
    let paginationId = Number(props.searchParams?.[PAGINATION_URL_PARAM_KEY])
    if (isNaN(paginationId)) paginationId = 1

    return (
        <CategoryPage
            paginationId={paginationId}
            categorySlug={props.params["category-slug"]}
        />
    )
}
