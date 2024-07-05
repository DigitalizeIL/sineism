"use client"

import { LoadingDots } from "@/app/_core/components/LoadingDots"
import { Rating as MuiRating } from "@mui/material"
import { SyntheticEvent, useState, useTransition } from "react"
import { updateRating } from "../actions/rating.action"
import { usePathname } from "next/navigation"
import { IRating } from "../lib/rating.interface"

type RatingProps = {
    userRating?: IRating | null
    totalRating: number | null
    commentId?: number
    postId?: number
}

export const Rating = ({
    userRating,
    totalRating,
    postId,
    commentId,
}: RatingProps) => {
    const [isPending, startTransition] = useTransition()
    const [isLoading, setIsLoading] = useState(false)
    const path = usePathname()
    const handleChange = (
        event: SyntheticEvent<Element, Event>,
        value: number | null
    ) => {
        setIsLoading(true)
        startTransition(async () => {
            await updateRating({
                commentId,
                path,
                postId,
                rating: userRating,
                newRating: value,
            })
            setIsLoading(false)
        })
    }

    return (
        <div className={"flex flex-row items-center"}>
            <MuiRating
                style={{
                    direction: "ltr",
                    color: "black",
                }}
                disabled={isLoading}
                value={userRating?.rating}
                onChange={handleChange}
            />
            {isLoading ? (
                <LoadingDots />
            ) : (
                totalRating !== null &&
                !isNaN(totalRating) && (
                    <span className={"text-stone-700 "}>{totalRating}</span>
                )
            )}
        </div>
    )
}
