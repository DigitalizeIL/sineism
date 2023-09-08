"use client"

import { Button } from "@/components/Button"
import { ReactNode, useEffect, useState } from "react"
import { Modal } from "@/components/Modal/Modal"

export const ModalWithButton = (props: {
    children: ReactNode
    buttonText: string
    isOpen?: boolean
}) => {
    const [isOpen, setIsOpen] = useState(props.isOpen || false)

    useEffect(() => {
        setIsOpen(!!props.isOpen)
    }, [props.isOpen])

    return (
        <div>
            <Button
                onClick={() => setIsOpen(true)}
                type="ghost"
                className={"text-3xl text-black"}>
                {props.buttonText}
            </Button>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}>
                {props.children}
            </Modal>
        </div>
    )
}
