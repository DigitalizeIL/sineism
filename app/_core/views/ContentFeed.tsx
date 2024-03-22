"use client"

import { ReactNode, createContext, useContext } from "react"

import { Footer } from "../components/Layout/Footer/Footer"

type BaseItem = { id: number }

type CategoryFeedProps<T extends BaseItem> = {
    Header?: ReactNode
    FeedItems?: ReactNode
    Footer?: ReactNode
    items: T[]
}

type ContentContextState<T = unknown> = {
    items: T[]
}

const contentContext = createContext<ContentContextState<BaseItem>>({
    items: [],
})

export const useContent = () => {
    return useContext(contentContext)
}

export function ContentFeed<T extends BaseItem>({
    Header,
    FeedItems,
    Footer: FooterChildren,
    items,
}: CategoryFeedProps<T>) {
    return (
        <contentContext.Provider
            value={{
                items,
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
        </contentContext.Provider>
    )
}
