"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import axios from "axios"
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_PREFIX

type ProvidersProps = {
    children: React.ReactNode
    session: Session | null
}

export const Providers = ({ children, session }: ProvidersProps) => {
    const [queryClient] = React.useState(() => new QueryClient())

    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </SessionProvider>
    )
}
