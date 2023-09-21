import { Button } from "@/components/Button"
import { revalidatePath } from "next/cache"
import { categoriesService } from "@/app/(protected)/(posts)/(modules)/categories/lib/services/CategoriesService"
import { FiDelete } from "react-icons/fi"

type DeleteCategoryButtonProps = {
    className?: string
    categoryId: number
}

export const DeleteCategoryButton = async (
    props: DeleteCategoryButtonProps
) => {
    async function deleteCategory() {
        "use server"
        await categoriesService.deleteCategory(props.categoryId)

        revalidatePath("/categories")
        revalidatePath("/pages")
    }

    return (
        <form
            action={deleteCategory}
            className={props.className}>
            <Button
                type={["ghost", "slim"]}
                className={"text-3xl text-black"}>
                <FiDelete />
            </Button>
        </form>
    )
}
