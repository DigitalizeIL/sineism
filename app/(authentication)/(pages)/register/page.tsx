import { AuthPage } from "../../components/AuthForm/AuthPage"
import { SignUpForm } from "@/app/(authentication)/components/AuthForm"

export default function RegisterPage() {
    return (
        <AuthPage
            title="Sign Up"
            description="Create an account">
            <SignUpForm />
        </AuthPage>
    )
}
