import { ReactNode, Suspense } from "react"

import { BookmarkIdentifiers } from "@/app/(protected)/(posts)/(modules)/bookmark/lib/bookmark.interface"
import { CommentWithPaymentContainer } from "@/app/(protected)/(payment)/(modules)/comments/components/CommentWithPayment.container"
import { MoveToBookmarkButton } from "@/app/(protected)/(posts)/(modules)/bookmark/components/MoveToBookmarkButton"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"

type CategoryHeaderProps = {
    title?: string
    bookmarkReferenceType?: BookmarkIdentifiers["referenceType"]
    Pagination?: ReactNode
}

export const SubHeader = async ({
    title,
    bookmarkReferenceType,
    Pagination,
}: CategoryHeaderProps) => {
    const session = await getAppServerSession()

    return (
        <div
            className={
                "grid grid-cols-3 w-full border-b border-stone-200 h-14 mb-4"
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
            {Pagination && (
                <div className={"flex items-center justify-end"}>
                    {Pagination}
                </div>
            )}
        </div>
    )
}
