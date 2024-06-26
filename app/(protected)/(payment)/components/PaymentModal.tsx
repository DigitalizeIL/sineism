"use client"

import { Button, ButtonProps } from "@/components/Button"
import { ReactNode, useState } from "react"

import { LoadingDots } from "@/components/LoadingDots"
import { Modal } from "@/components/Modal"
import { PaymentForm } from "@/app/(protected)/(payment)/components/PaymentForm"
import { PaymentProps } from "../lib/order.types"
import toast from "react-hot-toast"
import { usePayPalScriptReducer } from "@paypal/react-paypal-js"

export const PaymentModal = (
    props: {
        title: string
        productDescription?: ReactNode
        buttonContent: ReactNode
        buttonProps?: Omit<ButtonProps, "children">
    } & PaymentProps
) => {
    const [{ isPending }] = usePayPalScriptReducer()

    const [isModalOpen, setIsModalOpen] = useState(false)

    const onSuccess = () => {
        setIsModalOpen(false)
        toast.success("Payment received")

        props.onSuccess()
    }

    const onError = () => {
        setIsModalOpen(false)
        toast.error(
            "We had a problem processing your payment, please contact the site support"
        )

        props.onError?.()
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
                            onError={onError}
                            userId={props.userId}
                            createOrder={props.createOrder}
                            product={props.product}
                            onSuccess={onSuccess}
                            price={props.price}
                            amount={props.amount}
                        />
                    </div>
                    <p>{props.productDescription}</p>
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
