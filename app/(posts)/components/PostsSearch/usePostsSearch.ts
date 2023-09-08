import { useEffect, useState } from "react"
import { Post } from "@/app/(posts)/lib/models/Post"

export const usePostsSearch = (posts: Post[]) => {
    const [searchText, setSearchText] = useState<string>("")

    const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts)

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
