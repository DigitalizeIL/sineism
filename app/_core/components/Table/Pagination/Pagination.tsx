import Styles from "./Pagination.module.css"
import { ChangeEvent, useState } from "react"
import clsx from "clsx"
import { PAGINATION_PER_PAGE } from "./consts"
import { useRouter } from "next/router"

export type PaginationParameters = {
    count?: number
    page?: number
}

export type PaginationProps = {
    perPage?: number
    page?: number
    itemsCount: number
    onChange: (parameters: PaginationParameters) => void
}

export const Pagination = (props: PaginationProps) => {
    const [perPage, setPerPage] = useState(
        props.perPage || PAGINATION_PER_PAGE[0]
    )
    const pagesCount = Math.round(props.itemsCount / perPage)
    const pages = Array.from(Array(pagesCount).keys()).map((i) => i + 1)
    const router = useRouter()
    const currentPage = router.query.page ? Number(router.query.page) : 1

    const onPageChange = (page: number) => {
        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                page,
                perPage,
            },
        })
        props.onChange({
            page,
            count: perPage,
        })
    }

    const onChangePerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        let page = currentPage
        const perPage = Number(e.target.value)

        if (perPage * currentPage > props.itemsCount) {
            page = 1
        }

        setPerPage(perPage)
        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                perPage,
                page,
            },
        })
        props.onChange({
            count: perPage,
            page,
        })
    }

    return (
        <div className={Styles.pagination}>
            <div className={Styles.perPage}>
                <select
                    name={"perPage"}
                    value={perPage || -1}
                    onChange={onChangePerPage}>
                    {PAGINATION_PER_PAGE.map((perPageItem) => (
                        <option
                            key={perPageItem}
                            value={perPageItem}>
                            {perPageItem}
                        </option>
                    ))}
                </select>
            </div>
            <div className={Styles.numbers}>
                {pages.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        className={clsx([
                            Styles.number,
                            pageNumber === currentPage && Styles.active,
                        ])}
                        onClick={() => onPageChange(pageNumber)}>
                        {pageNumber}
                    </button>
                ))}
            </div>
        </div>
    )
}
