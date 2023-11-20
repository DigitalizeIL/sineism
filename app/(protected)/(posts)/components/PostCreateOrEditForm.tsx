import { Button } from "@/components/Button"
import { Input } from "@/components/Form/Input/Input"
import { TextArea } from "@/components/Form/TextArea"
import {
    EditPostDto,
    IPost,
} from "@/app/(protected)/(posts)/lib/interfaces/IPost"
import { postsService } from "@/app/(protected)/(posts)/lib/services/PostsService"
import { revalidatePath } from "next/cache"
import { ICategory } from "@/app/(protected)/(posts)/(modules)/categories/lib/interfaces/ICategory"
import { categoriesService } from "@/app/(protected)/(posts)/(modules)/categories/lib/services/CategoriesService"
import { Select } from "@/components/Form/Select"
import { Post } from "@/app/(protected)/(posts)/lib/models/Post"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"

export const PostCreateOrEditForm = async (props: { post?: IPost }) => {
    const categories = await categoriesService.getAllCategories()
    const session = await getAppServerSession()

    const editPost = async (postData: Omit<IPost, "authorId">) => {
        "use server"
    }

    const confirm = async (formData: FormData) => {
        "use server"
        const postData: EditPostDto = {
            title: formData.get("title") as string,
            content: formData.get("content") as string,
            categoryId: Number(formData.get("category") as string),
        }

        if (props.post?.id) {
            await postsService.updatePost(props.post?.id, postData)
        } else {
            await postsService.createPost(
                Post.fromJson({
                    ...postData,
                    authorId: session?.user?.id,
                })
            )
        }

        revalidatePath("/posts")
    }

    return (
        <form action={confirm}>
            <div className="flex flex-col space-y-2 p-3">
                <Input
                    placeholder={"Title"}
                    defaultValue={props.post?.title}
                    type="text"
                    name={"title"}
                />
                <TextArea
                    placeholder={"Content"}
                    defaultValue={props.post?.content}
                    name={"content"}
                    rows={5}
                />
                <Select
                    name={"category"}
                    options={categories.map((category: ICategory) => ({
                        label: category.name,
                        value: category.id,
                    }))}
                />
                <hr />
                <Button
                    type="ghost"
                    className={"text-3xl text-black"}>
                    {props.post?.id ? "Edit" : "Create"}
                </Button>
            </div>
        </form>
    )
}
