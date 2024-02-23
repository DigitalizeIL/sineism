"use client"

import { BiComment } from "react-icons/bi"
import { PaymentModal } from "@/app/(protected)/(payment)/(modules)/comments/components/PaymentModal"
import { TEXTS } from "./texts"
import { createOrder } from "../actions/CreateOrder"

export const PaymentContainer = (props: {
    userId: number
    amount: number
    price: number
}) => {
    return (
        <PaymentModal
            onSuccess={() => {
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            }}
            userId={props.userId}
            createOrder={createOrder}
            title={TEXTS.buyComments}
            product="Comments"
            amount={props.amount}
            price={props.price}
            buttonContent={<BiComment />}
        />
    )
}
