import { FC, Suspense } from "react"

import { ContentFeed } from "@/app/_core/views/ContentFeed"
import { DEFAULT_PAGE_SIZE } from "../consts/pagination"
import { POST_PROPERTY_FOR_CURSOR } from "@/app/_core/consts/pagination.consts"
import { PaginationControlles } from "@/app/_core/components/Pagination/PaginationControlls"
import { PostFeedItem } from "@/app/(protected)/(posts)/(modules)/categories/components/PostFeedItem"
import { SettingKey } from "../../settings/lib/settings.interface"
import { categoriesService } from "@/app/(protected)/(posts)/(modules)/categories/lib/categories.service"
import { notFound } from "next/navigation"
import { settingsService } from "../../settings/lib/settings.service"
import { PostCreateOrEditFormContainer } from "@/app/(protected)/(posts)/components/PostCreateOrEditForm.container"
import { bookmarkService } from "../../bookmark/lib/bookmark.service"
import { CommentWithPaymentContainer } from "@/app/(protected)/(payment)/(modules)/comments/components/CommentWithPayment.container"
import { SubHeader } from "@/app/_core/components/Layout"

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

    const activeBookmark = await bookmarkService.getBookmark(
        category.id.toString()
    )

    return (
        <ContentFeed
            pageSize={pageSize}
            forcedPage={paginationId}
            Header={
                <SubHeader
                    title={category.name}
                    Pagination={
                        <Suspense>
                            <PaginationControlles />
                        </Suspense>
                    }
                    CenterItems={
                        <Suspense>
                            <CommentWithPaymentContainer />
                        </Suspense>
                    }
                />
            }
            activeBookmark={activeBookmark}
            feedItems={
                category.posts?.map((post) => ({
                    cursor: post[POST_PROPERTY_FOR_CURSOR],
                    item: post,
                    Component: (
                        <PostFeedItem
                            isItemBookmarked={
                                activeBookmark?.bookmarkedItemId === post.id
                            }
                            key={post.id}
                            post={post}
                        />
                    ),
                })) || []
            }
            Footer={
                <Suspense>
                    <PostCreateOrEditFormContainer />
                    <div className="flex flex-1 justify-end">
                        <PaginationControlles />
                    </div>
                </Suspense>
            }
        />
    )
}
