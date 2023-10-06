"use client"

import Styles from "./PostsSearch.module.css"
import { Post } from "@/app/(protected)/(posts)/lib/models/Post"
import { TEXTS } from "@/app/(protected)/(posts)/components/PostsSearch/texts"
import { usePostsSearch } from "@/app/(protected)/(posts)/components/PostsSearch/usePostsSearch"
import React, { ReactNode, useEffect } from "react"

export const PostsSearch = (props: {
    posts: Post[]
    onPostsFilter?: (posts: Post[]) => void
    render?: (posts: Post[]) => ReactNode | ReactNode[]
}) => {
    const { filteredPosts, searchPosts, searchText } = usePostsSearch(
        props.posts
    )

    useEffect(() => {
        props?.onPostsFilter?.(filteredPosts)
    }, [filteredPosts, props])

    return (
        <>
            <input
                placeholder={TEXTS.SEARCH_PLACEHOLDER}
                className={Styles.searchInput}
                type="text"
                value={searchText}
                onChange={(e) => searchPosts(e.target.value)}
            />
            {filteredPosts.length > 0 ? (
                props?.render?.(filteredPosts)
            ) : (
                <span>{TEXTS.NOT_ITEMS_FOUND}</span>
            )}
        </>
    )
}
