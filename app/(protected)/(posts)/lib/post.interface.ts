export interface IPost {
    title: string
    content: string
    authorId: number
    categoryId: number
    postNumber: number
    id: number
}

export type CreatePostDto = Omit<IPost, "id" | "postNumber">
export type EditPostDto = Partial<Omit<IPost, "authorId" | "id">>

export type GetAllPostsQuery = {
    ids?: number[]
}
