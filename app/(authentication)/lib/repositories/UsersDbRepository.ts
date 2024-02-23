import "server-only"

import { INewUser, IUser } from "@/app/(authentication)/lib/interfaces/IUser"

import { LoginCredentials } from "@/app/(authentication)/lib/types/AuthenticationTypes"
import { User } from "@/app/(authentication)/lib/models/User"
import prisma from "@/app/_core/lib/prisma"

export class UsersDbRepository {
    getUsers() {
        return prisma.user.findMany()
    }

    getUserByEmail(email: string) {
        return prisma.user.findUnique({
            where: {
                email,
            },
        })
    }

    getUserById(id: number) {
        return prisma.user.findUnique({
            where: {
                id,
            },
        })
    }

    async createUser(user: INewUser, credentials: LoginCredentials) {
        const password = await User.hashPassword(credentials.password)

        return await prisma.user.create({
            data: {
                ...user,
                password,
            },
        })
    }

    activateSubscription(userId: number) {
        return prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                isSubscribed: true,
            },
        })
    }
}

export const usersDbRepository = new UsersDbRepository()
