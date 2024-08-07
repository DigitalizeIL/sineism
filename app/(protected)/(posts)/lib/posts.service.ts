import "server-only"

import {
    CreatePostDto,
    EditPostDto,
    GetAllPostsQuery,
    IPost,
    PostWithRating,
} from "@/app/(protected)/(posts)/lib/post.interface"
import {
    PostsDbRepository,
    postsDbRepository,
} from "@/app/(protected)/(posts)/lib/posts.repository"

export class PostsService {
    private dbRepository: PostsDbRepository

    constructor(dependencies: { dbRepository: PostsDbRepository }) {
        this.dbRepository = dependencies.dbRepository
    }

    public getAllPosts(query?: GetAllPostsQuery): Promise<PostWithRating[]> {
        return this.dbRepository.getAll(query)
    }

    public getPost(id: number): Promise<PostWithRating | null> {
        return this.dbRepository.get(id)
    }

    public createPost(post: CreatePostDto): Promise<IPost> {
        return this.dbRepository.create(post)
    }

    public updatePost(id: number, post: Partial<EditPostDto>): Promise<IPost> {
        return this.dbRepository.update(id, JSON.parse(JSON.stringify(post)))
    }

    public async deletePost(id: number): Promise<void> {
        await this.dbRepository.deleteItem(id)
    }

    public async getPaginationCursors(
        categoryId: number,
        currentCursor?: number
    ) {
        return this.dbRepository.getPaginationCursor(
            categoryId,
            currentCursor || 1
        )
    }
}

export const postsService = new PostsService({
    dbRepository: postsDbRepository,
})
