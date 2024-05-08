import {
    CreatePostDto,
    EditPostDto,
    IPost,
} from "@/app/(protected)/(posts)/lib/post.interface"

import { POST_PROPERTY_FOR_CURSOR } from "@/app/_core/consts/pagination.consts"
import { PostCreateOrEditForm } from "@/app/(protected)/(posts)/components/PostCreateOrEditForm"
import { categoriesService } from "@/app/(protected)/(posts)/(modules)/categories/lib/categories.service"
import { postsService } from "@/app/(protected)/(posts)/lib/posts.service"
import { revalidatePath } from "next/cache"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"
import { UserRole } from "@/app/(authentication)/lib/types/userRole.types"

export const PostCreateOrEditFormContainer = async (props: {
    post?: IPost
}) => {
    const session = await getAppServerSession()

    if (session?.user?.role !== UserRole.admin) {
        return null;
    }

    const categories = await categoriesService.getAllCategories()

    const create = async (post: CreatePostDto) => {
        "use server"
        const newPost = await postsService.createPost(post)
        revalidatePath(`/posts?page=${newPost[POST_PROPERTY_FOR_CURSOR]}`)
        return newPost
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
