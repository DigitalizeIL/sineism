import { categoriesService } from "@/app/(protected)/(posts)/(modules)/categories/lib/services/CategoriesService"
import { notFound } from "next/navigation"
import { DEFAULT_PAGE_SIZE } from "@/app/(protected)/(posts)/(modules)/categories/consts/pagination"
import { CategoryFeed } from "@/app/(protected)/(posts)/(modules)/categories/components/CategoryFeed"

type PageProps = {
    params: {
        categoryId: string
    }
    searchParams?: { [key: string]: string }
}

export default async function Page(props: PageProps) {
    const page = Number(props.searchParams?.page || 1)
    const limit = DEFAULT_PAGE_SIZE

    const category = await categoriesService.getCategory({
        id: Number(props.params.categoryId),
        withPosts: true,
        pagination: {
            page,
            perPage: limit,
        },
    })

    if (!category) {
        return notFound()
    }

    return (
        <CategoryFeed
            category={category}
            page={page}
        />
    )
}
