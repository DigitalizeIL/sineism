import { categoriesService } from "@/app/(protected)/(posts)/(modules)/categories/lib/services/CategoriesService"
import { notFound } from "next/navigation"
import { DEFAULT_PAGE_SIZE } from "@/app/(protected)/(posts)/(modules)/categories/consts/pagination"
import { CategoryFeed } from "@/app/(protected)/(posts)/(modules)/categories/components/CategoryFeed"
import { EDITED_UTTERANCES_CATEGORY } from "@/app/(protected)/(posts)/(modules)/categories/consts/categories"
import { settingsService } from "@/app/(protected)/(posts)/(modules)/settings/lib/services/SettingsService"

type PageProps = {
    searchParams?: { [key: string]: string }
}

export default async function Page(props: PageProps) {
    const page = Number(props.searchParams?.page || 1)
    const postsPerPage = await settingsService.getSettingByKey("posts_per_page")

    const category = await categoriesService.getCategory({
        id: EDITED_UTTERANCES_CATEGORY.id!,
        withPosts: true,
        pagination: {
            page,
            perPage: Number(postsPerPage?.value) || DEFAULT_PAGE_SIZE,
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
