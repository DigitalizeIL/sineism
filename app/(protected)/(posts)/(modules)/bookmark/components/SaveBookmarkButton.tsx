"use client"

import { BsBookmarkPlus } from "react-icons/bs"
import { Button } from "@/components/Button"
import { useState } from "react"
import { saveBookmark } from "../lib/saveBookmark.action"
import { BookmarkReference } from "../lib/bookmark.interface"

type SaveBookmarkButtonProps = {
    isActive: boolean
    itemId: number
    reference: BookmarkReference
}

export const SaveBookmarkButton = ({
    isActive,
    reference,
    itemId,
}: SaveBookmarkButtonProps) => {
    const [isLoading, setIsLoading] = useState(false)

    const saveBookMarkWithArgs = saveBookmark.bind(null, {
        itemId,
        isActive,
        reference,
    })

    return (
        <form
            action={saveBookMarkWithArgs}
            onSubmit={() => {
                setIsLoading(true)
            }}>
            <Button
                loading={isLoading}
                htmlType="submit"
                type={isActive ? "primary" : "ghost"}
                className="bg-blue-500 hover:bg-blue-600">
                <BsBookmarkPlus />
            </Button>
        </form>
    )
}
