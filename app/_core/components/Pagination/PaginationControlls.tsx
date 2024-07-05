"use client"

import { FcNext, FcPrevious } from "react-icons/fc"

import { useMemo } from "react"
import { useContent } from "../../views/ContentFeed"
import { Button } from "../Button"
import { TEXTS } from "./pagination.texts"

const DEFAULT_NUMBER = 0

export const PaginationControlles = () => {
    const {
        cursor = DEFAULT_NUMBER,
        pageSize,
        feedItems: items,
        updateCursor,
    } = useContent()

    const first = items[0]?.cursor
    const last = items[items.length - 1]?.cursor

    const indexOfCursor = useMemo(
        () => items.findIndex((item) => item.cursor === cursor),
        [cursor, items]
    )

    const next = useMemo(() => {
        if (indexOfCursor === -1) {
            return items[pageSize]?.cursor || last
        }

        const offset = indexOfCursor + pageSize

        return items[offset]?.cursor || last
    }, [indexOfCursor, pageSize, items, last])

    const previous = useMemo(() => {
        if (indexOfCursor === -1) {
            return first
        }

        const offset = indexOfCursor - pageSize

        return items[offset]?.cursor || first
    }, [indexOfCursor, pageSize, items, first])

    const isLastPage = useMemo(() => {
        return (
            cursor === last ||
            items.slice(-pageSize).find((item) => item.cursor === cursor)
        )
    }, [cursor, items, last, pageSize])

    const isFirstPage = !cursor || cursor === first

    const goToNextPage = () => {
        updateCursor(next)
    }

    const goToPrevPage = () => {
        updateCursor(previous)
    }

    return (
        <div className={"flex items-center justify-center px-4 gap-2"}>
            <Button
                onClick={goToPrevPage}
                isDisabled={!!isFirstPage}
                type={"ghost"}
                className="bg-blue-500 hover:bg-blue-600">
                <FcNext /> {TEXTS.previousPage}
            </Button>
            <Button
                onClick={goToNextPage}
                isDisabled={!!isLastPage}
                type={"ghost"}
                className="bg-blue-500 hover:bg-blue-600">
                {TEXTS.nextPage} <FcPrevious />
            </Button>
        </div>
    )
}
