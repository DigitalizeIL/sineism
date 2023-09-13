import { categoriesService } from "@/app/(posts)/(modules)/categories/lib/services/CategoriesService"
import { redirect } from "next/navigation"

export default async function CategoriesPage() {
    const categories = await categoriesService.getAllCategories()

    if (!categories.length)
        return (
            <div className={"flex justify-center items-center h-screen"}>
                No Categories
            </div>
        )

    const navigateToCategory = async () => {
        "use server"
        redirect(`/categories/${categories[0].id}`)
    }
    // redirect(`/categories/${categories[0].id}`)

    return (
        <div className={"flex justify-center items-center h-screen"}>
            {categories.map((category) => (
                <div
                    key={category.id}
                    className={"flex justify-center items-center"}>
                    <form action={navigateToCategory}>
                        <button
                            className={
                                "w-64 h-64 bg-primary rounded-xl shadow-lg m-4 flex justify-center items-center cursor-pointer" +
                                "hover:bg-primary-600 hover:shadow-xl"
                            }>
                            {category.name}
                        </button>
                    </form>
                </div>
            ))}
        </div>
    )
}
