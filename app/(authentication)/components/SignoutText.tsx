"use client"

import { signOut, useSession } from "next-auth/react"

import { TEXTS } from "@/app/(authentication)/authentication.texts"

export const SignoutText = () => {
    return (
        <span
            className="text-sm cursor-pointer text-slate-400 hover:text-slate-200 transition-all whitespace-nowrap"
            onClick={() => signOut({ callbackUrl: "/" })}>
            {TEXTS.signOut}
        </span>
    )
}
