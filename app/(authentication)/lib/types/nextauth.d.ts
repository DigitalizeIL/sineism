import { UserRole } from "@/app/(authentication)/lib/models/UserRole"
import { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface User {
        role?: UserRole
        id: number
    }

    interface Session extends DefaultSession {
        user?: User
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: Role
        id: number
    }
}
