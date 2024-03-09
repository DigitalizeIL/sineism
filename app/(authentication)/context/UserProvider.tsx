"use client"

import {
    GET_USER_API_URL,
    REGISTER_PAYMENT_URL,
    REGISTER_URL,
} from "../components/AuthForm/auth.consts"
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react"

import { IUser } from "@/app/(authentication)/lib/user.interface"
import { LoadingDotsOverlay } from "@/components/LoadingDots"
import { UserContext } from "@/app/(authentication)/context/UserContext"
import { UserRole } from "@/app/(authentication)/lib/types/userRole.types"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export const UserProvider = (props: {
    children: ReactNode
    isPaymentRequired: boolean
}) => {
    const { data } = useSession()

    const [user, setUser] = useState<IUser>()
    const router = useRouter()

    const getUser = useCallback(async () => {
        if (!data?.user) return

        const res = await axios.get(
            `${GET_USER_API_URL}?email=${data.user.email}`
        )

        if (res.data === null) {
            return router.push(REGISTER_URL)
        } else if (!res.data.isSubscribed && props.isPaymentRequired) {
            return router.push(REGISTER_PAYMENT_URL)
        }

        setUser(res.data)
    }, [data?.user, router, props.isPaymentRequired])

    useEffect(() => {
        getUser()
    }, [getUser])

    const isAdmin = useMemo(() => user?.role === UserRole.admin, [user?.role])
    const isUser = useMemo(() => user?.role === UserRole.user, [user?.role])
    const isGuest = useMemo(() => user?.role === UserRole.guest, [user?.role])

    if (!user) {
        return <LoadingDotsOverlay />
    }

    if (!user.isSubscribed && props.isPaymentRequired) {
        return <div>You are not authorized to view this page</div>
    }

    return (
        <>
            <UserContext.Provider
                value={{
                    user,
                    isAdmin,
                    isUser,
                    isGuest,
                }}>
                {props.children}
            </UserContext.Provider>
        </>
    )
}
