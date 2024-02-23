export type CreateOrderFunction = (
    orderData: {
        product: string
        orderId: string
    },
    userId: number
) => Promise<boolean>

export type PaymentProps = {
    product: string
    price: number
    amount: number
    userId: number
    createOrder: CreateOrderFunction
}
