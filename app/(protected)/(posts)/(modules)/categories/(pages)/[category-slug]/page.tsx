import { PAGINATION_URL_PARAM_KEY } from "@/app/_core/consts/pagination.consts"
import { CategoryPage } from "../../components/CategoryPage"

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
