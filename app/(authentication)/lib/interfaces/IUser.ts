import { UserRole } from "@/app/(authentication)/lib/models/UserRole"

export interface IUser {
    id: number
    email: string
    name: string
    password?: string
    created_at?: Date
    updated_at?: Date
    role?: UserRole
}
