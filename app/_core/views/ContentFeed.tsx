"use client"

import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react"

import { DEFAULT_PAGE_SIZE } from "@/app/(protected)/(posts)/(modules)/categories/consts/pagination"
import { Footer } from "../components/Layout/Footer/Footer"
import { ICategory } from "@/app/(protected)/(posts)/(modules)/categories/lib/category.interface"
import { PaginationCursorResponse } from "../types/pagination.types"

type BaseItem = { id: number, cursor: number }

type ContentContextState<T = unknown> = {
    items: T[]
    cursors?: PaginationCursorResponse
    cursor?: number
    pageSize: number
    categories?: ICategory[]
    updatePage: (page: number) => void
}

type ContextProps<T extends BaseItem> = Omit<
    ContentContextState<T>,
    "updatePage"
>

type CategoryFeedProps<T extends BaseItem> = ContextProps<T> & {
    feedItems: {
        cursor: number
        Component: ReactNode
    }[]
    Header?: ReactNode
    Footer?: ReactNode
    forcedPage?: number
}

const ContentContext = createContext<ContentContextState<BaseItem>>({
    items: [],
    cursors: {
        first: 0,
        last: 0,
        next: 0,
        previous: 0,
    },
    cursor: 0,
    pageSize: DEFAULT_PAGE_SIZE,
} as any)

export const useContent = () => {
    return useContext(ContentContext)
}

export function ContentFeed<T extends BaseItem>({
    Header,
    feedItems,
    Footer: FooterChildren,
    items,
    cursors,
    pageSize,
    forcedPage: forcedCursor = 0,
    categories,
}: CategoryFeedProps<T>) {
    const [cursor, setCursor] = useState(forcedCursor)

    useEffect(() => {
        setCursor(forcedCursor)
    }, [forcedCursor])

    const itemsToRender = useMemo(() => {
        return feedItems
            .filter(
                (item) =>
                    item.cursor >= cursor && item.cursor < cursor + pageSize
            )
            .map((item) => item.Component)
    }, [cursor, feedItems, pageSize])

    return (
        <ContentContext.Provider
            value={{
                updatePage: setCursor,
                categories,
                cursor: cursor,
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
                    {itemsToRender}
                </div>
                <div className="bottom-0 mt-10 w-full shadow-sm fixed bg-neutral-50 z-5">
                    <Footer>{FooterChildren}</Footer>
                </div>
            </div>
        </ContentContext.Provider>
    )
}
