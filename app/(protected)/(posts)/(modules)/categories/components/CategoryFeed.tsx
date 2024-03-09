import { CategoryHeader } from "@/app/(protected)/(posts)/(modules)/categories/components/CategoryHeader"
import { ICategory } from "@/app/(protected)/(posts)/(modules)/categories/lib/category.interface"
import { PaginationContainer } from "@/app/_core/components/Pagination/Pagination.container"
import { PostFeedItem } from "@/app/(protected)/(posts)/components/PostsFeed/PostFeedItem"
import { Suspense } from "react"
import { categoriesService } from "../lib/categories.service"

type CategoryFeedProps = {
    category: ICategory
    page: number
}

export function CategoryFeed({ category, page }: CategoryFeedProps) {
    return (
        <div className="flex flex-col h-full">
            <CategoryHeader
                category={category}
                page={page}
            />
            <div
                className={
                    "flex flex-col flex-1 justify-start items-center w-full"
                }>
                {category.posts?.map((post) => (
                    <PostFeedItem
                        key={post.id}
                        page={page}
                        post={post}
                    />
                ))}
            </div>
            <div className="mt-auto">
                <div className="-mt-28">
                    <Suspense>
                        <PaginationContainer
                            page={page}
                            countFunction={() =>
                                category.id
                                    ? categoriesService.countCategoryPosts(
                                          category.id
                                      )
                                    : Promise.resolve(0)
                            }
                        />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}
