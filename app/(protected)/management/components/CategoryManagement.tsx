import { Button } from "@/app/_core/components/Button"
import { CreateCategory } from "../../(posts)/(modules)/categories/lib/category.interface"
import { Input } from "@/app/_core/components/Form/Input"
import Link from "next/link"
import { categoriesService } from "../../(posts)/(modules)/categories/lib/categories.service"

export const CategoryManagement = async () => {
    const categories = await categoriesService.getAllCategories()

    const createCategory = async (formData: FormData) => {
        "use server"

        const newCategory: CreateCategory = {
            name: formData.get("name") as string,
            path: formData.get("path") as string,
        }

        await categoriesService.createCategory(newCategory)
    }

    return (
        <div className="flex flex-col gap-2">
            {categories.map((category) => (
                <div key={category.id}>
                    <Link
                        className="underline"
                        href={`/categories/${category.path}`}>
                        {category.name}
                    </Link>
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
                <Button>Create New Category</Button>
            </form>
        </div>
    )
}
