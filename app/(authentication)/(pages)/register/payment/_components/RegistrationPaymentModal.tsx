"use client"

import { Button } from "@/app/_core/components/Button"
import { LOGIN_REDIRECT_URL } from "@/app/(authentication)/components/AuthForm/consts"
import { PaymentModal } from "@/app/(protected)/(payment)/(modules)/comments/components/PaymentModal"
import { TEXTS } from "../texts"
import { createRegistrationOrder } from "../_actions/createRegistrationOrder"

export const RegisterPaymentModal = (props: {
    price: number
    userId: number
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
