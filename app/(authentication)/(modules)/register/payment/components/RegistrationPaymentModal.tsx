"use client"

import { Button } from "@/app/_core/components/Button"
import { CreateOrderFunction } from "@/app/(protected)/(payment)/lib/order.types"
import { LOGIN_REDIRECT_URL } from "@/app/(authentication)/components/AuthForm/auth.consts"
import { PaymentModal } from "@/app/(protected)/(payment)/components/PaymentModal"
import { TEXTS } from "../register.texts"
import { createRegistrationOrder } from "../lib/createRegistrationOrder.action"

export const RegisterPaymentModal = (props: {
    price: number
    userId: number
    createOrder: CreateOrderFunction
}) => {
    const onSuccess = () => {
        window.location.pathname = LOGIN_REDIRECT_URL
    }

    return (
        <PaymentModal
            onSuccess={onSuccess}
            userId={props.userId}
            createOrder={createRegistrationOrder}
            title={TEXTS.title}
            product="Registration"
            amount={1}
            price={props.price}
            buttonProps={{
                type: "primary",
            }}
            buttonContent={TEXTS.completeRegistration}
        />
    )
}
