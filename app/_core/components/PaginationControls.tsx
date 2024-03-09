import { FcNext, FcPrevious } from "react-icons/fc"

import { Button } from "@/components/Button"
import { redirect } from "next/navigation"

type PaginationButtonsProps = {
    page: number
    totalPages: number
    shouldHidePageNumber?: boolean
}
export const PaginationControls = async (props: PaginationButtonsProps) => {
    const isFirstPage = props.page === 1
    const isLastPage = props.page === props.totalPages

    const nextPage = async () => {
        "use server"

        redirect(`?page=${props.page + 1}`)
    }
    const prevPage = async () => {
        "use server"

        redirect(`?page=${props.page - 1}`)
    }

    if (!props.totalPages) {
        return <div></div>
    }

    return (
        <div className={"flex items-center justify-center px-4 gap-2"}>
            <form action={prevPage}>
                <Button
                    isDisabled={isFirstPage}
                    type={"ghost"}
                    className="bg-blue-500 hover:bg-blue-600">
                    <FcNext /> {"עמוד קודם"}
                </Button>
            </form>
            {!props.shouldHidePageNumber ? (
                <span className={"mx-4"}>
                    {props.page}
                    {props.totalPages ? ` / ${props.totalPages}` : null}
                </span>
            ) : null}
            <form action={nextPage}>
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
