import { CategoryFeed } from "@/app/(protected)/(posts)/(modules)/categories/components/CategoryFeed"
import { DEFAULT_PAGE_SIZE } from "@/app/(protected)/(posts)/(modules)/categories/consts/pagination"
import { EDITED_UTTERANCES_CATEGORY } from "@/app/(protected)/(posts)/(modules)/categories/consts/categories"
import { SettingKey } from "@/app/(protected)/(posts)/(modules)/settings/lib/interfaces/ISettings"
import { Suspense } from "react"
import { categoriesService } from "@/app/(protected)/(posts)/(modules)/categories/lib/services/CategoriesService"
import { notFound } from "next/navigation"
import { settingsService } from "@/app/(protected)/(posts)/(modules)/settings/lib/services/SettingsService"

type PageProps = {
    searchParams?: { [key: string]: string }
}

export default async function Page(props: PageProps) {
    const page = Number(props.searchParams?.page || 1)
    const postsPerPage = await settingsService.getSettingByKey(
        SettingKey.posts_per_page
    )

    const category = await categoriesService.getCategory({
        filter: {
            path: EDITED_UTTERANCES_CATEGORY.path,
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
        <Suspense fallback={<div>Loading</div>}>
            <CategoryFeed
                category={category}
                page={page}
            />
        </Suspense>
    )
}
