import "server-only"

import {
    usersDbRepository,
    UsersDbRepository,
} from "@/app/(authentication)/lib/repositories/UsersDbRepository"
import { NoUserFoundError } from "@/app/(authentication)/lib/errors/NoUserFoundError"
import { PasswordsDontMatch } from "@/app/(authentication)/lib/errors/PasswordsDontMatch"
import { User } from "@/app/(authentication)/lib/models/User"
import {
    LoginCredentials,
    RegisterArgs,
} from "@/app/(authentication)/lib/types/AuthenticationTypes"
import { UserAlreadyExists } from "@/app/(authentication)/lib/errors/UserAlreadyExists"
import { USER_ROLES } from "@/app/(authentication)/lib/models/UserRole"
import { getServerSession } from "next-auth"

export type AuthenticationServiceDependencies = {
    dbRepository: UsersDbRepository
}

export interface AuthenticationService {
    authenticate: (credentials: LoginCredentials) => Promise<User>
    register: (user: RegisterArgs) => Promise<User | null>
    getCurrentUser: () => Promise<User | null>
}

export const createAuthenticationService = (
    dependencies: AuthenticationServiceDependencies
): AuthenticationService => {
    const authenticate = async (credentials: LoginCredentials) => {
        const { email, password } = credentials
        const user = await dependencies.dbRepository.getUserByEmail(email)

        if (!user) {
            throw new NoUserFoundError()
        }

        const passwordMatches = await user.comparePassword(password)
        if (!passwordMatches) {
            throw new PasswordsDontMatch()
        }

        return user
    }

    const register = async (credentials: RegisterArgs) => {
        const user = await dependencies.dbRepository.getUserByEmail(
            credentials.email
        )

        if (user) {
            throw new UserAlreadyExists()
        } else {
            let newUser = User.fromJson(credentials)

            if (process.env.ADMIN_EMAILS?.indexOf(credentials.email) !== -1)
                newUser.role = USER_ROLES.admin

            return dependencies.dbRepository.createUser(
                User.fromJson(newUser),
                credentials
            )
        }
    }

    const getCurrentUser = async () => {
        const session = await getServerSession()
        if (!session?.user?.email) return null

        return await dependencies.dbRepository.getUserByEmail(
            session.user.email
        )
    }

    return {
        authenticate,
        register,

        getCurrentUser,
    }
}

export const authenticationService = createAuthenticationService({
    dbRepository: usersDbRepository,
})
