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
import { PAGINATION_URL_PARAM_KEY } from "../consts/pagination.consts"
import { IBookmark } from "@/app/(protected)/(posts)/(modules)/bookmark/lib/bookmark.interface"

type BaseItem = { id: number; cursor: number }

type ContentContextState<T = unknown> = {
    cursor?: number
    categories?: ICategory[]
    activeBookmark?: IBookmark | null
    pageSize: number
    feedItems: Array<{
        cursor: number
        item: Omit<T, "cursor">
        Component: ReactNode
    }>
    updateCursor: (cursor: number) => void
}

type ContextProps<T extends BaseItem> = Omit<
    ContentContextState<T>,
    "updateCursor"
>

type CategoryFeedProps<T extends BaseItem> = ContextProps<T> & {
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
    pageSize,
    forcedPage: forcedCursor = 0,
    categories,
    activeBookmark,
}: CategoryFeedProps<T>) {
    const [cursor, setCursor] = useState(forcedCursor)

    useEffect(() => {
        setCursor(forcedCursor)
    }, [forcedCursor])

    const ItemsToRender = useMemo(() => {
        const indexOfCursor = feedItems.findIndex(
            (item) => item.cursor === cursor
        )
        const startIndex = indexOfCursor > 0 ? indexOfCursor : 0
        const endIndex = startIndex + pageSize

        return feedItems
            .slice(startIndex, endIndex)
            .map((item) => item.Component)
    }, [cursor, feedItems, pageSize])

    const updateCursor = (cursor: number) => {
        history.pushState({}, "", `?${PAGINATION_URL_PARAM_KEY}=${cursor}`)
        setCursor(cursor)
    }

    return (
        <ContentContext.Provider
            value={{
                updateCursor,
                categories,
                cursor: cursor,
                feedItems,
                pageSize: pageSize || DEFAULT_PAGE_SIZE,
                activeBookmark,
            }}>
            <div className="flex flex-col h-auto">
                <div className="sticky top-14 w-full shadow-sm bg-neutral-50 z-10">
                    {Header}
                </div>
                <div
                    className={
                        "flex flex-grow flex-col justify-start items-center w-full mt-4 pb-20"
                    }>
                    {ItemsToRender}
                </div>
                <div className="bottom-0 mt-10 w-full shadow-sm fixed bg-neutral-50 z-10">
                    <Footer>{FooterChildren}</Footer>
                </div>
            </div>
        </ContentContext.Provider>
    )
}
