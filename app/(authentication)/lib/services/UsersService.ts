import {
    UsersDbRepository,
    usersDbRepository,
} from "@/app/(authentication)/lib/repositories/UsersDbRepository"

import { IUser } from "../interfaces/IUser"
import { User } from "@/app/(authentication)/lib/models/User"

export const createUsersService = (dbRepository: UsersDbRepository) => {
    const getAllUsers = async (): Promise<User[]> => {
        const users = await dbRepository.getUsers()

        return users.map((user: IUser) => User.fromJson(user))
    }

    const getUserById = async (id: number): Promise<User | null> => {
        const user = await dbRepository.getUserById(id)

        if (!user) return null

        return User.fromJson(user)
    }

    const getUserByEmail = async (email: string): Promise<User | null> => {
        const user = await dbRepository.getUserByEmail(email)

        if (!user) return null

        return User.fromJson(user)
    }

    const getCurrentUser = async (session: any): Promise<User | null> => {
        if (!session?.user?.email) return null

        return getUserByEmail(session.user.email)
    }

    const activateSubscription = async (userId: number) => {
        await dbRepository.activateSubscription(userId)
    }

    return {
        activateSubscription,
        getCurrentUser,
        getAllUsers,
        getUserById,
        getUserByEmail,
    }
}

export const usersService = createUsersService(usersDbRepository)
