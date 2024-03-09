import { IPost } from "@/app/(protected)/(posts)/lib/post.interface"
import { PostFeedItem } from "@/app/(protected)/(posts)/components/PostsFeed/PostFeedItem"
import React from "react"
import { postsService } from "@/app/(protected)/(posts)/lib/posts.service"

export const PostsFeed = async () => {
    const posts = await postsService.getAllPosts()

    return (
        <div className="w-full flex flex-col gap-4 justify-center items-center">
            {posts.map((post: IPost) => (
                <PostFeedItem
                    key={post.id}
                    post={post}
                />
            ))}
        </div>
    )
}
