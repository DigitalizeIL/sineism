"use client"

import { FC, useEffect, useMemo } from "react"
import { FcNext, FcPrevious } from "react-icons/fc"

import { Button } from "../Button"
import { PAGINATION_URL_PARAM_KEY } from "../../consts/pagination.consts"
import { TEXTS } from "./pagination.texts"
import { useContent } from "../../views/ContentFeed"

export const PaginationControlles = () => {
    const { page, cursors: {next, previous, last, first} } = useContent()

    const isLastPage = !next || page === next
    const isFirstPage = !page || page === first

    const goToNextPage = () => {
        location.search = `?${PAGINATION_URL_PARAM_KEY}=${next || last}`
    }
    const goToPrevPage = () => {
        location.search = `?${PAGINATION_URL_PARAM_KEY}=${previous || first}`
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
