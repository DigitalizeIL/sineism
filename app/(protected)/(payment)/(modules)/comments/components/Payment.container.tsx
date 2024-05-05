"use client"

import { BiComment } from "react-icons/bi"
import { PaymentModal } from "@/app/(protected)/(payment)/components/PaymentModal"
import { TEXTS } from "../commentsPayment.texts"
import { createOrder } from "../lib/createOrder.action"

export const CommentsPaymentContainer = (props: {
    userId: number
    amount: number
    price: number
}) => {
    const productName = TEXTS.productName.replace(
        "{{comment_number}}",
        props.amount.toString()
    )
    const productDescription = TEXTS.productDescription.replace(
        "{{comment_number}}",
        props.amount.toString()
    )
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
            product={productName}
            amount={props.amount}
            price={props.price}
            buttonContent={<BiComment />}
            productDescription={productDescription}
        />
    )
}
