import { FC, Suspense } from "react"

import { CommentWithPaymentContainer } from "@/app/(protected)/(payment)/(modules)/comments/components/CommentWithPayment.container"
import { PostFeedItem } from "@/app/(protected)/(posts)/(modules)/categories/components/PostFeedItem"
import { categoriesService } from "@/app/(protected)/(posts)/(modules)/categories/lib/categories.service"
import { SubHeader } from "@/app/_core/components/Layout"
import { PaginationControlles } from "@/app/_core/components/Pagination/PaginationControlls"
import { POST_PROPERTY_FOR_CURSOR } from "@/app/_core/consts/pagination.consts"
import { ContentFeed } from "@/app/_core/views/ContentFeed"
import { notFound } from "next/navigation"
import { PostCreateOrEditForm } from "../../../components/PostCreateOrEditForm"
import { bookmarkService } from "../../bookmark/lib/bookmark.service"

type PageProps = {
    categorySlug: string
    paginationId: number
}

export const CategoryPage: FC<PageProps> = async ({
    categorySlug,
    paginationId,
}) => {
    const categories = await categoriesService.getAllCategories()
    const category = await categoriesService.getCategoryWithPosts({
        filter: {
            path: categorySlug,
        },
    })

    if (!category?.id) {
        return notFound()
    }

    const activeBookmark = await bookmarkService.getBookmark(
        category.id.toString()
    )

    return (
        <ContentFeed
            forcedPage={paginationId}
            categories={categories}
            Header={
                <SubHeader
                    title={category.name}
                    CenterItems={
                        <Suspense>
                            <CommentWithPaymentContainer />
                        </Suspense>
                    }
                />
            }
            activeBookmark={activeBookmark}
            feedItems={
                category.posts?.map(({ post, rating }) => ({
                    cursor: post[POST_PROPERTY_FOR_CURSOR],
                    item: post,
                    Component: (
                        <PostFeedItem
                            isItemBookmarked={
                                activeBookmark?.bookmarkedItemId === post.id
                            }
                            rating={rating}
                            key={post.id}
                            post={post}
                        />
                    ),
                })) || []
            }
            Footer={
                <Suspense>
                    <PostCreateOrEditForm />
                    <div className="flex flex-1 justify-end">
                        <PaginationControlles />
                    </div>
                </Suspense>
            }
        />
    )
}
