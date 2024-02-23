"use client"

import { Button } from "@/app/_core/components/Button"
import { LOGIN_REDIRECT_URL } from "@/app/(authentication)/components/AuthForm/consts"
import { TEXTS } from "../texts"

export const CompleteRegistrationButton = () => (
    <Button
        onClick={() => {
            window.location.pathname = LOGIN_REDIRECT_URL
        }}>
        {TEXTS.completeRegistration}
    </Button>
)
