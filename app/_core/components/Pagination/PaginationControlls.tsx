"use client"

import { FcNext, FcPrevious } from "react-icons/fc"

import { Button } from "../Button"
import { TEXTS } from "./pagination.texts"
import { useContent } from "../../views/ContentFeed"
import { useRouter } from "next/navigation"
import { PAGINATION_URL_PARAM_KEY } from "../../consts/pagination.consts"

export const PaginationControlles = () => {
    const { cursor: page = 0, pageSize, items, updatePage } = useContent()

    const router = useRouter()

    const first = items[0]?.cursor || 0
    const last = items[items.length - 1]?.cursor || 0
    const next = items[page + (pageSize - 1)]?.cursor || 0
    const previous = items[page - (pageSize + 1)]?.cursor || 0

    const isLastPage = page === last
    const isFirstPage = !page || page === first

    const goToNextPage = () => {
        router.push(`?${PAGINATION_URL_PARAM_KEY}=${next || last}`)
        updatePage(next || last)
    }
    const goToPrevPage = () => {
        router.push(`?${PAGINATION_URL_PARAM_KEY}=${previous || first}`)
        updatePage(previous || first)
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
