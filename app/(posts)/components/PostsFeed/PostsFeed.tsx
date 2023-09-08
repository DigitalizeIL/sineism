import React from "react"
import { Post } from "@/app/(posts)/lib/models/Post"
import { PostFeedItem } from "@/app/(posts)/components/PostsFeed/PostFeedItem"
import { postsService } from "@/app/(posts)/lib/services/PostsService"

export const PostsFeed = async () => {
    const posts = await postsService.getAllPosts()

    return (
        <div className="w-full flex flex-col gap-4 justify-center items-center">
            {posts.map((post: Post) => (
                <PostFeedItem
                    key={post.id}
                    post={post.toJson()}
                />
            ))}
        </div>
    )
}
