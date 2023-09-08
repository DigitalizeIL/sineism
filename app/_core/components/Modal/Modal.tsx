"use client"

import { ReactNode, useEffect } from "react"
import { CgClose } from "react-icons/cg"

export const Modal = (props: {
    children?: ReactNode
    onClose?: () => void
    isOpen: boolean
    style?: any
    preventCloseOnOutsideClick?: boolean
}) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                props.onClose?.()
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [props])

    return (
        <div
            style={{
                display: props.isOpen ? "block" : "none",
            }}
            className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className="fixed inset-0 transition-opacity"
                    aria-hidden="true">
                    <div
                        className="absolute inset-0 bg-gray-500 opacity-75"
                        onClick={() => {
                            if (props.preventCloseOnOutsideClick) return

                            props.onClose?.()
                        }}
                    />
                </div>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    {props.children}
                </div>

                <button
                    onClick={props.onClose}
                    className="absolute top-0 right-0 m-4">
                    <CgClose size={40} />
                </button>
            </div>
        </div>
    )
}
