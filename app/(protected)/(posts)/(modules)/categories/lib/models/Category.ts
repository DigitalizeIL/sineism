import "server-only"
import { ICategory } from "@/app/(protected)/(posts)/(modules)/categories/lib/interfaces/ICategory"
import { IPost } from "@/app/(protected)/(posts)/lib/interfaces/IPost"

export class Category implements ICategory {
    constructor(
        public id: number,
        public name: string,
        public posts?: IPost[]
    ) {}

    public static fromJson(json: ICategory): Category {
        const { id, name, posts } = json
        if (!id) throw new Error("Comment must have an id")
        return new Category(id, name, posts)
    }

    public toJson(): any {
        return {
            id: this.id,
            name: this.name,
            posts: this.posts,
        }
    }
}
