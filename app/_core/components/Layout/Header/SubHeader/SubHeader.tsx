import { PaginationControls } from "@/components/PaginationControls"
import { redirect } from "next/navigation"
import { CommentWithPaymentContainer } from "@/app/(protected)/(payment)/(modules)/comments/components/CommentWithPaymentContainer"
import { MoveToBookmarkButton } from "@/app/(protected)/(posts)/(modules)/bookmark/components/MoveToBookmarkButton"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"
import { BookmarkIdentifiers } from "@/app/(protected)/(posts)/(modules)/bookmark/lib/interfaces/IBookmark"

type CategoryHeaderProps = {
    title?: string
    page: number
    pageSize: number
    itemsCount: number
    bookmarkReferenceType?: BookmarkIdentifiers["referenceType"]
}

export const SubHeader = async ({
    title,
    page,
    pageSize,
    itemsCount,
    bookmarkReferenceType,
}: CategoryHeaderProps) => {
    const session = await getAppServerSession()

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
                    {title}
                </h2>

                {session?.user && bookmarkReferenceType && (
                    <MoveToBookmarkButton
                        referenceType={bookmarkReferenceType}
                        userId={session.user.id}
                    />
                )}
            </div>
            <div className={"flex items-center justify-center"}>
                <CommentWithPaymentContainer />
            </div>
            <div className={"flex items-center justify-end"}>
                <PaginationControls
                    shouldHidePageNumber={true}
                    totalPages={Math.ceil(itemsCount / pageSize)}
                    page={page}
                    nextPage={nextPage}
                    prevPage={prevPage}
                />
            </div>
        </div>
    )
}
