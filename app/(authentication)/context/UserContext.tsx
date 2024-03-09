import { createContext, useContext } from "react"

import { IUser } from "@/app/(authentication)/lib/user.interface"

export type UserContextType = {
    user: IUser
    isAdmin: boolean
    isUser: boolean
    isGuest: boolean
}

export const UserContext = createContext<UserContextType>({} as UserContextType)

export const useUser = () => {
    const { user } = useContext(UserContext)

    return user
}

export const useUserRole = () => {
    const { isUser, isGuest, isAdmin } = useContext(UserContext)

    return {
        isUser,
        isGuest,
        isAdmin,
    }
}
