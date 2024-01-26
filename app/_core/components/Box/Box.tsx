import React, { ReactNode } from "react"
import clsx from "clsx"

export const Box = ({
    children,
    className,
}: {
    children?: ReactNode
    className?: string
}) => {
    return (
        <div
            className={clsx([
                "p-4 my-4 rounded shadow-md w-3/4 mx-auto relative",
                className,
            ])}>
            {children}
        </div>
    )
}
