import { FC, Suspense } from "react"

import { CategoryHeader } from "./CategoryHeader"
import { ContentFeed } from "@/app/_core/views/ContentFeed"
import { POST_PROPERTY_FOR_CURSOR } from "@/app/_core/consts/pagination.consts"
import { PaginationContainer } from "@/app/_core/components/Pagination/Pagination.container"
import { PostFeedItem } from "@/app/(protected)/(posts)/components/PostsFeed/PostFeedItem"
import { categoriesService } from "@/app/(protected)/(posts)/(modules)/categories/lib/categories.service"
import { getPaginationId } from "../(pages)/[category-slug]/page"
import { getPostsPerPage } from "../../../layout"
import { notFound } from "next/navigation"

type PageProps = {
    categorySlug: string
}

export const CategoryPage: FC<PageProps> = async ({ categorySlug }) => {
    const category = await categoriesService.getCategory({
        filter: {
            path: categorySlug,
        },
        withPosts: true,
        pagination: {
            id: getPaginationId(),
            perPage: getPostsPerPage(),
        },
    })

    if (!category) {
        return notFound()
    }

    return (
        <ContentFeed
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
