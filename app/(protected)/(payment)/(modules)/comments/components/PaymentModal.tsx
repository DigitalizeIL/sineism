"use client"

import { usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { useState } from "react"
import { Modal } from "@/components/Modal"
import { Button } from "@/components/Button"
import { BiComment } from "react-icons/bi"
import { PaymentForm } from "@/app/(protected)/(payment)/(modules)/comments/components/PaymentForm"
import toast from "react-hot-toast"
import { LoadingDots } from "@/components/LoadingDots"

export const PaymentModal = (props: { price: number; amount: number }) => {
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
                    <h3>Buy Comments</h3>
                    <div className={"w-3/5 h-auto"}>
                        <PaymentForm
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
                onClick={() => setIsModalOpen(true)}>
                <BiComment />
            </Button>
        </div>
    )
}
