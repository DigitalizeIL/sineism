import { ICategory } from "@/app/(protected)/(posts)/(modules)/categories/lib/interfaces/ICategory"
import { MoveToBookmarkButton } from "@/app/(protected)/(posts)/(modules)/bookmark/components/MoveToBookmarkButton"
import { PaginationControls } from "@/components/PaginationControls"
import { redirect } from "next/navigation"
import { categoriesService } from "@/app/(protected)/(posts)/(modules)/categories/lib/services/CategoriesService"
import { DEFAULT_PAGE_SIZE } from "@/app/(protected)/(posts)/(modules)/categories/consts/pagination"
import { CommentWithPaymentContainer } from "@/app/(protected)/(payment)/(modules)/comments/components/CommentWithPaymentContainer"
import { settingsService } from "@/app/(protected)/(posts)/(modules)/settings/lib/services/SettingsService"

type CategoryHeaderProps = { category: ICategory; page: number }

export const CategoryHeader = async ({
    category,
    page,
}: CategoryHeaderProps) => {
    const postsCount = await categoriesService.countCategoryPosts(category.id!)

    const postsPerPage = await settingsService.getSettingByKey("posts_per_page")
    const pageSize = Number(postsPerPage?.value) || DEFAULT_PAGE_SIZE

    const nextPage = async () => {
        "use server"

        redirect(`?page=${page + 1}`)
    }
    const prevPage = async () => {
        "use server"

        redirect(`?page=${page - 1}`)
    }

    return (
        <div
            className={
                "grid grid-cols-3 w-full border-b border-stone-200 h-14"
            }>
            <div className={"flex items-center"}>
                <h2
                    className={
                        "text-2xl font-bold text-stone-900 ms-4 flex items-center"
                    }>
                    {category.name}
                </h2>

                {category.id !== undefined && (
                    <MoveToBookmarkButton categoryId={category.id} />
                )}
            </div>
            <div className={"flex items-center justify-center"}>
                <CommentWithPaymentContainer />
            </div>
            <div className={"flex items-center justify-end"}>
                <PaginationControls
                    shouldHidePageNumber={true}
                    totalPages={Math.ceil(postsCount / pageSize)}
                    page={page}
                    nextPage={nextPage}
                    prevPage={prevPage}
                />
            </div>
        </div>
    )
}
