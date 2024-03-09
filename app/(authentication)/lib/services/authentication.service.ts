import "server-only"

import { INewUser, IUser } from "@/app/(authentication)/lib/user.interface"
import {
    LoginCredentials,
    RegisterArgs,
} from "@/app/(authentication)/lib/types/authentication.types"
import {
    UsersDbRepository,
    usersDbRepository,
} from "@/app/(authentication)/lib/users.repository"

import { NoUserFoundError } from "@/app/(authentication)/lib/errors/NoUserFoundError"
import { PasswordsDontMatch } from "@/app/(authentication)/lib/errors/PasswordsDontMatch"
import { User } from "@/app/(authentication)/lib/user.model"
import { UserAlreadyExists } from "@/app/(authentication)/lib/errors/UserAlreadyExists"
import { UserRole } from "@/app/(authentication)/lib/types/userRole.types"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"

class AuthenticationService {
    constructor(public dbRepository: UsersDbRepository) {}

    authenticate = async (credentials: LoginCredentials) => {
        const { email, password } = credentials
        const user = await this.dbRepository.getUserByEmail(email)

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

    register = async (credentials: RegisterArgs) => {
        const user = await this.dbRepository.getUserByEmail(credentials.email)

        if (user) {
            throw new UserAlreadyExists()
        } else {
            let newUser: INewUser = {
                ...credentials,
                isSubscribed: false,
                role: UserRole.user,
            }

            if (process.env.ADMIN_EMAILS?.includes(credentials.email)) {
                newUser.role = UserRole.admin
                newUser.isSubscribed = true
            }

            return this.dbRepository.createUser(newUser, credentials)
        }
    }

    getCurrentUser = async () => {
        const session = await getAppServerSession()
        if (!session?.user?.email) return null

        return this.dbRepository.getUserByEmail(session.user.email)
    }
}

export const authenticationService = new AuthenticationService(
    usersDbRepository
)
