import { postsService } from "@/app/(protected)/(posts)/lib/services/PostsService"
import { NextApiRequest } from "next"
import { NextResponse } from "next/server"

type ContextWithParams = NextApiRequest & {
    params: {
        postId: number
    }
}

export const DELETE = async (req: Request, ctx: ContextWithParams) => {
    const id = Number(ctx.params.postId)

    await postsService.deletePost(id)

    return NextResponse.json({
        success: true,
    })
}

export const PATCH = async (req: Request, ctx: ContextWithParams) => {
    const id = Number(ctx.params.postId)

    const body = await req.json()

    const post = await postsService.updatePost(id, body)

    return NextResponse.json({
        success: true,
        post,
    })
}
