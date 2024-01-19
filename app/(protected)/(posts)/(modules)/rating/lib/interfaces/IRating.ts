export interface IRating {
    id: number
    rating: number | null
    userId: number
    postId: number | null
    commentId: number | null
}

export type IRatingCreate = Omit<IRating, "id">
