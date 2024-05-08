"use client"

import { LoadingDots } from "@/app/_core/components/LoadingDots"
import { CircularProgress, Rating as MuiRating } from "@mui/material"
import { SyntheticEvent, useState, useTransition } from "react"

type RatingProps = {
    userRating: number | null
    totalRating: number | null
    onChange?: (rating: number | null, path: string) => Promise<void>
}

export const Rating = ({ userRating, totalRating, onChange }: RatingProps) => {
    const [isPending, startTransition] = useTransition()
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (event: SyntheticEvent<Element, Event>, value: number | null) => {
        setIsLoading(true)
        startTransition(async () => {
            await onChange?.(value, window.location.pathname)
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
                value={userRating}
                onChange={handleChange}
            />
            {isLoading ? <LoadingDots /> :
                totalRating !== null && !isNaN(totalRating) && (
                    <span className={"text-stone-700 "}>{totalRating}</span>
                )}
        </div>
    )
}
