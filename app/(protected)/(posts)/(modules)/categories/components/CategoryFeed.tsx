import { CategoryHeader } from "@/app/(protected)/(posts)/(modules)/categories/components/CategoryHeader"
import { ICategory } from "@/app/(protected)/(posts)/(modules)/categories/lib/interfaces/ICategory"
import { PostFeedItem } from "@/app/(protected)/(posts)/components/PostsFeed/PostFeedItem"
import { PostFeedItemSkelleton } from "../../../components/PostsFeed/PostFeedItemSkeleton"
import { Suspense } from "react"

type CategoryFeedProps = {
    category: ICategory
    page: number
}

export function CategoryFeed({ category, page }: CategoryFeedProps) {
    return (
        <>
            <Suspense>
                <CategoryHeader
                    category={category}
                    page={page}
                />
            </Suspense>
            <div className={"flex flex-col justify-center items-center w-full"}>
                {category.posts?.map((post) => (
                    <PostFeedItem
                        key={post.id}
                        page={page}
                        post={post}
                    />
                ))}
            </div>
        </>
    )
}
