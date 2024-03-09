import { CategoryFeed } from "@/app/(protected)/(posts)/(modules)/categories/components/CategoryFeed"
import { DEFAULT_PAGE_SIZE } from "@/app/(protected)/(posts)/(modules)/categories/consts/pagination"
import { SettingKey } from "@/app/(protected)/(posts)/(modules)/settings/lib/settings.interface"
import { UTTERANCES_CATEGORY } from "@/app/(protected)/(posts)/(modules)/categories/consts/categories"
import { categoriesService } from "@/app/(protected)/(posts)/(modules)/categories/lib/categories.service"
import { notFound } from "next/navigation"
import { settingsService } from "@/app/(protected)/(posts)/(modules)/settings/lib/settings.service"

type PageProps = {
    params: {
        "category-slug": string
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
            path: props.params["category-slug"],
        },
        withPosts: true,
        pagination: {
            page,
            perPage: postsPerPage?.value
                ? Number(postsPerPage?.value)
                : DEFAULT_PAGE_SIZE,
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
