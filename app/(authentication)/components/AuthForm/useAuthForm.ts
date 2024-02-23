import {
    LOGIN_REDIRECT_URL,
    LOGIN_URL,
    REGISTER_API_URL,
    TEXTS,
} from "@/app/(authentication)/components/AuthForm/consts"
import {
    LoginCredentials,
    RegisterArgs,
} from "@/app/(authentication)/lib/types/AuthenticationTypes"

import { signIn as NextSignIt } from "next-auth/react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const useAuthForm = () => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const errorHandler = (error: string) => {
        toast.error(error)
    }

    const signIn = async (credentials: LoginCredentials) => {
        setLoading(true)

        try {
            const res = await NextSignIt("credentials", {
                ...credentials,
                redirect: false,
                callbackUrl: LOGIN_REDIRECT_URL,
            })

            if (!res || res?.error) {
                return errorHandler(
                    res?.error || "There was an error logging in"
                )
            }

            router.refresh()
            router.push(LOGIN_REDIRECT_URL)
        } catch (error: any) {
            errorHandler(error.message)
        } finally {
            setLoading(false)
        }
    }

    const signUp = async (registerData: RegisterArgs) => {
        setLoading(true)

        try {
            const res = await fetch(REGISTER_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registerData),
            })

            if (res.status !== 200) {
                const { error } = await res.json()
                return errorHandler(error)
            }

            toast.success(TEXTS.accountCreated)
            
            setTimeout(() => {
                router.push(LOGIN_URL)
            }, 1000)
        } catch (error: any) {
            errorHandler(error.message)
        } finally {
            setLoading(false)
        }
    }

    return {
        loading,
        signIn,
        signUp,
        errorHandler,
    }
}
