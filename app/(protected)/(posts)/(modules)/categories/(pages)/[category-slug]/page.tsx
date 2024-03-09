import {
    PAGINATION_URL_PARAM_KEY,
    POST_PROPERTY_FOR_CURSOR,
} from "@/app/_core/consts/pagination.consts"

import { CategoryHeader } from "../../components/CategoryHeader"
import { ContentFeed } from "@/app/_core/views/ContentFeed"
import { DEFAULT_PAGE_SIZE } from "@/app/(protected)/(posts)/(modules)/categories/consts/pagination"
import { PaginationContainer } from "@/app/_core/components/Pagination/Pagination.container"
import { PostFeedItem } from "@/app/(protected)/(posts)/components/PostsFeed/PostFeedItem"
import { SettingKey } from "@/app/(protected)/(posts)/(modules)/settings/lib/settings.interface"
import { Suspense } from "react"
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
    let paginationId = Number(props.searchParams?.[PAGINATION_URL_PARAM_KEY])
    if (isNaN(paginationId)) paginationId = 1

    const itemsPerPageValue = await settingsService.getSettingByKey(
        SettingKey.posts_per_page
    )
    const itemsPerPage = itemsPerPageValue?.value
        ? Number(itemsPerPageValue?.value)
        : DEFAULT_PAGE_SIZE

    const category = await categoriesService.getCategory({
        filter: {
            path: props.params["category-slug"],
        },
        withPosts: true,
        pagination: {
            id: paginationId,
            perPage: itemsPerPage,
        },
    })

    if (!category) {
        return notFound()
    }

    return (
        <ContentFeed
            Header={
                <CategoryHeader
                    category={category}
                    page={paginationId}
                />
            }
            FeedItems={category.posts?.map((post) => (
                <PostFeedItem
                    key={post.id}
                    page={paginationId}
                    post={post}
                />
            ))}
            Footer={
                <Suspense>
                    <PaginationContainer
                        page={paginationId}
                        ids={
                            category.posts?.map(
                                (item) => item[POST_PROPERTY_FOR_CURSOR]
                            ) || []
                        }
                    />
                </Suspense>
            }
        />
    )
}
