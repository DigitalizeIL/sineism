"use client"

import { FC, useMemo } from "react"
import { FcNext, FcPrevious } from "react-icons/fc"

import { Button } from "../Button"
import { PAGINATION_URL_PARAM_KEY } from "../../consts/pagination.consts"
import { TEXTS } from "./pagination.texts"
import { useContent } from "../../views/ContentFeed"
import { useSettings } from "@/app/(protected)/(posts)/(modules)/settings/context/SettingsContext"

export type PaginationCursorBoundery = {
    first: number
    last: number
}

type PaginationContainerProps = {
    page: number
    cursorBoundery: PaginationCursorBoundery
}

export const PaginationContainer: FC<PaginationContainerProps> = async ({
    page,
    cursorBoundery,
}) => {
    const { items } = useContent()
    const ids = items.map((item) => item.id)
    const { posts_per_page } = useSettings()

    const firstId = ids[0] || cursorBoundery.first
    const lastId = ids[ids?.length - 1] || cursorBoundery.last

    const nextPage = lastId + 1

    const previousPage = useMemo(() => {
        const previousPage = firstId - posts_per_page

        if (previousPage < cursorBoundery.first) {
            return cursorBoundery.first
        }

        if (page > cursorBoundery.last) {
            return cursorBoundery.last
        }

        return previousPage
    }, [firstId, page, posts_per_page, cursorBoundery])

    const isFirstPage =
        previousPage < cursorBoundery.first ||
        previousPage === page ||
        page <= 1 ||
        previousPage <= 0

    const isLastPage =
        !nextPage || isNaN(nextPage) || nextPage > cursorBoundery.last || page >= nextPage - 1 || nextPage === 1

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
