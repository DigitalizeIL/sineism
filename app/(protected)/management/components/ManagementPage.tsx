import { CategoryManagement } from "./CategoryManagement"
import { CreateCategoryForm } from "@/app/(protected)/(posts)/(modules)/categories/components/CreateCategoryForm"
import { ModalWithButton } from "@/components/Modal"
import { PostCreateOrEditFormContainer } from "@/app/(protected)/(posts)/components/PostCreateOrEditForm.container"
import { Settings } from "@/app/(protected)/(posts)/(modules)/settings/components/Settings"

export const ManagementPage = async () => {
    return (
        <>
            <div className="flex justify-center mt-4">
                <PostCreateOrEditFormContainer />
                <ModalWithButton buttonText={"Create Category"}>
                    <CreateCategoryForm />
                </ModalWithButton>
                <Settings />
            </div>
            <h3 className="text-2xl font-bold">Categories</h3>
            <CategoryManagement />
        </>
    )
}
