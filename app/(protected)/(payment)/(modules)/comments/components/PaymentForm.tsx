"use client"

import { usePayPalScriptReducer } from "@paypal/react-paypal-js"
import type {
    CreateOrderActions,
    CreateOrderData,
    OnApproveActions,
    OnApproveData,
} from "@paypal/paypal-js"
import { useEffect, useState, useTransition } from "react"
import { createOrder } from "@/app/(protected)/(payment)/(modules)/comments/actions/CreateOrder"
import { useUser } from "@/app/(authentication)/context"
import { Button } from "@/components/Button"

export const PaymentForm = () => {
    const [{ isPending }] = usePayPalScriptReducer()
    let [isTransitionPending, startTransition] = useTransition()
    const user = useUser()
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
    const [orderId, setOrderId] = useState<string>()

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

        console.log(order)

        if (!order) {
            setErrorMessage("Something went wrong")
            return ""
        }

        setOrderId(order)

        return order
    }

    const onApprove = async (
        data: OnApproveData,
        actions: OnApproveActions
    ) => {
        const capture = await actions.order?.capture()

        if (capture) {
            console.log("CAPTURE", capture)
            const { payer } = capture
            setSuccess(true)

            if (!orderId) return console.error("No order id!")

            await createOrder(
                {
                    price,
                    product,
                    orderId,
                },
                user.id
            )
        }
    }

    useEffect(() => {
        if (success) {
            alert("Payment successful!!")
            console.log("Order successful . Your order id is--", orderId)
        }
    }, [user, orderId, success])

    const demo = async () => {
        await createPaypalOrder(
            {
                paymentSource: "card",
            },
            {
                order: {
                    create: async (options) => {
                        return "OrderIDDD"
                    },
                },
            }
        )

        await onApprove(
            {
                facilitatorAccessToken: "asdads",
                orderID: "OrderIDDD",
            },
            {
                order: {
                    async capture() {
                        return {
                            payer: {
                                name: "Neri",
                            },
                            id: 123,
                            intent: "CAPTURE",
                        }
                    },
                },
            } as any
        )

        window.location = window.location
    }

    return (
        <Button onClick={demo}>Purchase</Button>
        // <PayPalButtons
        //     createOrder={createPaypalOrder}
        //     onApprove={onApprove}
        //     style={{
        //         shape: "pill",
        //         label: "buynow",
        //         layout: "horizontal",
        //         tagline: false,
        //     }}
        // />
    )
}
