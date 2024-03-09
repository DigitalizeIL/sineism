import { NextResponse } from "next/server"
import { RegisterArgs } from "@/app/(authentication)/lib/types/authentication.types"
import { UserAlreadyExists } from "@/app/(authentication)/lib/errors/UserAlreadyExists"
import { authenticationService } from "@/app/(authentication)/lib/services/authentication.service"

export async function POST(req: Request) {
    const registerData: RegisterArgs = await req.json()

    try {
        const user = await authenticationService.register(registerData)

        return NextResponse.json(user)
    } catch (e) {
        if (e instanceof UserAlreadyExists) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            )
        }

        console.error(e)

        return NextResponse.json({ error: "Unhandled error" }, { status: 500 })
    }
}
