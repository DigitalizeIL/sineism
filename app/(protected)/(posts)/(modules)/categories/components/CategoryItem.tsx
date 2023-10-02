import { ICategory } from "@/app/(protected)/(posts)/(modules)/categories/lib/interfaces/ICategory"
import { DeleteCategoryButton } from "@/app/(protected)/(posts)/(modules)/categories/components/DeleteCategoryButton"

type CategoryItemProps = {
    category: ICategory
}

export const CategoryItem = (props: CategoryItemProps) => {
    if (!props.category.id) return null

    return (
        <div
            dir={"ltr"}
            className={"flex gap-1"}>
            <span>
                {props.category.name} ({props.category.id})
            </span>
            <DeleteCategoryButton
                className={"flex justify-center align-middle"}
                categoryId={props.category.id}
            />
        </div>
    )
}