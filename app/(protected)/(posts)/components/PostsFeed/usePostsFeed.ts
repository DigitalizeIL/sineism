"use client"

import { useQuery } from "@tanstack/react-query"
import { getAllPosts } from "@/app/(protected)/(posts)/queries/GetAllPosts"
import { useEffect, useState } from "react"
import { IPost } from "@/app/(protected)/(posts)/lib/interfaces/IPost"

export const usePostsFeed = (initialPosts: IPost[] = []) => {
    const { error, data, isLoading } = useQuery({
        queryKey: [`posts`],
        queryFn: getAllPosts,
        initialData: initialPosts,
    })

    const [filteredPosts, setFilteredPosts] = useState<IPost[]>(data)

    useEffect(() => {
        setFilteredPosts(data)
    }, [data])

    const updatePosts = (posts: IPost[]) => {
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
