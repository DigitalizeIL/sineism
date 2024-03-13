import { FcNext, FcPrevious } from "react-icons/fc"

import { Button } from "@/components/Button"
import { PAGINATION_URL_PARAM_KEY } from "../../consts/pagination.consts"
import { TEXTS } from "./pagination.texts"
import { redirect } from "next/navigation"

type PaginationButtonsProps = {
    page: number
    nextPage: number
    previousPage: number
}
export const PaginationControls = async ({
    page,
    previousPage,
    nextPage,
}: PaginationButtonsProps) => {
    console.log({ page, nextPage, previousPage })
    const isLastPage = page >= nextPage - 1 || nextPage === 1
    const isFirstPage = previousPage === page || page === 1 || previousPage <= 0

    const goToNextPage = async () => {
        "use server"

        redirect(`?${PAGINATION_URL_PARAM_KEY}=${nextPage}`)
    }
    const goToPrevPage = async () => {
        "use server"

        redirect(`?${PAGINATION_URL_PARAM_KEY}=${previousPage}`)
    }

    return (
        <div className={"flex items-center justify-center px-4 gap-2"}>
            <form action={goToPrevPage}>
                <Button
                    isDisabled={isFirstPage}
                    type={"ghost"}
                    className="bg-blue-500 hover:bg-blue-600">
                    <FcNext /> {TEXTS.previousPage}
                </Button>
            </form>
            <form action={goToNextPage}>
                <Button
                    isDisabled={isLastPage}
                    type={"ghost"}
                    className="bg-blue-500 hover:bg-blue-600">
                    {TEXTS.nextPage} <FcPrevious />
                </Button>
            </form>
        </div>
    )
}
