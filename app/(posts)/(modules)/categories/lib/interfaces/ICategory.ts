import { IPost } from "@/app/(posts)/lib/interfaces/IPost"

export interface ICategory {
    id?: number
    name: string
    posts?: IPost[]
}
