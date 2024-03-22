import { FC, Suspense } from "react"
import {
    REQUEST_CONTEXT_KEYS,
    getRequestContext,
} from "@/app/_core/lib/context"

import { CategoryHeader } from "./CategoryHeader"
import { ContentFeed } from "@/app/_core/views/ContentFeed"
import { DEFAULT_PAGE_SIZE } from "../consts/pagination"
import { PaginationContainer } from "@/app/_core/components/Pagination/Pagination.container"
import { PostFeedItem } from "@/app/(protected)/(posts)/components/PostsFeed/PostFeedItem"
import { SettingKey } from "../../settings/lib/settings.interface"
import { categoriesService } from "@/app/(protected)/(posts)/(modules)/categories/lib/categories.service"
import { notFound } from "next/navigation"
import { postsService } from "../../../lib/posts.service"
import { settingsService } from "../../settings/lib/settings.service"

type PageProps = {
    categorySlug: string
}

export const CategoryPage: FC<PageProps> = async ({ categorySlug }) => {
    const pageSizeValue = await settingsService.getSettingByKey(
        SettingKey.posts_per_page
    )
    const pageSize = Number(pageSizeValue?.value || DEFAULT_PAGE_SIZE)

    const page = getRequestContext<number>(REQUEST_CONTEXT_KEYS.paginationId)

    const category = await categoriesService.getCategory({
        filter: {
            path: categorySlug,
        },
        withPosts: true,
        pagination: {
            id: page,
            perPage: pageSize,
        },
    })

    if (!category?.id) {
        return notFound()
    }

    const lastCursor = await postsService.getLastPaginationCursor(category.id)

    return (
        <ContentFeed
            items={category.posts || []}
            Header={
                <CategoryHeader
                    lastCursor={lastCursor}
                    category={category}
                />
            }
            FeedItems={category.posts?.map((post) => (
                <PostFeedItem
                    key={post.id}
                    post={post}
                />
            ))}
            Footer={
                <Suspense>
                    <PaginationContainer
                        lastCursor={lastCursor}
                        page={page}
                    />
                </Suspense>
            }
        />
    )
}
