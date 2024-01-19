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
