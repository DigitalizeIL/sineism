import { AuthPage } from "../../components/AuthForm/AuthPage"
import { SignInForm } from "@/app/(authentication)/components/AuthForm"

export default function LoginPage() {
    return (
        <AuthPage>
            <SignInForm />
        </AuthPage>
    )
}
