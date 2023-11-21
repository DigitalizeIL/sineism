import React, { ReactNode } from "react"
import Styles from "./Card.module.css"
import clsx from "clsx"

export const Card = (props: {
    title: ReactNode
    description: string
    children?: ReactNode
    actions?: ReactNode[]
    style?: React.CSSProperties
    className?: string
}) => {
    return (
        <div className={clsx(["relative p-1 m-10", props.className])}>
            <div className={"flex flex-col items-start"}>
                {typeof props.title === "string" ? (
                    <h3
                        className={
                            "text-lg font-medium text-stone-900 self-center"
                        }>
                        {props.title}
                    </h3>
                ) : (
                    props.title
                )}
                {props.description ? (
                    <p
                        className={
                            "text-sm text-stone-700 me-auto whitespace-pre-wrap"
                        }>
                        {props.description}
                    </p>
                ) : null}
            </div>
            <div>{props.children}</div>
            {props.actions ? (
                <div className={Styles.actions}>{props.actions}</div>
            ) : null}
        </div>
    )
}
