import { IPost } from "@/app/(protected)/(posts)/lib/post.interface"

export const POST_PROPERTY_FOR_CURSOR: keyof Pick<IPost, "id" | "postNumber"> =
    "postNumber"
