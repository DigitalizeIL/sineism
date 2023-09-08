import "server-only"
import { ICategory } from "@/app/(posts)/(modules)/categories/lib/interfaces/ICategory"
import { Post } from "@/app/(posts)/lib/models/Post"

export class Category implements ICategory {
    constructor(
        public id: number,
        public name: string,
        public posts?: Post[]
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
