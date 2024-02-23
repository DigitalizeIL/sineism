import { Logo } from "@/components/Logo"
import { ReactNode } from "react"

export const AuthPage = ({
    children,
    title,
    description,
}: {
    children: ReactNode
    title: string
    description: string
}) => {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
            <div className="backdrop-blur bg-login-image bg-no-repeat bg-center z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
                <div className="flex flex-col items-center justify-center space-y-3 px-4 py-6 pt-8 text-center sm:px-16">
                    <Logo />

                    <h3 className="text-xl font-semibold">{title}</h3>
                    <p className="text-sm">{description}</p>
                </div>
                {children}
            </div>
        </div>
    )
}
