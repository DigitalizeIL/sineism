"use client"

import { BsBookmarkPlus } from "react-icons/bs"
import { Button } from "@/components/Button"
import { useActionState, useState } from "react"
import { saveBookmark } from "../lib/saveBookmark.action"
import { BookmarkReference } from "../lib/bookmark.interface"
import { useFormStatus } from "react-dom"
import { usePathname } from "next/navigation"

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
    const pathname = usePathname()
    return (
        <form
            action={saveBookmark.bind(null, {
                itemId,
                isActive,
                reference,
                pathname
            })}>
            <ButtonWithLoading isActive={isActive} />
        </form>
    )
}

const ButtonWithLoading = ({
    isActive,
}: Pick<SaveBookmarkButtonProps, "isActive">) => {
    const { pending } = useFormStatus()

    return (
        <Button
            loading={pending}
            htmlType="submit"
            type={isActive ? "primary" : "ghost"}
            className="bg-blue-500 hover:bg-blue-600">
            <BsBookmarkPlus />
        </Button>
    )
}
