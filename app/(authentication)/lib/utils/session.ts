import { getServerSession } from "next-auth"
import { authOptions } from "@/app/(authentication)/lib/AuthOptions"
import { Session } from "next-auth"

type NonNullableSession = Session & { user: NonNullable<Session["user"]> }

export const getAppServerSession = async <T extends boolean>(
    userHasToBeLoggedIn?: T
): Promise<T extends true ? NonNullableSession : Session | null> => {
    const session = await getServerSession(authOptions)

    if (userHasToBeLoggedIn) {
        if (!session?.user) {
            throw new Error("User must be logged in")
        }

        return session as NonNullableSession
    }

    return session as any
}
