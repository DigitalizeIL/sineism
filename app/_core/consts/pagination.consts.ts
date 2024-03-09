import { IPost } from "@/app/(protected)/(posts)/lib/post.interface"

export const POST_PROPERTY_FOR_CURSOR: keyof Pick<IPost, "id" | "postNumber"> =
    "id"

export const PAGINATION_URL_PARAM_KEY = "id"
