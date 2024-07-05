import {
    IPost,
    PostWithRating,
} from "@/app/(protected)/(posts)/lib/post.interface"

export interface ICategory {
    id: number
    name: string
    path: string
}

export interface ICategoryWithPosts {
    id: number
    name: string
    path: string
    posts: PostWithRating[]
}

export type CreateCategory = Omit<ICategory, "id" | "posts">
