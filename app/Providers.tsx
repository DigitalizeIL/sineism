"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import axios from "axios"
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"
import {
    PayPalScriptProvider,
    ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js"
import { UserProvider } from "@/app/(authentication)/context/UserProvider"

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_PREFIX

type ProvidersProps = {
    children: React.ReactNode
    session: Session | null
}

const initialOptions: ReactPayPalScriptOptions = {
    clientId: "test",
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
