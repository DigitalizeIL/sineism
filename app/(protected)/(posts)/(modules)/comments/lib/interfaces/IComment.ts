export interface IComment {
    id: number
    content: string
    postId: number
    userId: number
    commentNumber: number
}

export type CreateComment = Omit<IComment, "id" | "commentNumber"> & {
    commentNumber?: number
}
