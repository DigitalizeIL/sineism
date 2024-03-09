import { useEffect, useState } from "react"

import { IPost } from "@/app/(protected)/(posts)/lib/post.interface"

export const usePostsSearch = (posts: IPost[]) => {
    const [searchText, setSearchText] = useState<string>("")

    const [filteredPosts, setFilteredPosts] = useState<IPost[]>(posts)

    useEffect(() => {
        if (searchText === "") return setFilteredPosts(posts)

        const newPosts = posts.filter((post) => {
            return (
                post.title.toLowerCase().includes(searchText.toLowerCase()) ||
                post.content.toLowerCase().includes(searchText.toLowerCase())
            )
        })

        setFilteredPosts(newPosts)
    }, [posts, searchText])

    const searchPosts = (searchText: string) => {
        setSearchText(searchText)
    }

    return {
        searchPosts,
        filteredPosts,
        searchText,
    }
}
