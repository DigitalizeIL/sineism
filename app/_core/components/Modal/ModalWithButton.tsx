"use client"

import { Button } from "@/components/Button"
import { ReactNode, useEffect, useState } from "react"
import { Modal } from "@/components/Modal/Modal"

export const ModalWithButton = (props: {
    children: ReactNode
    buttonText: ReactNode
    isOpen?: boolean
    onClose?: () => void
    onOpen?: () => void
    className?: string
}) => {
    const [isOpen, setIsOpen] = useState(props.isOpen || false)

    useEffect(() => {
        setIsOpen(!!props.isOpen)
    }, [props.isOpen])

    const close = () => {
        props.onClose?.()
        setIsOpen(false)
    }

    const open = () => {
        props.onOpen?.()
        setIsOpen(true)
    }

    return (
        <div className={props.className}>
            <Button
                onClick={open}
                type="ghost"
                className={"text-3xl text-black"}>
                {props.buttonText}
            </Button>

            <Modal
                isOpen={isOpen}
                onClose={close}>
                {props.children}
            </Modal>
        </div>
    )
}
