import { IComment } from "@/app/(protected)/(posts)/(modules)/comments/lib/comment.interface"
import { IPost } from "@/app/(protected)/(posts)/lib/post.interface"

export const COMMENTS_PROPERTY_FOR_CURSOR: keyof Pick<IComment, "id"> = "id"
export const POST_PROPERTY_FOR_CURSOR: keyof Pick<IPost, "id" | "postNumber"> =
    "postNumber"

export const PAGINATION_URL_PARAM_KEY = "id"
