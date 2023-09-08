import "server-only"
import { IComment } from "@/app/(posts)/(modules)/comments/lib/interfaces/IComment"

export class Comment implements IComment {
    constructor(
        public content: string,
        public postId: number,
        public userId: number,
        public id: number
    ) {}

    public static fromJson(json: IComment): Comment {
        const { content, postId, userId, id } = json
        if (!id) throw new Error("Comment must have an id")
        return new Comment(content, postId, userId, id)
    }

    public toJson(): any {
        return {
            content: this.content,
            postId: this.postId,
            authorId: this.userId,
            id: this.id,
        }
    }
}
