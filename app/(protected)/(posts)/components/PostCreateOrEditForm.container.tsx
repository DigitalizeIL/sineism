import {
    CreatePostDto,
    EditPostDto,
    IPost,
} from "@/app/(protected)/(posts)/lib/post.interface"

import { PostCreateOrEditForm } from "@/app/(protected)/(posts)/components/PostCreateOrEditForm"
import { categoriesService } from "@/app/(protected)/(posts)/(modules)/categories/lib/categories.service"
import { postsService } from "@/app/(protected)/(posts)/lib/posts.service"
import { revalidatePath } from "next/cache"

export const PostCreateOrEditFormContainer = async (props: { post?: IPost }) => {
    const categories = await categoriesService.getAllCategories()

    const create = async (post: CreatePostDto) => {
        "use server"
        await postsService.createPost(post)
        revalidatePath("/posts")
    }

    const edit = async (postId: number, post: EditPostDto) => {
        "use server"
        await postsService.updatePost(postId, post)
        revalidatePath("/posts")
    }

    return (
        <PostCreateOrEditForm
            createPost={create}
            editPost={edit}
            post={props.post}
            categories={categories || []}
        />
    )
}
