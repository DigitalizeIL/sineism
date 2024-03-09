import "server-only"

import {
    CreatePostDto,
    EditPostDto,
    GetAllPostsQuery,
    IPost,
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

    public getAllPosts(query?: GetAllPostsQuery): Promise<IPost[]> {
        return this.dbRepository.getAll(query)
    }

    public getPost(id: number): Promise<IPost | null> {
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
}

export const postsService = new PostsService({
    dbRepository: postsDbRepository,
})
