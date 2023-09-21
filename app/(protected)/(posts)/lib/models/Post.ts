import "server-only"
import { IPost } from "@/app/(protected)/(posts)/lib/interfaces/IPost"

export class Post implements IPost {
    constructor(
        public title: string,
        public content: string,
        public authorId: number,
        public categoryId: number,
        public id: number
    ) {}

    public static fromJson(json: any): Post {
        const { title, content, authorId, id, categoryId } = json
        return new Post(title, content, authorId, categoryId, id)
    }

    public toJson(): any {
        return {
            title: this.title,
            content: this.content,
            authorId: this.authorId,
            categoryId: this.categoryId,
            id: this.id,
        }
    }
}
