"use client"

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import type {
    CreateOrderActions,
    CreateOrderData,
    OnApproveActions,
    OnApproveData,
} from "@paypal/paypal-js"
import { useState, useTransition } from "react"
import { useUser } from "@/app/(authentication)/context"
import { createOrder } from "@/app/(protected)/(payment)/(modules)/comments/actions/CreateOrder"

export const PaymentForm = () => {
    const [{ isPending }] = usePayPalScriptReducer()
    let [isTransitionPending, startTransition] = useTransition()
    const user = useUser()

    const [errorMessage, setErrorMessage] = useState<string>()

    const product = "Comments"
    const price = 0.1

    // creates a PayPal order
    const createPaypalOrder = async (
        data: CreateOrderData,
        actions: CreateOrderActions
    ) => {
        const order = await actions.order.create({
            purchase_units: [
                {
                    description: product,
                    amount: {
                        currency_code: "USD",
                        value: price.toString(),
                    },
                },
            ],
        })

        if (!order) {
            setErrorMessage("Something went wrong")
            return ""
        }

        return order
    }

    const onApprove = async (
        data: OnApproveData,
        actions: OnApproveActions
    ) => {
        const capture = await actions.order?.capture()

        if (capture) {
            const { payer, id, status } = capture

            if (status !== "COMPLETED") {
                console.log("CAPTURE", capture)
                return
            }

            executeOrder(id)
        }
    }

    const executeOrder = async (orderId: string) => {
        await createOrder(
            {
                price,
                product,
                orderId,
            },
            user.id
        )

        alert("Payment successful")
    }

    return (
        <>
            <PayPalButtons
                createOrder={createPaypalOrder}
                onApprove={onApprove}
                style={{
                    shape: "pill",
                    label: "buynow",
                    layout: "horizontal",
                    tagline: false,
                }}
            />
            {errorMessage && <p>{errorMessage}</p>}
        </>
    )
}
