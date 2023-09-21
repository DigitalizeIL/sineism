"use client"

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { useEffect, useState, useTransition } from "react"
import {
    CreateOrderActions,
    CreateOrderData,
    OnApproveActions,
    OnApproveData,
} from "@paypal/paypal-js"

export const PaymentForm = () => {
    const [{ isPending }] = usePayPalScriptReducer()
    let [isTransitionPending, startTransition] = useTransition()

    // const onApprove = async (
    //     data: OnApproveData,
    //     actions: OnApproveActions
    // ) => {
    //     console.log("onApprove")
    //     startTransition(() => {
    //         createOrder(data)
    //     })
    // }

    const [success, setSuccess] = useState(false)
    const [ErrorMessage, setErrorMessage] = useState("")
    const [orderID, setOrderID] = useState<string>()

    // creates a paypal order
    const createOrder = async (
        data: CreateOrderData,
        actions: CreateOrderActions
    ) => {
        const order = await actions.order.create({
            purchase_units: [
                {
                    description: "Comments",
                    amount: {
                        currency_code: "USD",
                        value: "0.01",
                    },
                },
            ],
        })

        console.log(order)

        if (!order) {
            setErrorMessage("Something went wrong")
            return ""
        }

        setOrderID(order)

        return order
    }

    const onApprove = async (
        data: OnApproveData,
        actions: OnApproveActions
    ) => {
        const capture = await actions.order?.capture()

        if (capture) {
            console.log(capture)
            const { payer } = capture
            setSuccess(true)
        }
    }

    useEffect(() => {
        if (success) {
            alert("Payment successful!!")
            console.log("Order successful . Your order id is--", orderID)
        }
    }, [orderID, success])

    return (
        <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
            style={{
                shape: "pill",
                label: "buynow",
                layout: "horizontal",
                tagline: false,
            }}
        />
    )
}
