import { withAuth } from "next-auth/middleware"
import { USER_ROLES } from "@/app/(authentication)/lib/models/UserRole"

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

            switch (path) {
                case "/management":
                    return token?.role === USER_ROLES.admin
                default:
                    return !!token
            }
        },
    },
})

export const config = {
    matcher: ["/posts", "/management"],
}
