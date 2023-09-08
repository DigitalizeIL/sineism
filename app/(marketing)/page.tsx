import Link from "next/link"
import { TEXTS } from "@/app/(marketing)/consts"
import { LOGIN_REDIRECT_URL } from "@/app/(authentication)/components/AuthForm/consts"
import { Logo } from "@/components/Logo"
import { USER_ROLES } from "@/app/(authentication)/lib/models/UserRole"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"

export default async function Page() {
    const session = await getAppServerSession()

    return (
        <div className="flex h-screen bg-black">
            <div className="w-screen h-screen flex flex-col gap-4 justify-center items-center">
                <Logo isWhite={true} />

                <h1 className="text-4xl font-bold text-white">{TEXTS.title}</h1>

                <div className="flex space-x-3">
                    <Link
                        href={LOGIN_REDIRECT_URL}
                        prefetch={false}
                        className="text-xl text-stone-400 underline hover:text-stone-200 transition-all">
                        {TEXTS.getStarted}
                    </Link>
                    {session?.user?.role === USER_ROLES.admin ? (
                        <Link
                            href={"/posts"}
                            prefetch={false}
                            className="text-xl text-stone-400 underline hover:text-stone-200 transition-all">
                            {TEXTS.admin}
                        </Link>
                    ) : null}
                </div>
            </div>
        </div>
    )
}
