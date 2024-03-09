import { IPost } from "@/app/(protected)/(posts)/lib/post.interface"

export interface ICategory {
    id?: number
    name: string
    path: string
    posts?: IPost[]
}
