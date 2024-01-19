import "server-only"

import prisma from "@/lib/prisma"
import {
    CreateSetting,
    ISetting,
    SettingKey,
} from "@/app/(protected)/(posts)/(modules)/settings/lib/interfaces/ISettings"

export interface SettingsService {
    getSettingByKey: (key: SettingKey) => Promise<ISetting | null>
    updateSettingByKey: (setting: CreateSetting) => Promise<ISetting>
    getSettings: () => Promise<ISetting[]>
}

export const createSettingsService = (): SettingsService => {
    const getSettingByKey = async (
        key: SettingKey
    ): Promise<ISetting | null> => {
        const found = await prisma.settings.findUnique({
            where: { key },
        })

        return found as ISetting | null
    }

    const updateSettingByKey = async (setting: CreateSetting) => {
        const update = await prisma.settings.update({
            where: { key: setting.key },
            data: { value: setting.value.toString() },
        })

        return update as unknown as ISetting
    }

    const getSettings = async (): Promise<ISetting[]> => {
        const found = await prisma.settings.findMany()

        return found as unknown as ISetting[]
    }

    return {
        updateSettingByKey,
        getSettingByKey,
        getSettings,
    }
}

export const settingsService = createSettingsService()
