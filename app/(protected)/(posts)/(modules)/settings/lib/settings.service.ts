import "server-only"

import {
    CreateSetting,
    ISetting,
    SettingKey,
} from "@/app/(protected)/(posts)/(modules)/settings/lib/settings.interface"

import prisma from "@/lib/prisma"

type ValueParser = (value: any) => any

export class SettingsService {
    async getSettingByKey(key: SettingKey): Promise<ISetting | null> {
        const found = await prisma.settings.findUnique({
            where: { key },
        })

        return found as ISetting | null
    }

    async getSettingValueByKey<T extends ValueParser>(
        key: SettingKey,
        parser: T
    ): Promise<ReturnType<T> | null> {
        const found = await prisma.settings.findUnique({
            where: { key },
        })

        if (found?.value) {
            return parser(found.value)
        }

        return null
    }

    async updateSettingByKey(setting: CreateSetting) {
        const update = await prisma.settings.update({
            where: { key: setting.key },
            data: { value: setting.value.toString() },
        })

        return update as unknown as ISetting
    }

    async getSettings(): Promise<ISetting[]> {
        const found = await prisma.settings.findMany()

        return found as unknown as ISetting[]
    }
}

export const settingsService = new SettingsService()
