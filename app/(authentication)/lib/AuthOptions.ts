import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"
import { authenticationService } from "@/app/(authentication)/lib/services/authentication.service"

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
                }) as any
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = Number(user.id)
                token.role = user.role
            }

            return token
        },
        session: async ({ session, token }) => {
            if (session.user) {
                session.user.id = token.id
                session.user.role = token.role
            }

            return session
        },
    },
}
