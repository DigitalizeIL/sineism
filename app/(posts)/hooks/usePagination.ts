import { useState } from "react"

interface PaginationProps {
    initialPage?: number
    initialLimit?: number
}

interface PaginationReturns {
    currentPage: number
    limit: number
    nextPage: () => void
    prevPage: () => void
    jumpToPage: (page: number) => void
    setLimit: (limit: number) => void
}

function usePagination({
    initialPage = 1,
    initialLimit = 10,
}: PaginationProps): PaginationReturns {
    const [currentPage, setCurrentPage] = useState<number>(initialPage)
    const [limit, setLimit] = useState<number>(initialLimit)

    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1)
    }

    const prevPage = () => {
        setCurrentPage((prevPage) => Math.max(1, prevPage - 1))
    }

    const jumpToPage = (page: number) => {
        setCurrentPage(page)
    }

    return {
        currentPage,
        limit,
        nextPage,
        prevPage,
        jumpToPage,
        setLimit,
    }
}
