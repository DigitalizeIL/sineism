"use client"

import { PostFeedItem } from "@/app/(protected)/(posts)/components/PostsFeed/PostFeedItem"
import { CategoryHeader } from "@/app/(protected)/(posts)/(modules)/categories/components/CategoryHeader"
import { ICategory } from "@/app/(protected)/(posts)/(modules)/categories/lib/interfaces/ICategory"

type CategoryFeedProps = {
    category: ICategory
    page: number
}

export function CategoryFeed({ category, page }: CategoryFeedProps) {
    return (
        <>
            <CategoryHeader
                category={category}
                page={page}
            />
            <div className={"flex flex-col justify-center items-center w-full"}>
                {category.posts?.map((post) => (
                    <PostFeedItem
                        page={page}
                        post={post}
                        key={post.id}
                    />
                ))}
            </div>
        </>
    )
}
