import "server-only"

import { IQuota } from "@/app/(protected)/(payment)/(modules)/comments/lib/quota.interface"
import prisma from "@/lib/prisma"

export class QuotaService {
    async getQuota(userId: number): Promise<IQuota | null> {
        return prisma.userCommentQuota.findUnique({
            where: { userId },
        })
    }

    async addQuota(userId: number, amount: number) {
        return prisma.userCommentQuota.upsert({
            where: { userId },
            create: {
                userId,
                quota: amount,
            },
            update: {
                quota: {
                    increment: amount,
                },
            },
        })
    }

    async consumeQuota(userId: number, amount: number = 1) {
        return prisma.userCommentQuota.update({
            where: {
                userId,
                quota: { gte: amount },
            },
            data: {
                quota: {
                    decrement: amount,
                },
            },
        })
    }
}

export const quotaService = new QuotaService()
