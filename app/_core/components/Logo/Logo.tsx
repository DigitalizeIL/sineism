import Image from "next/image";
import Link from "next/link";

export const Logo = (props: { isWhite?: true }) => {
    return <Link href="/">
        <Image
            src={props.isWhite ? "/logo-white.svg" : "/logo.svg"}
            priority
            alt="Logo"
            className="h-10 w-10"
            width={20}
            height={20}
        />
    </Link>
}