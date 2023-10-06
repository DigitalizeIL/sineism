import { IPost } from "@/app/(protected)/(posts)/lib/interfaces/IPost"

export interface ICategory {
    id?: number
    name: string
    posts?: IPost[]
}
