export interface IRating {
    id: number
    rating: number
    postId?: number
    commentId?: number
}

export type IRatingCreate = Omit<IRating, "id">
