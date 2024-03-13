import { FC, Suspense } from "react"

import { CategoryHeader } from "./CategoryHeader"
import { ContentFeed } from "@/app/_core/views/ContentFeed"
import { POST_PROPERTY_FOR_CURSOR } from "@/app/_core/consts/pagination.consts"
import { PaginationContainer } from "@/app/_core/components/Pagination/Pagination.container"
import { PostFeedItem } from "@/app/(protected)/(posts)/components/PostsFeed/PostFeedItem"
import { categoriesService } from "@/app/(protected)/(posts)/(modules)/categories/lib/categories.service"
import { getPaginationId } from "../lib/categories.context"
import { getPostsPerPage } from "../../../layout"
import { notFound } from "next/navigation"
import { postsService } from "../../../lib/posts.service"
import { serverContext } from "@/app/_core/lib/context"

type PageProps = {
    categorySlug: string
}

export const [getLastPostCursor, setLastPostCursor] = serverContext<number>(0)
export const [getPostIds, setPostIds] = serverContext<number[]>([])

export const CategoryPage: FC<PageProps> = async ({ categorySlug }) => {
    const pageSize = getPostsPerPage()
    const page = getPaginationId()

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
    setLastPostCursor(lastCursor)

    const ids =
        category.posts?.map((item) => item[POST_PROPERTY_FOR_CURSOR]) || []
    setPostIds(ids)

    return (
        <ContentFeed
            items={category.posts || []}
            Header={<CategoryHeader category={category} />}
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
