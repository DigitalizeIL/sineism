import { IRating } from "../(modules)/rating/lib/rating.interface"

export interface IPost {
    title: string
    content: string
    authorId: number
    categoryId: number
    postNumber: number
    id: number
    reviews?: IRating[]
}

export type CreatePostDto = Omit<IPost, "id" | "postNumber">
export type EditPostDto = Partial<Omit<IPost, "authorId" | "id" | "reviews">>

export type GetAllPostsQuery = {
    ids?: number[]
}

export type PostWithRating = { post: IPost; rating: number }
