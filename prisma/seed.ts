import { CATEGORIES } from "../app/(protected)/(posts)/(modules)/categories/consts/categories"
import prisma from "../app/_core/lib/prisma"
import { hash } from "bcryptjs"

async function createUsers() {
    try {
        const admin = await prisma.user.create({
            data: {
                name: "Neriya Rosner",
                email: "neri.coder@gmail.com",
                role: "ADMIN",
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
        const categories = await prisma.category.createMany({
            data: CATEGORIES.map((category) => ({
                name: category.name,
            })),
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
        const settings = await prisma.settings.createMany({
            data: [
                {
                    key: "posts_per_page",
                    value: "10",
                },
                {
                    key: "comments_cost_usd",
                    value: "5",
                },
                {
                    key: "comments_amount_per_purchase",
                    value: "3",
                },
            ],
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
        await createCategories()
        await createSettings()
    } catch (e) {
        console.error(e)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

main()
