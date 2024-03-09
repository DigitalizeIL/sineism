import { Card } from "@/components/Card"
import { DeletePostButton } from "@/app/(protected)/(posts)/components/DeletePostButton"
import { IPost } from "@/app/(protected)/(posts)/lib/interfaces/IPost"
import { PostCreateOrEditFormServer } from "@/app/(protected)/(posts)/components/PostCreateOrEditFormServer"
import { RatingContainer } from "@/app/(protected)/(posts)/(modules)/rating/components/RatingContainer"
import React from "react"
import { SaveBookmarkButtonContainer } from "@/app/(protected)/(posts)/(modules)/bookmark/components/SaveBookmarkButtonContainer"
import { USER_ROLES } from "@/app/(authentication)/lib/models/UserRole"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"

export const PostFeedItemSkelleton = async () => {
    const session = await getAppServerSession()

    return (
        <Card
            description=""
            className={
                "flex-col p-4 my-4 rounded shadow-md w-3/4 mx-auto relative"
            }
            title={
                <div className="flex flex-row justify-between items-center w-full mb-4">
                    <div className="flex items-center text-lg"></div>

                    <div className="flex flex-row justify-center w-full">
                        <h3 className="text-lg font-medium text-stone-900 self-center !mb-0"></h3>
                    </div>

                    <div className={"flex flex-row"}></div>
                </div>
            }
        />
    )
}
