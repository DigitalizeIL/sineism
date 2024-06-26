"use client"

import { IBookmark } from "@/app/(protected)/(posts)/(modules)/bookmark/lib/bookmark.interface"
import { PAGINATION_URL_PARAM_KEY } from "@/app/_core/consts/pagination.consts"
import { Button } from "@/components/Button"
import { BiBookBookmark } from "react-icons/bi"
import Link from "next/link"

type ComponentProps = {
    activeBookmark: IBookmark
}
export const MoveToBookmarkButton = ({ activeBookmark }: ComponentProps) => {
    return (
        <Link
            passHref
            href={`?${PAGINATION_URL_PARAM_KEY}=${activeBookmark?.bookmarkedItemId}`}>
            <Button
                type={"ghost"}
                className="bg-blue-500 hover:bg-blue-600">
                <BiBookBookmark />
            </Button>
        </Link>
    )
}
