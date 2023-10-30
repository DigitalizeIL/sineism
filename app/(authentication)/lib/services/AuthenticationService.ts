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
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"
import { INewUser, IUser } from "@/app/(authentication)/lib/interfaces/IUser"

export type AuthenticationServiceDependencies = {
    dbRepository: UsersDbRepository
}

export interface AuthenticationService {
    authenticate: (credentials: LoginCredentials) => Promise<IUser>
    register: (user: RegisterArgs) => Promise<IUser | null>
    getCurrentUser: () => Promise<IUser | null>
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

        const passwordMatches =
            await User.fromJson(user).comparePassword(password)

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
            let newUser: INewUser = {
                ...credentials,
                role: USER_ROLES.user,
            }

            if (process.env.ADMIN_EMAILS?.indexOf(credentials.email) !== -1)
                newUser.role = USER_ROLES.admin

            return dependencies.dbRepository.createUser(newUser, credentials)
        }
    }

    const getCurrentUser = async () => {
        const session = await getAppServerSession()
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
