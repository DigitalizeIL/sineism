import { Button } from "@/components/Button"
import { FcNext, FcPrevious } from "react-icons/fc"

type PaginationButtonsProps = {
    page: number
    totalPages: number
    shouldHidePageNumber?: boolean
    nextPage?: () => void
    prevPage?: () => void
}
export const PaginationControls = async (props: PaginationButtonsProps) => {
    const isFirstPage = props.page === 1
    const isLastPage = props.page === props.totalPages

    if (!props.totalPages) {
        return <div></div>
    }

    return (
        <div className={"flex items-center justify-center h-full px-4"}>
            {props.prevPage && !isFirstPage ? (
                <form action={props.prevPage}>
                    <Button
                        type={"ghost"}
                        className="bg-blue-500 hover:bg-blue-600">
                        <FcNext /> {"עמוד קודם"}
                    </Button>
                </form>
            ) : null}
            {!props.shouldHidePageNumber ? (
                <span className={"mx-4"}>
                    {props.page}
                    {props.totalPages ? ` / ${props.totalPages}` : null}
                </span>
            ) : null}
            {props.nextPage && !isLastPage ? (
                <form action={props.nextPage}>
                    <Button
                        type={"ghost"}
                        className="bg-blue-500 hover:bg-blue-600">
                        {"עמוד הבא"} <FcPrevious />
                    </Button>
                </form>
            ) : null}
        </div>
    )
}
