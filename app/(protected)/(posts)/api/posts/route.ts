import { postsService } from "@/app/(protected)/(posts)/lib/services/PostsService"
import { NextResponse } from "next/server"

export const GET = async () => {
    const posts = await postsService.getAllPosts()

    return NextResponse.json(posts)
}
