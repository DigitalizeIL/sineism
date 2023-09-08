import { Button } from "@/components/Button"
import { Input } from "@/components/Form/Input/Input"
import { TextArea } from "@/components/Form/TextArea"
import { IPost } from "@/app/(posts)/lib/interfaces/IPost"
import { postsService } from "@/app/(posts)/lib/services/PostsService"
import { revalidatePath } from "next/cache"
import { ICategory } from "@/app/(posts)/(modules)/categories/lib/interfaces/ICategory"
import { categoriesService } from "@/app/(posts)/(modules)/categories/lib/services/CategoriesService"
import { Select } from "@/components/Form/Select"
import { getServerSession } from "next-auth"
import { usersService } from "@/app/(authentication)/lib/services/UsersService"
import { Post } from "@/app/(posts)/lib/models/Post"

export const PostCreateOrEditForm = async (props: { post?: IPost }) => {
    const categories = await categoriesService.getAllCategories()

    const createPost = async (postData: Omit<IPost, "authorId" | "id">) => {
        "use server"
        const session = await getServerSession()
        const user = await usersService.getUserByEmail(
            session?.user?.email || ""
        )
        if (!user) return console.log("NO USER")

        await postsService.createPost(
            Post.fromJson({
                ...postData,
                authorId: user.id,
            })
        )
    }

    const editPost = async (postData: Omit<IPost, "authorId">) => {
        "use server"
        await postsService.updatePost(postData.id, postData)
    }

    const confirm = async (formData: FormData) => {
        "use server"
        const postData: Omit<IPost, "authorId" | "id"> = {
            title: formData.get("title") as string,
            content: formData.get("content") as string,
            categoryId: Number(formData.get("category") as string),
        }

        if (props.post?.id) {
            await editPost({
                ...postData,
                id: props.post?.id,
            })
        } else {
            await createPost(postData)
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
