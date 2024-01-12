"use client"

import { FieldValues, useController, UseControllerProps } from "react-hook-form"
import clsx from "clsx"

export function TextArea<Dto extends FieldValues>(
    props: {
        placeholder?: string
        className?: string
        rows?: number
    } & UseControllerProps<Dto>
) {
    const { field, fieldState } = useController(props)

    return (
        <div>
            <textarea
                rows={props.rows || 3}
                placeholder={props.placeholder}
                className={clsx([
                    "border-2 border-gray-300 rounded-md p-2",
                    "focus:outline-none",
                    "focus:ring-2",
                    "focus:border-transparent",
                    fieldState.invalid
                        ? "focus:ring-red-400"
                        : "focus:ring-blue-400",
                    props.className,
                ])}
                {...field}
            />
            <div>{fieldState.error?.message}</div>
        </div>
    )
}
