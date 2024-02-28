"use client"

import {
    PayPalScriptProvider,
    ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import React from "react"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import axios from "axios"

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_PREFIX

type ProvidersProps = {
    children: React.ReactNode
    session: Session | null
}

const initialOptions: ReactPayPalScriptOptions = {
    clientId:
        "AdszmSp9iVcX6btzBfXxBOTCuhQa8arlHJbY9kjSUzuZkh1iLRVhiqHimVAL-ZmCnYDvTL6wspu1u_zW",
    currency: "USD",
    intent: "capture",
}

export const Providers = ({ children, session }: ProvidersProps) => {
    const [queryClient] = React.useState(() => new QueryClient())

    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
                <PayPalScriptProvider options={initialOptions}>
                    {children}
                </PayPalScriptProvider>
            </QueryClientProvider>
        </SessionProvider>
    )
}
