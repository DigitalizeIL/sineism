import { authenticationService } from "@/app/(authentication)/lib/services/AuthenticationService"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                return authenticationService.authenticate({
                    email: credentials.email,
                    password: credentials.password,
                })
            },
        }),
    ],
}
