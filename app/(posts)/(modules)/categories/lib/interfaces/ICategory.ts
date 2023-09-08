import { Post } from "@/app/(posts)/lib/models/Post"

export interface ICategory {
    id?: number
    name: string
    posts?: Post[]
}
