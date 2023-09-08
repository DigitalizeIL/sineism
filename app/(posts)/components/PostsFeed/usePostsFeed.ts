"use client"

import { useQuery } from "@tanstack/react-query"
import { getAllPosts } from "@/app/(posts)/queries/GetAllPosts"
import { Post } from "@/app/(posts)/lib/models/Post"
import { useEffect, useState } from "react"

export const usePostsFeed = (initialPosts: Post[] = []) => {
    const { error, data, isLoading } = useQuery({
        queryKey: [`posts`],
        queryFn: getAllPosts,
        initialData: initialPosts,
    })

    const [filteredPosts, setFilteredPosts] = useState<Post[]>(data)

    useEffect(() => {
        setFilteredPosts(data)
    }, [data])

    const updatePosts = (posts: Post[]) => {
        setFilteredPosts(posts)
    }

    return {
        error,
        posts: data,
        filteredPosts,
        updatePosts,
        isLoading,
    }
}
