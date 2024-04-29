import {
    ISetting,
    SettingKey,
} from "@/app/(protected)/(posts)/(modules)/settings/lib/settings.interface"

import { Button } from "@/components/Button"
import { Input } from "@/components/Form/Input"
import { TEXTS } from "@/app/(protected)/(posts)/(modules)/settings/components/texts"
import { getAppServerSession } from "@/app/(authentication)/lib/utils/session"
import { settingsService } from "@/app/(protected)/(posts)/(modules)/settings/lib/settings.service"
import toast from "react-hot-toast"

function isSettingKey(key: string): key is SettingKey {
    return key in SettingKey
}

export const Settings = async () => {
    const session = await getAppServerSession()
    if (!session?.user) return null

    const settings = await settingsService.getSettings()

    const updateSettings = async (formData: FormData) => {
        "use server"

        const formValues = Object.fromEntries<ISetting["value"]>(
            formData as any
        )

        for (const key in formValues) {
            if (!isSettingKey(key)) {
                continue
            }

            const value = formValues[key]

            await settingsService.updateSettingByKey({
                key: key,
                value: isNaN(Number(value)) ? value : Number(value),
            })
        }
    }

    return (
        <form
            action={updateSettings}
            className={
                "flex items-end justify-center h-full px-4 flex-wrap gap-10"
            }>
            {settings.map((setting) => {
                return (
                    <div
                        className={"flex flex-col"}
                        key={setting.id}>
                        <label htmlFor={setting.key}>
                            {TEXTS.settingsFieldMap[setting.key]}
                        </label>

                        <Input
                            key={setting.id}
                            type={"text"}
                            name={setting.key}
                            placeholder={setting.key}
                            defaultValue={setting.value?.toString()}
                        />
                    </div>
                )
            })}
            <Button
                type={"primary"}
                htmlType={"submit"}>
                Update
            </Button>
        </form>
    )
}
