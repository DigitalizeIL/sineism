import React, { ChangeEvent, forwardRef } from "react"
import clsx from "clsx"

type Props = {
    value?: string
    defaultValue?: string
    className?: string
    name?: string
    hidden?: boolean
    isInvalid?: boolean
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    type?: "text" | "number" | string
    placeholder?: string
}
export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
    return (
        <input
            ref={ref}
            placeholder={props.placeholder}
            defaultValue={props.defaultValue}
            name={props.name}
            type={props.hidden ? "hidden" : props.type || "text"}
            className={clsx([
                "border-2 border-gray-300 rounded-md p-2",
                "focus:outline-none",
                "focus:ring-2",
                props.isInvalid ? "focus:ring-red-400" : "focus:ring-blue-400",
                "focus:border-transparent",
                props.className,
            ])}
            value={props.value}
            onChange={props.onChange}
        />
    )
})

Input.displayName = "Input"
