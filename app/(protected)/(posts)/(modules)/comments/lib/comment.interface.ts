import { IUser } from "@/app/(authentication)/lib/user.interface"
import { IPost } from "../../../lib/post.interface"
import { IRating } from "../../rating/lib/rating.interface"

export interface IComment {
    id: number
    content: string
    postIds: number[]
    userId: number
    commentNumber: number
}

export type PopulatedComment = IComment & {
    reviews: IRating[]
    posts: IPost[]
    user: IUser
}

export type CommentWithRating = {
    comment: PopulatedComment
    rating: number
}

export type CreateComment = Omit<
    IComment,
    "id" | "commentNumber" | "reviews"
> & {
    commentNumber?: number
}
