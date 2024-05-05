import { JWT } from "next-auth/jwt"
import { NextRequest as OriginalNextRequest } from "next/server"

declare global {
    declare interface NextRequest extends OriginalNextRequest {
        userToken: JWT
    }
}
