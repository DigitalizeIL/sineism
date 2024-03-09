import { UserRole } from "@/app/(authentication)/lib/types/userRole.types"

export interface IUser {
    id: number
    email: string
    name: string
    password?: string
    created_at?: Date
    updated_at?: Date
    role?: UserRole
    isSubscribed: boolean
}

export type INewUser = Omit<IUser, "id">
