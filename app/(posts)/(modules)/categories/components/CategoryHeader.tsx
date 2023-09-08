import { ICategory } from "@/app/(posts)/(modules)/categories/lib/interfaces/ICategory"

type CategoryHeaderProps = { category: ICategory }

export const CategoryHeader = async ({ category }: CategoryHeaderProps) => {
    return (
        <div
            className={
                "flex align-middle w-full border-b border-stone-200 h-14"
            }>
            <h2
                className={
                    "text-2xl font-bold text-stone-900 ms-4 flex items-center"
                }>
                {category.name}
            </h2>
        </div>
    )
}
