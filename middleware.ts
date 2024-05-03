import { UserRole } from "@/app/(authentication)/lib/types/userRole.types"
import { withAuth } from "next-auth/middleware"

if (!process.env.NEXTAUTH_SECRET)
    throw new Error("NEXTAUTH_SECRET is not defined")

export default withAuth({
    pages: {
        signIn: "/login",
        newUser: "/register",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        authorized: ({ req, token }) => {
            const path = new URL(req.url).pathname

            // @ts-ignore
            req.userToken = token

            switch (path) {
                case "/posts":
                case "/management":
                    return token?.role === UserRole.admin
                default:
                    return !!token
            }
        },
    },
})

export const config = {
    matcher: ["/posts", "/categories/:categoryId*", "/management"],
}
