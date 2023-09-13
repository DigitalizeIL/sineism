import { ICategory } from "@/app/(posts)/(modules)/categories/lib/interfaces/ICategory"
import { MoveToBookmarkButton } from "@/app/(posts)/(modules)/bookmark/components/MoveToBookmarkButton"
import { PaginationControls } from "@/components/PaginationControls"
import { redirect } from "next/navigation"
import { categoriesService } from "@/app/(posts)/(modules)/categories/lib/services/CategoriesService"
import { DEFAULT_PAGE_SIZE } from "@/app/(posts)/(modules)/categories/consts/pagination"

type CategoryHeaderProps = { category: ICategory; page: number }

export const CategoryHeader = async ({
    category,
    page,
}: CategoryHeaderProps) => {
    const categoriesCount = await categoriesService.countCategoryPosts(
        category.id!
    )

    const nextPage = async () => {
        "use server"

        redirect(`/categories/${category.id}?page=${page + 1}`)
    }
    const prevPage = async () => {
        "use server"

        redirect(`/categories/${category.id}?page=${page - 1}`)
    }

    return (
        <div
            className={
                "flex align-middle justify-between w-full border-b border-stone-200 h-14"
            }>
            <div className={"flex items-center"}>
                <h2
                    className={
                        "text-2xl font-bold text-stone-900 ms-4 flex items-center"
                    }>
                    {category.name}
                </h2>

                {category.id ? (
                    <MoveToBookmarkButton categoryId={category.id} />
                ) : null}
            </div>
            <div className={"flex items-center justify-end"}>
                <PaginationControls
                    shouldHidePageNumber={true}
                    totalPages={Math.ceil(categoriesCount / DEFAULT_PAGE_SIZE)}
                    page={page}
                    nextPage={nextPage}
                    prevPage={prevPage}
                />
            </div>
        </div>
    )
}
