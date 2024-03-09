import { BookmarkIdentifiers } from "@/app/(protected)/(posts)/(modules)/bookmark/lib/bookmark.interface"
import { CommentWithPaymentContainer } from "@/app/(protected)/(payment)/(modules)/comments/components/CommentWithPayment.container"
import { MoveToBookmarkButton } from "@/app/(protected)/(posts)/(modules)/bookmark/components/MoveToBookmarkButton"
import { PaginationControls } from "@/components/PaginationControls"
import { Suspense } from "react"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"

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

                <Suspense>
                    {session?.user && bookmarkReferenceType && (
                        <MoveToBookmarkButton
                            referenceType={bookmarkReferenceType}
                            userId={session.user.id}
                        />
                    )}
                </Suspense>
            </div>
            <div className={"flex items-center justify-center"}>
                <Suspense>
                    <CommentWithPaymentContainer />
                </Suspense>
            </div>
            <div className={"flex items-center justify-end"}>
                <Suspense>
                    <PaginationControls
                        shouldHidePageNumber={true}
                        totalPages={Math.ceil(itemsCount / pageSize)}
                        page={page}
                    />
                </Suspense>
            </div>
        </div>
    )
}
