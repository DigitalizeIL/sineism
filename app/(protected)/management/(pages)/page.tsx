import { LoadingDots } from "@/app/_core/components/LoadingDots"
import { ManagementPage } from "../components/ManagementPage"
import { Suspense } from "react"

export default async function page() {
    return (
        <div className="w-screen h-screen p-10 flex flex-col space-y-5 justify-start items-center">
            <h2 className="text-4xl font-bold">Admin Only Page</h2>
            <Suspense fallback={<LoadingDots />}>
                <ManagementPage />
            </Suspense>
        </div>
    )
}
