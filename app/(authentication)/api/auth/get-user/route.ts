import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"

export const GET = async (req: NextRequest) => {
    const session = await getAppServerSession()

    const url = new URL(req.url)

    const email = url.searchParams.get("email")

    if (!email)
        return NextResponse.json(
            {
                error: "No email provided",
            },
            {
                status: 400,
            }
        )

    if (!session?.user?.email || session.user.email !== email)
        return NextResponse.json(
            {
                error: "Invalid session",
            },
            {
                status: 401,
            }
        )

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
    })

    return NextResponse.json({
        ...user,
        password: undefined,
    })
}
