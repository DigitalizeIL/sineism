import React, { ChangeEventHandler, forwardRef } from "react"
import clsx from "clsx"

export type TextAreaProps = {
    placeholder?: string
    className?: string
    rows?: number
    value: string
    isInvalid?: boolean
    onChange?: ChangeEventHandler<HTMLTextAreaElement>
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    (props, ref) => {
        return (
            <textarea
                ref={ref}
                onChange={props.onChange}
                value={props.value}
                rows={props.rows || 3}
                placeholder={props.placeholder}
                className={clsx([
                    "border-2 border-gray-300 rounded-md p-2",
                    "focus:outline-none",
                    "focus:ring-2",
                    "focus:border-transparent",
                    props.isInvalid
                        ? "focus:ring-red-400"
                        : "focus:ring-blue-400",
                    props.className,
                ])}
            />
        )
    }
)

TextArea.displayName = "TextArea"

export { TextArea }
