"use client"

import { usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { useState } from "react"
import { Modal } from "@/components/Modal"
import { Button } from "@/components/Button"
import { BiComment } from "react-icons/bi"
import { PaymentForm } from "@/app/(protected)/(payment)/(modules)/comments/components/PaymentForm"

export const PaymentModal = (props: { price: number; amount: number }) => {
    const [{ isPending }] = usePayPalScriptReducer()

    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}>
                {isPending ? "Loading..." : null}
                <div className="flex flex-col space-y-2 gap-3 p-4">
                    <h3>Buy Comments</h3>
                    <PaymentForm
                        onSuccess={() => {
                            setIsModalOpen(false)
                            window.location.reload()
                        }}
                        price={props.price}
                        amount={props.amount}
                    />
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
