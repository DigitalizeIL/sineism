import { MouseEventHandler, ReactNode } from "react"

export type IconProps = {
    onClick?: MouseEventHandler<HTMLButtonElement>
    children?: ReactNode
}

export const IconButton = (props: IconProps) => {
    return (
        <button
            style={{
                border: "none",
                background: "none",
                padding: 0,
            }}
            onClick={props.onClick}>
            {props.children}
        </button>
    )
}
