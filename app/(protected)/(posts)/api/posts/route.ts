import { NextResponse } from "next/server"
import { postsService } from "@/app/(protected)/(posts)/lib/posts.service"

export const GET = async () => {
    const posts = await postsService.getAllPosts()

    return NextResponse.json(posts)
}
