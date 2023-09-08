import { postsService } from "@/app/(posts)/lib/services/PostsService"
import { NextResponse } from "next/server"

export const GET = async () => {
    const posts = await postsService.getAllPosts()

    return NextResponse.json(posts)
}
