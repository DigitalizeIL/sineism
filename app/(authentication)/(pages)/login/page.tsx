import { AuthForm } from "@/app/(authentication)/components/AuthForm"
import { Logo } from "@/components/Logo"

export default function LoginPage() {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
            <div className="backdrop-blur bg-login-image bg-no-repeat bg-center z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
                <div className="flex flex-col items-center mb-16 justify-center space-y-3 px-4 py-8 pt-8 text-center sm:px-16">
                    <Logo />
                    <h3 className="text-xl font-semibold">Sign In</h3>
                    <p className="text-sm">
                        Use your email and password to sign in
                    </p>
                </div>
                <AuthForm type="login" />
            </div>
        </div>
    )
}
