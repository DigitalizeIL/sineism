import { FC, Suspense } from "react"

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
    paginationId: number
}

export const CategoryPage: FC<PageProps> = async ({
    categorySlug,
    paginationId,
}) => {
    const pageSize = await settingsService.getSettingValueByKey(
        SettingKey.posts_per_page,
        Number
    )

    const category = await categoriesService.getCategory({
        filter: {
            path: categorySlug,
        },
        withPosts: true,
        pagination: {
            id: paginationId,
            perPage: pageSize || DEFAULT_PAGE_SIZE,
        },
    })

    if (!category?.id) {
        return notFound()
    }

    const paginationCursorBoundery =
        await postsService.getPaginationCursorBoundery(category.id)

    return (
        <ContentFeed
            items={category.posts || []}
            Header={
                <CategoryHeader
                    paginationId={paginationId}
                    paginationCursorBoundery={paginationCursorBoundery}
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
                        cursorBoundery={paginationCursorBoundery}
                        page={paginationId}
                    />
                </Suspense>
            }
        />
    )
}
