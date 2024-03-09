import "server-only"

import { IQuota } from "@/app/(protected)/(payment)/(modules)/comments/lib/quota.interface"
import prisma from "@/lib/prisma"

export interface QuotaService {
    getQuota(userId: number): Promise<IQuota | null>

    addQuota(userId: number, amount: number): Promise<any>

    consumeQuota(userId: number, amount?: number): Promise<any>
}

export const createQuotaService = (): QuotaService => {
    const getQuota = async (userId: number): Promise<IQuota | null> => {
        return prisma.userCommentQuota.findUnique({
            where: { userId },
        })
    }

    const addQuota = async (userId: number, amount: number) => {
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

    const consumeQuota = async (userId: number, amount: number = 1) => {
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

    return {
        getQuota,
        addQuota,
        consumeQuota,
    }
}

export const quotaService = createQuotaService()
