import "server-only"
import { Post } from "@/app/(protected)/(posts)/lib/models/Post"
import {
    postsDbRepository,
    PostsDbRepository,
} from "@/app/(protected)/(posts)/lib/repositories/PostsDbRepository"

export interface PostsService {
    getAllPosts(): Promise<Post[]>

    getPost(id: number): Promise<Post>

    createPost(post: Post): Promise<Post>

    updatePost(id: number, post: Partial<Post>): Promise<Post>

    deletePost(id: number): Promise<void>
}

export type PostsServiceDependencies = {
    dbRepository: PostsDbRepository
}

export const createPostsService = (
    dependencies: PostsServiceDependencies
): PostsService => {
    const getAllPosts = async (): Promise<Post[]> => {
        const posts = await dependencies.dbRepository.getAll()

        return posts.map((post) => Post.fromJson(post))
    }

    const getPost = async (id: number): Promise<Post> => {
        const post = await dependencies.dbRepository.get(id)

        return Post.fromJson(post)
    }

    const createPost = async (post: Post): Promise<Post> => {
        const createdPost = await dependencies.dbRepository.create(post)

        return Post.fromJson(createdPost)
    }

    const updatePost = async (id: number, post: Post): Promise<Post> => {
        const updatedPost = await dependencies.dbRepository.update(
            id,
            JSON.parse(JSON.stringify(post))
        )

        return Post.fromJson(updatedPost)
    }

    const deletePost = async (id: number): Promise<void> => {
        await dependencies.dbRepository.deleteItem(id)
    }

    return {
        getAllPosts,
        getPost,
        createPost,
        updatePost,
        deletePost,
    }
}

export const postsService = createPostsService({
    dbRepository: postsDbRepository,
})
