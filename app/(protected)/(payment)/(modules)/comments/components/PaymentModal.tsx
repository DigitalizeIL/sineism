"use client"

import { usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { useState } from "react"
import { Modal } from "@/components/Modal"
import { Button } from "@/components/Button"
import { BiComment } from "react-icons/bi"
import { PaymentForm } from "@/app/(protected)/(payment)/(modules)/comments/components/PaymentForm"

export const PaymentModal = () => {
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
                    <PaymentForm />
                </div>
            </Modal>
            <Button
                type={"ghost"}
                onClick={() => setIsModalOpen(true)}>
                <BiComment />
            </Button>
        </div>
    )
}
