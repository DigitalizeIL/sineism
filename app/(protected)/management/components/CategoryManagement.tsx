import { Button } from "@/app/_core/components/Button"
import {
    CreateCategory,
    ICategory,
} from "../../(posts)/(modules)/categories/lib/category.interface"
import { Input } from "@/app/_core/components/Form/Input"
import Link from "next/link"
import { MANAGEMENT_PATH } from "@/app/_core/components/Layout/Header/consts"
import { ModalWithButton } from "@/app/_core/components/Modal"
import { categoriesService } from "../../(posts)/(modules)/categories/lib/categories.service"
import { revalidatePath } from "next/cache"
import { EditCategory } from "./EditCategory"

export const CategoryManagement = async () => {
    const categories = await categoriesService.getAllCategories()

    const createCategory = async (formData: FormData) => {
        "use server"

        const newCategory: CreateCategory = {
            name: formData.get("name") as string,
            path: formData.get("path") as string,
        }

        await categoriesService.createCategory(newCategory)

        revalidatePath(MANAGEMENT_PATH)
    }

    const editCategory = async (formData: FormData) => {
        "use server"

        const category: ICategory = {
            id: Number(formData.get("categoryId") as string),
            name: formData.get("name") as string,
            path: formData.get("path") as string,
        }

        await categoriesService.updateCategory(category.id, category)
    }

    const deleteCategory = async (formData: FormData) => {
        "use server"

        const categoryId = formData.get("categoryId") as string
        await categoriesService.deleteCategory(Number(categoryId))

        revalidatePath(MANAGEMENT_PATH)
    }

    return (
        <div className="flex flex-col gap-2">
            {categories.map((category) => (
                <div
                    key={category.id}
                    className="flex justify-between">
                    <Link
                        className="underline"
                        href={`/categories/${category.path}`}>
                        {category.name}
                    </Link>
                    <div className="flex flex-row">
                        <ModalWithButton buttonText="Edit">
                            <EditCategory
                                category={category}
                                editCategory={editCategory}
                            />
                        </ModalWithButton>
                        <ModalWithButton buttonText="Delete">
                            <div
                                dir="ltr"
                                className="flex flex-col items-center">
                                <h3 className="text-xl">Are you sure?</h3>
                                <h4>
                                    This will delete all posts and comments
                                    under this category
                                </h4>
                                <form
                                    action={deleteCategory}
                                    className="mt-4">
                                    <input
                                        type="hidden"
                                        name="categoryId"
                                        value={category.id}
                                    />
                                    <Button type={"danger"}>I am sure</Button>
                                </form>
                            </div>
                        </ModalWithButton>
                    </div>
                </div>
            ))}
            <form
                action={createCategory}
                className="flex flex-row gap-2 mt-4">
                <Input
                    name="name"
                    placeholder="Category name"
                />
                <Input
                    ltr
                    name="path"
                    placeholder="Category Slug"
                />
                <Button type="primary">Create New Category</Button>
            </form>
        </div>
    )
}
