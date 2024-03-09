import {
    UsersDbRepository,
    usersDbRepository,
} from "@/app/(authentication)/lib/users.repository"

import { User } from "@/app/(authentication)/lib/user.model"

export class UsersService {
    constructor(public dbRepository: UsersDbRepository) {}
    getAllUsers = async (): Promise<User[]> => {
        const users = await this.dbRepository.getUsers()

        return users.map((user) => User.fromJson(user))
    }

    getUserById = async (id: number): Promise<User | null> => {
        const user = await this.dbRepository.getUserById(id)

        if (!user) return null

        return User.fromJson(user)
    }

    getUserByEmail = async (email: string): Promise<User | null> => {
        const user = await this.dbRepository.getUserByEmail(email)

        if (!user) return null

        return User.fromJson(user)
    }

    getCurrentUser = async (session: any): Promise<User | null> => {
        if (!session?.user?.email) return null

        return this.getUserByEmail(session.user.email)
    }

    activateSubscription = async (userId: number) => {
        await this.dbRepository.activateSubscription(userId)
    }
}

export const usersService = new UsersService(usersDbRepository)
