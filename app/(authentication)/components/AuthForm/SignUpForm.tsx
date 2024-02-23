"use client"

import {
    LOGIN_URL,
    REGISTER_URL,
    TEXTS,
} from "@/app/(authentication)/components/AuthForm/consts"

import { Button } from "@/components/Button"
import { FormEvent } from "react"
import Link from "next/link"
import { useAuthForm } from "@/app/(authentication)/components/AuthForm/useAuthForm"

export const SignUpForm = () => {
    const { loading, signUp, errorHandler } = useAuthForm()

    const submitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const data = e.currentTarget

        if (!data) {
            return errorHandler("Something went wrong!")
        }

        await signUp({
            name: data.fullName.value,
            email: data.email.value,
            password: data.password.value,
        })
    }

    return (
        <form
            onSubmit={submitForm}
            className="flex flex-col space-y-4 px-4 py-8 sm:px-16">
            <div>
                <label
                    htmlFor="fullName"
                    className="block text-xs uppercase">
                    {TEXTS.fields.name}
                </label>
                <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Panic"
                    autoComplete="name"
                    required
                    className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                />
            </div>
            <div>
                <label
                    htmlFor="email"
                    className="block text-xs uppercase">
                    {TEXTS.fields.email}
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@gmail.com"
                    autoComplete="email"
                    required
                    className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                />
            </div>
            <div>
                <label
                    htmlFor="password"
                    className="block text-xs  uppercase">
                    {TEXTS.fields.password}
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                />
            </div>

            <Button
                loading={loading}
                className={"text-white"}>
                <p>{TEXTS.signUp}</p>
            </Button>

            <p className="text-center text-sm text-white">
                {TEXTS.alreadyHaveAccount}
                <Link
                    href={LOGIN_URL}
                    className="font-semibold text-white pl-1">
                    {TEXTS.signIn}
                </Link>{" "}
                {TEXTS.instead}
            </p>
        </form>
    )
}
