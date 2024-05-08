"use client"

import { signOut, useSession } from "next-auth/react"

import { TEXTS } from "@/app/(authentication)/authentication.texts"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import { SignoutText } from "./SignoutText"

export default function AuthStatus() {
    const session = useSession()

    useEffect(() => {
        if (!session) redirect("/")
    }, [session])

    return (
        <div
            className={"text-end"}
            dir={"rtl"}>
            {session?.data?.user?.name ? (
                <>
                    <span className={"text-sm text-slate-500"}>
                        {TEXTS.usernamePrefix} {session.data.user.name}
                    </span>
                    <span className={"text-sm mx-2 text-slate-500"}>-</span>
                </>
            ) : null}
            <SignoutText />
        </div>
    )
}
