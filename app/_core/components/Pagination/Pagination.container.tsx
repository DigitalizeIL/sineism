"use client"

import { FcNext, FcPrevious } from "react-icons/fc"

import { Button } from "../Button"
import { FC } from "react"
import { PAGINATION_URL_PARAM_KEY } from "../../consts/pagination.consts"
import { TEXTS } from "./pagination.texts"
import { useContent } from "../../views/ContentFeed"
import { useSettings } from "@/app/(protected)/(posts)/(modules)/settings/context/SettingsContext"

type PaginationContainerProps = {
    page: number
    lastCursor: number
}

export const PaginationContainer: FC<PaginationContainerProps> = async ({
    page,
    lastCursor,
}) => {
    const { items } = useContent()
    const ids = items.map((item) => item.id)
    const { posts_per_page } = useSettings()

    const firstId = ids[0]
    const lastId = ids[ids?.length - 1]

    const nextPage = (lastId ?? page) + 1
    let previousPage = (firstId ?? page) - posts_per_page
    if (previousPage < 0) previousPage = 0

    const isFirstPage =
        ids.includes(page) ||
        previousPage === page ||
        page <= 1 ||
        previousPage <= 0

    const isLastPage =
        page >= nextPage - 1 || nextPage === 1 || nextPage > lastCursor

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
