import { FcNext, FcPrevious } from "react-icons/fc"

import { Button } from "@/components/Button"
import { PAGINATION_URL_PARAM_KEY } from "../consts/pagination.consts"
import { redirect } from "next/navigation"

type PaginationButtonsProps = {
    page: number
    nextPage: number
    previousPage: number
    totalPages: number
    shouldHidePageNumber?: boolean
}
export const PaginationControls = async ({
    page,
    previousPage,
    nextPage,
    totalPages,
    shouldHidePageNumber,
}: PaginationButtonsProps) => {
    const isLastPage = page >= nextPage - 1
    const isFirstPage = previousPage === page || previousPage <= 0

    const goToNextPage = async () => {
        "use server"

        redirect(`?${PAGINATION_URL_PARAM_KEY}=${nextPage}`)
    }
    const goToPrevPage = async () => {
        "use server"

        redirect(`?${PAGINATION_URL_PARAM_KEY}=${previousPage}`)
    }

    if (!totalPages) {
        return <div></div>
    }

    return (
        <div className={"flex items-center justify-center px-4 gap-2"}>
            <form action={goToPrevPage}>
                <Button
                    isDisabled={isFirstPage}
                    type={"ghost"}
                    className="bg-blue-500 hover:bg-blue-600">
                    <FcNext /> {"עמוד קודם"}
                </Button>
            </form>
            {!shouldHidePageNumber ? (
                <span className={"mx-4"}>
                    {page}
                    {totalPages ? ` / ${totalPages}` : null}
                </span>
            ) : null}
            <form action={goToNextPage}>
                <Button
                    isDisabled={isLastPage}
                    type={"ghost"}
                    className="bg-blue-500 hover:bg-blue-600">
                    {"עמוד הבא"} <FcPrevious />
                </Button>
            </form>
        </div>
    )
}
