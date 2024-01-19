"use client"

import { Rating as MuiRating } from "@mui/material"
import { useTransition } from "react"

type RatingProps = {
    userRating: number | null
    totalRating: number | null
    onChange: (rating: number | null, path: string) => {}
}

export const Rating = ({ userRating, totalRating, onChange }: RatingProps) => {
    const [isPending, startTransition] = useTransition()

    return (
        <div className={"flex flex-row"}>
            <MuiRating
                style={{
                    direction: "ltr",
                }}
                name="simple-controlled"
                value={userRating}
                onChange={(event, value) => {
                    startTransition(() => {
                        onChange(value, window.location.pathname)
                    })
                }}
            />
            <span>{totalRating}</span>
        </div>
    )
}
