"use client"

import { FC, useEffect, useMemo } from "react"
import { FcNext, FcPrevious } from "react-icons/fc"

import { Button } from "../Button"
import { PAGINATION_URL_PARAM_KEY } from "../../consts/pagination.consts"
import { TEXTS } from "./pagination.texts"
import { useContent } from "../../views/ContentFeed"

export type PagimationCursors = {
    previous: number,
    next: number
}

type PaginationContainerProps = {
    page: number
}

export const PaginationControlles: FC<PaginationContainerProps> = ({
    page,
}) => {
    const { nextPageCursorId: nextPage, previousPageCursorId: previousPage, items, pageSize } = useContent()

    const isLastPage = !nextPage || page === nextPage
    const isFirstPage = !previousPage || page === previousPage

    const goToNextPage = () => {
        location.search = `?${PAGINATION_URL_PARAM_KEY}=${nextPage}`
    }
    const goToPrevPage = () => {
        location.search = `?${PAGINATION_URL_PARAM_KEY}=${previousPage}`
    }

    return (
        <div className={"flex items-center justify-center px-4 gap-2"}>
            <Button
                onClick={goToPrevPage}
                isDisabled={isFirstPage}
                type={"ghost"}
                className="bg-blue-500 hover:bg-blue-600">
                <FcNext /> {TEXTS.previousPage}
            </Button>
            <Button
                onClick={goToNextPage}
                isDisabled={isLastPage}
                type={"ghost"}
                className="bg-blue-500 hover:bg-blue-600">
                {TEXTS.nextPage} <FcPrevious />
            </Button>
        </div>
    )
}
