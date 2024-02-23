"use client"

import { Button, ButtonProps } from "@/components/Button"
import { ReactNode, useState } from "react"

import { BiComment } from "react-icons/bi"
import { LoadingDots } from "@/components/LoadingDots"
import { Modal } from "@/components/Modal"
import { PaymentForm } from "@/app/(protected)/(payment)/(modules)/comments/components/PaymentForm"
import { PaymentProps } from "../../../lib/types"
import toast from "react-hot-toast"
import { usePayPalScriptReducer } from "@paypal/react-paypal-js"

export const PaymentModal = (
    props: {
        title: string
        buttonContent: ReactNode
        buttonProps?: Omit<ButtonProps, "children">
    } & PaymentProps
) => {
    const [{ isPending }] = usePayPalScriptReducer()

    const [isModalOpen, setIsModalOpen] = useState(false)

    const onSuccess = () => {
        setIsModalOpen(false)
        toast.success("Payment received")

        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }

    return (
        <div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}>
                {isPending ? <LoadingDots /> : null}
                <div className="flex flex-col items-center justify-center space-y-2 gap-3 p-4">
                    <h3>{props.title}</h3>
                    <div className={"w-3/5 h-auto"}>
                        <PaymentForm
                            createOrder={props.createOrder}
                            product={props.product}
                            onSuccess={onSuccess}
                            price={props.price}
                            amount={props.amount}
                        />
                    </div>
                </div>
            </Modal>
            <Button
                type={"ghost"}
                className="bg-blue-500 hover:bg-blue-600"
                {...props.buttonProps}
                onClick={() => setIsModalOpen(true)}>
                {props.buttonContent}
            </Button>
        </div>
    )
}
