"use client"

import type {
    CreateOrderActions,
    CreateOrderData,
    OnApproveActions,
    OnApproveData,
} from "@paypal/paypal-js"
import {
    PayPalButtons,
    PayPalButtonsComponentProps,
} from "@paypal/react-paypal-js"

import { PaymentProps } from "../lib/order.types"
import { useState } from "react"

export const PaymentForm = (props: PaymentProps) => {
    const [errorMessage, setErrorMessage] = useState<string>()

    const createPaypalOrder: PayPalButtonsComponentProps["createOrder"] =
        async (data, actions) => {
            try {
                const order = await actions.order.create({
                    intent: "CAPTURE",
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
                }

                return order
            } catch (error) {
                console.error(error)
                setErrorMessage("Something went wrong")
            }

            return ""
        }

    const onApprove: PayPalButtonsComponentProps["onApprove"] = async (
        data,
        actions
    ) => {
        try {
            const capture = await actions.order?.capture()

            if (!capture) {
                throw new Error("no capture")
            }

            const { id, status } = capture

            if (!id || status !== "COMPLETED") {
                console.error("CAPTURE", capture)
                throw new Error("bad capture")
            }

            await executeOrder(id)
        } catch (e) {
            setErrorMessage("Something went wrong")
        }
    }

    const executeOrder = async (orderId: string) => {
        const success = await props.createOrder(
            {
                product: props.product,
                orderId,
            },
            props.userId
        )

        if (success) {
            props.onSuccess()
        } else {
            props.onError?.()
        }
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
