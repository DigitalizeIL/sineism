"use client"

import type {
    CreateOrderActions,
    CreateOrderData,
    OnApproveActions,
    OnApproveData,
} from "@paypal/paypal-js"

import { PayPalButtons } from "@paypal/react-paypal-js"
import { PaymentProps } from "../../../lib/types"
import { useState } from "react"
import { useUser } from "@/app/(authentication)/context"

export const PaymentForm = (
    props: {
        onSuccess: () => void
    } & PaymentProps
) => {
    const [errorMessage, setErrorMessage] = useState<string>()

    // creates a PayPal order
    const createPaypalOrder = async (
        data: CreateOrderData,
        actions: CreateOrderActions
    ) => {
        const order = await actions.order.create({
            purchase_units: [
                {
                    description: props.product,
                    amount: {
                        currency_code: "USD",
                        value: props.price.toString(),
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

            await executeOrder(id)
        }
    }

    const executeOrder = async (orderId: string) => {
        await props.createOrder(
            {
                product: props.product,
                orderId,
            },
            props.userId
        )

        props.onSuccess()
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
