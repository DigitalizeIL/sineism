import { PropsWithChildren } from "react"

export const Footer = ({ children }: PropsWithChildren) => {
    return (
        <div className="flex w-full justify-end border-t border-stone-200 h-14 p-2">
            {children}
        </div>
    )
}
