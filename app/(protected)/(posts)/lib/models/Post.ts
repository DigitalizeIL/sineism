import "server-only"
import { IPost } from "@/app/(protected)/(posts)/lib/interfaces/IPost"

export class Post implements IPost {
    constructor(
        public title: string,
        public content: string,
        public authorId: number,
        public categoryId: number,
        public postNumber: number,
        public id: number
    ) {}

    public static fromJson(json: any): Post {
        const { title, content, authorId, id, postNumber, categoryId } = json
        return new Post(title, content, authorId, categoryId, postNumber, id)
    }

    public toJson(): any {
        return {
            title: this.title,
            content: this.content,
            authorId: this.authorId,
            categoryId: this.categoryId,
            postNumber: this.postNumber,
            id: this.id,
        }
    }
}
