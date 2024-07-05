import { IRating } from "../../rating/lib/rating.interface"

export interface IComment {
    id: number
    content: string
    postIds: number[]
    userId: number
    commentNumber: number
    reviews?: IRating[]
}

export type CommentWithRating = {
    comment: IComment
    rating: number
}

export type CreateComment = Omit<
    IComment,
    "id" | "commentNumber" | "reviews"
> & {
    commentNumber?: number
}
