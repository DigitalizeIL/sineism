import {
    AuthenticationService,
    createAuthenticationService,
} from "./authentication.service"

import { User } from "@/app/(authentication)/lib/user.model"
import { UsersDbRepository } from "@/app/(authentication)/lib/users.repository"

describe("AuthenticationService", () => {
    const userPassword = "password"
    const user = new User(0, "John Doe", "john@gmail.com", userPassword)
    const usersDbRepository: UsersDbRepository = {
        getUserByEmail: jest.fn(),
        createUser: jest.fn(),
        getUsers: jest.fn(),
        getUserById: jest.fn(),
    }

    xit("should register", () => {
        usersDbRepository.getUserByEmail = jest.fn().mockResolvedValue(null)
        const service = createAuthenticationService({
            dbRepository: usersDbRepository,
        })

        service.register({
            name: user.name,
            email: user.email,
            password: userPassword,
        })
        expect(usersDbRepository.createUser).toHaveBeenCalled()
    })
})
