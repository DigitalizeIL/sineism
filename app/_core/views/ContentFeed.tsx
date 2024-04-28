"use client"

import { ReactNode, createContext, useContext } from "react"

import { DEFAULT_PAGE_SIZE } from "@/app/(protected)/(posts)/(modules)/categories/consts/pagination"
import { Footer } from "../components/Layout/Footer/Footer"
import { PaginationCursorResponse } from "../types/pagination.types"

type BaseItem = { id: number }

type CategoryFeedProps<T extends BaseItem> = {
    Header?: ReactNode
    FeedItems?: ReactNode
    Footer?: ReactNode
    items: T[],
    cursors: PaginationCursorResponse,
    pageSize: number | null
    page?: number
}

type ContentContextState<T = unknown> = {
    items: T[],
    cursors: PaginationCursorResponse,
    page?: number,
    pageSize: number
}

const ContentContext = createContext<ContentContextState<BaseItem>>({
    page: 0,
    items: [],
    cursors: {
        first: 0,
        last: 0,
        next: 0,
        previous: 0
    },
    pageSize: DEFAULT_PAGE_SIZE
})

export const useContent = () => {
    return useContext(ContentContext)
}

export function ContentFeed<T extends BaseItem>({
    Header,
    FeedItems,
    Footer: FooterChildren,
    items,
    cursors,
    pageSize,
    page
}: CategoryFeedProps<T>) {
    return (
        <ContentContext.Provider
            value={{
                page,
                items,
                cursors,
                pageSize: pageSize || DEFAULT_PAGE_SIZE
            }}>
            <div className="flex flex-col h-full">
                <div>{Header}</div>
                <div
                    className={
                        "flex flex-col justify-start items-center w-full"
                    }>
                    {FeedItems}
                </div>
                <div className="mt-auto">
                    <Footer>{FooterChildren}</Footer>
                </div>
            </div>
        </ContentContext.Provider>
    )
}
