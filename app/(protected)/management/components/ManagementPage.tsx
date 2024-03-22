import { Button } from "@/app/_core/components/Button"
import { CategoryManagement } from "./CategoryManagement"
import { LOGIN_REDIRECT_URL } from "@/app/(authentication)/components/AuthForm/auth.consts"
import Link from "next/link"
import { ModalWithButton } from "@/components/Modal"
import { PostCreateOrEditFormContainer } from "@/app/(protected)/(posts)/components/PostCreateOrEditForm.container"
import { Settings } from "@/app/(protected)/(posts)/(modules)/settings/components/Settings"

export const ManagementPage = async () => {
    return (
        <>
            <h3 className="text-2xl font-bold">Actions</h3>
            <div className="flex flex-row gap-4">
                <PostCreateOrEditFormContainer />
                <Link
                    passHref
                    href={LOGIN_REDIRECT_URL}>
                    <Button type={"ghost"}>Go User Home</Button>
                </Link>
            </div>
            <h3 className="text-2xl font-bold">Settings</h3>
            <Settings />
            <h3 className="text-2xl font-bold">Categories</h3>
            <CategoryManagement />
        </>
    )
}
