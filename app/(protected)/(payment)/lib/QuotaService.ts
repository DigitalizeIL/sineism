import "server-only"

import prisma from "@/lib/prisma"
import { IQuota } from "@/app/(protected)/(payment)/lib/IQuota"

export interface QuotaService {
    getQuota(userId: number): Promise<IQuota | null>

    addQuota(userId: number, amount: number): void

    consumeQuota(userId: number, amount?: number): void
}

export const createQuotaService = (): QuotaService => {
    const getQuota = async (userId: number): Promise<IQuota | null> => {
        return prisma.userCommentQuota.findUnique({
            where: { userId },
        })
    }

    const addQuota = async (userId: number, amount: number) => {
        return prisma.userCommentQuota.update({
            where: { userId },
            data: {
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
