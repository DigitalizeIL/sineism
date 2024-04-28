"use client"

import { ReactNode, createContext, useContext } from "react"

import { DEFAULT_PAGE_SIZE } from "@/app/(protected)/(posts)/(modules)/categories/consts/pagination"
import { Footer } from "../components/Layout/Footer/Footer"
import { PaginationCursors } from "../components/Pagination/PaginationControlls"

type BaseItem = { id: number }

type CategoryFeedProps<T extends BaseItem> = {
    Header?: ReactNode
    FeedItems?: ReactNode
    Footer?: ReactNode
    items: T[],
    cursors: PaginationCursors,
    pageSize: number | null
}

type ContentContextState<T = unknown> = {
    items: T[],
    previousPageCursorId: number | null,
    nextPageCursorId: number | null,
    pageSize: number
}

const ContentContext = createContext<ContentContextState<BaseItem>>({
    items: [],
    nextPageCursorId: null,
    previousPageCursorId: null,
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
    pageSize
}: CategoryFeedProps<T>) {
    return (
        <ContentContext.Provider
            value={{
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
