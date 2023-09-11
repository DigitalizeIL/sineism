import { User } from "@/app/(authentication)/lib/models/User"
import {
    usersDbRepository,
    UsersDbRepository,
} from "@/app/(authentication)/lib/repositories/UsersDbRepository"
import { getServerSession } from "next-auth"

export interface UsersService {
    getAllUsers(): Promise<User[]>

    getUserById(id: number): Promise<User | null>

    getUserByEmail(email: string): Promise<User | null>

    getCurrentUser(): Promise<User | null>
}

export interface UsersServiceDependencies {
    dbRepository: UsersDbRepository
}

export const createUsersService = (
    dependencies: UsersServiceDependencies
): UsersService => {
    const getAllUsers = async (): Promise<User[]> => {
        const users = await dependencies.dbRepository.getUsers()

        return users.map((user) => User.fromJson(user))
    }

    const getUserById = async (id: number): Promise<User | null> => {
        const user = await dependencies.dbRepository.getUserById(id)

        if (!user) return null

        return User.fromJson(user)
    }

    const getUserByEmail = async (email: string): Promise<User | null> => {
        const user = await dependencies.dbRepository.getUserByEmail(email)

        if (!user) return null

        return User.fromJson(user)
    }

    const getCurrentUser = async (): Promise<User | null> => {
        const session = await getServerSession()

        if (!session?.user?.email) return null

        return getUserByEmail(session.user.email)
    }

    return {
        getCurrentUser,
        getAllUsers,
        getUserById,
        getUserByEmail,
    }
}

export const usersService = createUsersService({
    dbRepository: usersDbRepository,
})
