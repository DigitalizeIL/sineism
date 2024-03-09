export interface IRating {
    id: number
    rating: number | null
    userId: number
    postId: number | null
    commentId: number | null
}

export type IRatingCreate = Omit<IRating, "id">

export type GetRatingFilter = {} & {
    id?: number
    postId?: number
    userId?: number
    commentId?: number
}

export type GetAllRatingsFilter = {
    postId?: number
    commentId?: number
}
