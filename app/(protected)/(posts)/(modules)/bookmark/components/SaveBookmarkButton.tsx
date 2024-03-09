"use client"

import { BsBookmarkPlus } from "react-icons/bs"
import { Button } from "@/components/Button"
import { useState } from "react"

type SaveBookmarkButtonProps = {
    isActive: boolean
    onSaveClick?: () => Promise<void>
}

export const SaveBookmarkButton = ({
    isActive,
    onSaveClick,
}: SaveBookmarkButtonProps) => {
    const [isLoading, setIsLoading] = useState(false)

    const onClick = async () => {
        await onSaveClick?.()
        setIsLoading(false)
    }

    return (
        <form
            action={onClick}
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
