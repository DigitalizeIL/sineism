"use client"

import { ReactNode, createContext, useContext } from "react"

import { DEFAULT_PAGE_SIZE } from "@/app/(protected)/(posts)/(modules)/categories/consts/pagination"
import { Footer } from "../components/Layout/Footer/Footer"
import { ICategory } from "@/app/(protected)/(posts)/(modules)/categories/lib/category.interface"
import { PaginationCursorResponse } from "../types/pagination.types"

type BaseItem = { id: number }

type ContentContextState<T = unknown> = {
    items: T[]
    cursors: PaginationCursorResponse
    page?: number
    pageSize: number
    categories?: ICategory[]
}

type CategoryFeedProps<T extends BaseItem> = ContentContextState<T> & {
    Header?: ReactNode
    FeedItems?: ReactNode
    Footer?: ReactNode
}

const ContentContext = createContext<ContentContextState<BaseItem>>({
    items: [],
    cursors: {
        first: 0,
        last: 0,
        next: 0,
        previous: 0,
    },
    pageSize: DEFAULT_PAGE_SIZE,
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
    page,
    categories,
}: CategoryFeedProps<T>) {
    return (
        <ContentContext.Provider
            value={{
                categories,
                page,
                items,
                cursors,
                pageSize: pageSize || DEFAULT_PAGE_SIZE,
            }}>
            <div className="flex flex-col h-auto">
                <div className="sticky top-0 w-full shadow-sm bg-neutral-50 z-10">
                    {Header}
                </div>
                <div
                    className={
                        "flex flex-grow flex-col justify-start items-center w-full mt-4 pb-20"
                    }>
                    {FeedItems}
                </div>
                <div className="bottom-0 mt-10 w-full shadow-sm fixed bg-neutral-50 z-5">
                    <Footer>{FooterChildren}</Footer>
                </div>
            </div>
        </ContentContext.Provider>
    )
}
