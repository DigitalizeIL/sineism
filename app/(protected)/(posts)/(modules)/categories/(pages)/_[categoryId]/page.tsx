import { categoriesService } from "@/app/(protected)/(posts)/(modules)/categories/lib/services/CategoriesService"
import { notFound } from "next/navigation"
import { DEFAULT_PAGE_SIZE } from "@/app/(protected)/(posts)/(modules)/categories/consts/pagination"
import { CategoryFeed } from "@/app/(protected)/(posts)/(modules)/categories/components/CategoryFeed"
import { settingsService } from "@/app/(protected)/(posts)/(modules)/settings/lib/services/SettingsService"
import { SettingKey } from "@/app/(protected)/(posts)/(modules)/settings/lib/interfaces/ISettings"

type PageProps = {
    params: {
        categoryId: string
    }
    searchParams?: { [key: string]: string }
}

export default async function Page(props: PageProps) {
    const page = Number(props.searchParams?.page || 1)
    const postsPerPage = await settingsService.getSettingByKey(
        SettingKey.posts_per_page
    )

    const category = await categoriesService.getCategory({
        filter: {
            id: Number(props.params.categoryId),
        },
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
