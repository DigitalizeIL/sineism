import { Button } from "@/components/Button"
import { ICategory } from "@/app/(protected)/(posts)/(modules)/categories/lib/category.interface"
import { IPost } from "@/app/(protected)/(posts)/lib/post.interface"
import { categoriesService } from "@/app/(protected)/(posts)/(modules)/categories/lib/categories.service"
import clsx from "clsx"
import { postsService } from "@/app/(protected)/(posts)/lib/posts.service"
import { revalidatePath } from "next/cache"

type CreateCategoryButtonProps = {
    post: IPost
    className?: string
}

export const AssignPostToCategoryForm = async (
    props: CreateCategoryButtonProps
) => {
    const categories = await categoriesService.getAllCategories()

    async function assignCategory(formData: FormData) {
        "use server"
        const category = Number(formData.get("category") as string)

        if (!category) {
            // TODO: show error
            console.log("no category", category)
            return
        }

        await postsService.updatePost(props.post.id, {
            categoryId: category,
        })

        revalidatePath("/posts")
    }

    return (
        <form
            action={assignCategory}
            className={clsx(["flex flex-col space-y-2", props.className])}>
            <select
                name="category"
                className="w-full">
                {categories.map((category: ICategory) => (
                    <option key={category.id}>{category.name}</option>
                ))}
            </select>
            <Button
                type="ghost"
                className={"text-3xl text-black"}>
                Assign Category
            </Button>
        </form>
    )
}
