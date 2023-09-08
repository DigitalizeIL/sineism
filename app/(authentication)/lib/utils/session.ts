import { getServerSession } from "next-auth"
import { authOptions } from "@/app/(authentication)/lib/AuthOptions"

export const getAppServerSession = () => {
    return getServerSession(authOptions)
}
