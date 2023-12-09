import { CATEGORIES } from "../app/(protected)/(posts)/(modules)/categories/consts/categories"
import prisma from "../app/_core/lib/prisma"

async function main() {
    try {
        const admin = await prisma.user.create({
            data: {
                name: "Neriya Rosner",
                email: "neri.coder@gmail.com",
                role: "ADMIN",
                password: "DevelopThatStuff",
            },
        })
        console.log(`Created admin with id: ${admin.id}`)

        for (const category of CATEGORIES) {
            await prisma.category.create({
                data: {
                    name: category.name,
                },
            })
            console.log(`Created category with id: ${category.id}`)
        }
    } catch (e) {}
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
