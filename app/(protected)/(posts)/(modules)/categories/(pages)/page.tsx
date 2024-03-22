import { CategoriesPage } from "../components/CategoriesPage"
import { LoadingDots } from "@/app/_core/components/LoadingDots"
import { Suspense } from "react"

export default function page() {
    return (
        <Suspense fallback={<LoadingDots />}>
            <CategoriesPage />
        </Suspense>
    )
}
