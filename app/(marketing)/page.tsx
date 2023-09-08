import Link from "next/link"
import {TEXTS} from "@/app/(marketing)/consts"
import {LOGIN_REDIRECT_URL} from "@/app/(authentication)/components/AuthForm/consts"
import {Logo} from "@/components/Logo";

export default function Page() {
    return (
        <div className="flex h-screen bg-black">
            <div className="w-screen h-screen flex flex-col gap-4 justify-center items-center">
                <Logo isWhite={true}/>

                <h1 className="text-4xl font-bold text-white">
                    {TEXTS.title}
                </h1>

                <div className="flex space-x-3">
                    <Link
                        href={LOGIN_REDIRECT_URL}
                        prefetch={false}
                        className="text-xl text-stone-400 underline hover:text-stone-200 transition-all">
                        {TEXTS.getStarted}
                    </Link>
                </div>
            </div>
        </div>
    )
}
