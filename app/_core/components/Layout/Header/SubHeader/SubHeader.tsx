"use client"

import { ReactNode } from "react"

import { MoveToBookmarkButton } from "@/app/(protected)/(posts)/(modules)/bookmark/components/MoveToBookmarkButton"
import { useContent } from "@/app/_core/views/ContentFeed"
import { PaginationControlles } from "../../../Pagination/PaginationControlls"

type CategoryHeaderProps = {
    title?: string
    CenterItems?: ReactNode
}

export const SubHeader = ({ title, CenterItems }: CategoryHeaderProps) => {
    const { activeBookmark } = useContent()

    return (
        <div
            className={
                "grid grid-cols-3 w-full border-b border-stone-200 h-14"
            }>
            <div className={"flex items-center"}>
                <h2
                    className={
                        "text-2xl font-bold text-stone-900 ms-4 flex items-center"
                    }>
                    {title}
                </h2>

                {activeBookmark && (
                    <MoveToBookmarkButton activeBookmark={activeBookmark} />
                )}
            </div>
            <div className={"flex items-center justify-center"}>
                {CenterItems}
            </div>
            <div className={"flex items-center justify-end"}>
                <PaginationControlles />
            </div>
        </div>
    )
}
