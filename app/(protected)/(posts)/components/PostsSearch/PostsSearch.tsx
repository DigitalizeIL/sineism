"use client"

import React, { ReactNode, useEffect } from "react"

import { IPost } from "@/app/(protected)/(posts)/lib/post.interface"
import Styles from "./PostsSearch.module.css"
import { TEXTS } from "@/app/(protected)/(posts)/components/PostsSearch/texts"
import { usePostsSearch } from "@/app/(protected)/(posts)/components/PostsSearch/usePostsSearch"

export const PostsSearch = (props: {
    posts: IPost[]
    onPostsFilter?: (posts: IPost[]) => void
    render?: (posts: IPost[]) => ReactNode | ReactNode[]
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
