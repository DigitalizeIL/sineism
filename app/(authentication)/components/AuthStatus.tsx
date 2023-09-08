"use client"
import { signOut, useSession } from "next-auth/react"
import { TEXTS } from "@/app/(authentication)/components/consts"
import { useEffect } from "react"
import { redirect } from "next/navigation"

export default function AuthStatus() {
    const session = useSession()

    useEffect(() => {
        if (!session) redirect("/")
    }, [session])

    return (
        <div className={"flex items-center"}>
            {session?.data?.user?.name ? (
                <>
                    <span className={"text-sm me-2 text-slate-500"}>
                        {TEXTS.usernamePrefix} {session.data.user.name}
                    </span>
                    <span className={"text-sm me-2 text-slate-500"}>-</span>
                </>
            ) : null}
            <button
                className="text-sm text-slate-400 hover:text-slate-200 transition-all"
                onClick={() => signOut({ callbackUrl: "/" })}>
                {TEXTS.signOut}
            </button>
        </div>
    )
}
