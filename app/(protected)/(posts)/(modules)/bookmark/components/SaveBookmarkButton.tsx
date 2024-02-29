"use client"

import {
    BookmarkIdentifiers,
    IBookmark,
} from "@/app/(protected)/(posts)/(modules)/bookmark/lib/interfaces/IBookmark"

import { BsBookmarkPlus } from "react-icons/bs"
import { Button } from "@/components/Button"
import { SaveBookmarkButtonContainerProps } from "./SaveBookmarkButtonContainer"
import { bookmarkService } from "@/app/(protected)/(posts)/(modules)/bookmark/lib/services/BookmarkService"
import { revalidatePath } from "next/cache"
import { saveBookmark } from "../actions/saveBookmark"
import { useState } from "react"

type SaveBookmarkButtonProps = SaveBookmarkButtonContainerProps & {
    isActive: boolean
    activeBookmark?: IBookmark | null
}

export const SaveBookmarkButton = async ({
    ids,
    page,
    isActive,
    activeBookmark,
    itemIdToBookmark,
    pathForRevalidation,
}: SaveBookmarkButtonProps) => {
    const [isLoading, setIsLoading] = useState(false)

    const onClick = async () => {
        setIsLoading(true)
        await saveBookmark({
            ids,
            isActive,
            itemIdToBookmark,
            page,
            activeBookmark,
            pathForRevalidation,
        })
        setIsLoading(false)
    }

    return (
        <Button
            onClick={onClick}
            loading={isLoading}
            type={isActive ? "primary" : "ghost"}
            className="bg-blue-500 hover:bg-blue-600">
            <BsBookmarkPlus />
        </Button>
    )
}
