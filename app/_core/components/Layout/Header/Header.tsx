import React from "react"
import Styles from "./Header.module.css"
import Link from "next/link"
import clsx from "clsx"
import { LINKS } from "@/components/Layout/Header/consts"
import AuthStatus from "@/app/(authentication)/components/AuthStatus"
import { Logo } from "@/components/Logo"

export const Header = () => {
    const pathname = "disabled"

    return (
        <div
            className={
                "flex justify-between items-center p-4 bg-primary shadow"
            }>
            <Logo />
            <nav className={Styles.menu}>
                {LINKS.map((link) => (
                    <Link
                        className={clsx([
                            Styles.link,
                            pathname === link.href && Styles.active,
                        ])}
                        href={link.href}
                        key={link.href}>
                        {link.label}
                    </Link>
                ))}
            </nav>
            <div>
                <AuthStatus />
            </div>
        </div>
    )
}
