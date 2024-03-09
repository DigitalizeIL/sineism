import { User } from "@/app/(authentication)/lib/user.model"

export type LoginCredentials = {
    email: string
    password: string
}

export type RegisterArgs = Pick<User, "name"> & LoginCredentials
