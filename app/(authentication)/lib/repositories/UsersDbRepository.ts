import "server-only"

import { User } from "@/app/(authentication)/lib/models/User"
import prisma from "@/app/_core/lib/prisma"
import { LoginCredentials } from "@/app/(authentication)/lib/types/AuthenticationTypes"
import { INewUser, IUser } from "@/app/(authentication)/lib/interfaces/IUser"

export interface UsersDbRepository {
    getUsers: () => Promise<IUser[]>
    getUserByEmail: (email: string) => Promise<IUser | null>
    getUserById: (id: number) => Promise<IUser | null>
    createUser: (
        user: INewUser,
        credentials: LoginCredentials
    ) => Promise<IUser | null>
}

export const createUsersDbRepository = (): UsersDbRepository => {
    const getUsers = async () => {
        return prisma.user.findMany()
    }

    const getUserByEmail = async (email: string) => {
        return await prisma.user.findUnique({
            where: {
                email,
            },
        })
    }

    const getUserById = async (id: number) => {
        return await prisma.user.findUnique({
            where: {
                id,
            },
        })
    }

    const createUser = async (
        user: INewUser,
        credentials: LoginCredentials
    ) => {
        const password = await User.hashPassword(credentials.password)
        console.log(user)

        return await prisma.user.create({
            data: {
                ...user,
                password,
            },
        })
    }

    return {
        getUserById,
        getUsers,
        getUserByEmail,
        createUser,
    }
}

export const usersDbRepository = createUsersDbRepository()
