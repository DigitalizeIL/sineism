"use client"

import clsx from "clsx"
import { ChangeEvent } from "react"

export const UnControlledSelect = (props: {
    name: string
    className?: string
    defaultValue?: string | number
    placeholder?: string
    multiple?: boolean
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
    options: { label: string; value: string | number | undefined }[]
}) => {
    return (
        <select
            multiple={props.multiple}
            name={props.name}
            onChange={props.onChange}
            placeholder={props.placeholder}
            className={clsx([
                props.className,
                "w-full",
                "border-2",
                "border-gray-300",
                "rounded-md",
                "focus:outline-none",
                "focus:ring-2",
                "focus:ring-blue-400",
                "focus:border-transparent",
                "p-2",
            ])}>
            <option
                // value={"empty"}
                selected
                disabled>
                {props.placeholder || "Select"}
            </option>
            {props.options.map((option) => (
                <option
                    key={option.value}
                    value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    )
}
