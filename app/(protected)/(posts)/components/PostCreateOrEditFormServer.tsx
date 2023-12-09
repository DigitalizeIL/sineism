import {
    CreatePostDto,
    EditPostDto,
    IPost,
} from "@/app/(protected)/(posts)/lib/interfaces/IPost"
import { PostCreateOrEditForm } from "@/app/(protected)/(posts)/components/PostCreateOrEditForm"
import { postsService } from "@/app/(protected)/(posts)/lib/services/PostsService"
import { revalidatePath } from "next/cache"
import { categoriesService } from "@/app/(protected)/(posts)/(modules)/categories/lib/services/CategoriesService"

export const PostCreateOrEditFormServer = async (props: { post?: IPost }) => {
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
