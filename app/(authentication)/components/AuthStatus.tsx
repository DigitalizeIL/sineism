"use client"

import { signOut, useSession } from "next-auth/react"

import { TEXTS } from "@/app/(authentication)/authentication.texts"
import { redirect } from "next/navigation"
import { useEffect } from "react"

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
            <span
                className="text-sm text-slate-400 hover:text-slate-200 transition-all whitespace-nowrap"
                onClick={() => signOut({ callbackUrl: "/" })}>
                {TEXTS.signOut}
            </span>
        </div>
    )
}
