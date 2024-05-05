import { FC, Suspense } from "react"

import { CategoryHeader } from "./CategoryHeader"
import { ContentFeed } from "@/app/_core/views/ContentFeed"
import { DEFAULT_PAGE_SIZE } from "../consts/pagination"
import { POST_PROPERTY_FOR_CURSOR } from "@/app/_core/consts/pagination.consts"
import { PaginationControlles } from "@/app/_core/components/Pagination/PaginationControlls"
import { PostFeedItem } from "@/app/(protected)/(posts)/components/PostsFeed/PostFeedItem"
import { SettingKey } from "../../settings/lib/settings.interface"
import { categoriesService } from "@/app/(protected)/(posts)/(modules)/categories/lib/categories.service"
import { notFound } from "next/navigation"
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
        Number,
        DEFAULT_PAGE_SIZE
    )

    const category = await categoriesService.getCategory({
        filter: {
            path: categorySlug,
        },
        withPosts: true,
    })

    if (!category?.id) {
        return notFound()
    }

    return (
        <ContentFeed
            pageSize={pageSize}
            forcedPage={paginationId}
            Header={<CategoryHeader category={category} />}
            feedItems={
                category.posts?.map((post) => ({
                    cursor: post[POST_PROPERTY_FOR_CURSOR],
                    item: post,
                    Component: (
                        <PostFeedItem
                            key={post.id}
                            post={post}
                        />
                    ),
                })) || []
            }
            Footer={
                <Suspense>
                    <div className="w-3/12 flex justify-end">
                        <PaginationControlles />
                    </div>
                </Suspense>
            }
        />
    )
}
