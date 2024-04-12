import { SettingKey } from "@/app/(protected)/(posts)/(modules)/settings/lib/settings.interface"
import { hash } from "bcryptjs"
import prisma from "../app/_core/lib/prisma"

import { ICategory } from "@/app/(protected)/(posts)/(modules)/categories/lib/category.interface"

async function createUsers() {
    try {
        const admin = await prisma.user.create({
            data: {
                name: "Neriya Rosner",
                email: "neri.coder@gmail.com",
                role: "ADMIN",
                isSubscribed: true,
                password: await hash("DevelopThatStuff", 10),
            },
        })

        console.log(`Created admin with id: ${admin.id}`)
    } catch (e: any) {
        if (e.code === "P2002") {
            return console.log("User already exists")
        } else {
            throw e
        }
    }
}

async function createCategories() {
    try {
        const INITIAL_CATEGORIES: ICategory[] = [
            {
                id: -1,
                name: "אמרות",
                path: "utterances",
            },
            {
                id: -2,
                name: "אמרות ערוכות",
                path: "edited-utterances",
            },
        ]

        const categories = await prisma.category.createMany({
            data: INITIAL_CATEGORIES,
        })

        console.log(`Created ${categories.count} categories`)
    } catch (e: any) {
        if (e.code === "P2002") {
            return console.log("Categories already exists")
        } else {
            throw e
        }
    }
}

async function createSettings() {
    try {
        const settingsData: Record<SettingKey, string> = {
            posts_per_page: "10",
            comments_cost_usd: "5",
            comments_amount_per_purchase: "3",
            site_name: "Sineism",
            registration_cost_usd: "0",
        }

        const settings = await prisma.settings.createMany({
            data: Object.entries(settingsData).map(([key, value]) => ({
                key,
                value,
            })),
        })

        console.log(`Created ${settings.count} settings`)
    } catch (e: any) {
        if (e.code === "P2002") {
            return console.log("Settings already exists")
        } else {
            throw e
        }
    }
}

async function main() {
    try {
        await createUsers()
        // await createCategories()
        await createSettings()
    } catch (e) {
        console.error(e)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

main()
