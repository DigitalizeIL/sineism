import {getAppServerSession} from "@/app/(authentication)/lib/utils/session"
import {settingsService} from "@/app/(protected)/(posts)/(modules)/settings/lib/services/SettingsService";
import {Input} from "@/components/Form/Input";
import {Button} from "@/components/Button";
import {ModalWithButton} from "@/components/Modal";
import {TEXTS} from "@/app/(protected)/(posts)/(modules)/settings/components/texts";
import {ISetting} from "@/app/(protected)/(posts)/(modules)/settings/lib/interfaces/ISettings";

export const Settings = async () => {
    const session = await getAppServerSession()
    if (!session?.user) return null

    const settings = await settingsService.getSettings()

    const updateSettings = async (formData: FormData) => {
        "use server"

        const formValues = Object.fromEntries<ISetting['value']>(formData as any)
        //
        for (const key in formValues) {
            // const setting = settings.find((setting) => setting.key === key)
            //
            //     if (setting) {
            const value = formValues[key]

            // if (value === setting.value) continue

            await settingsService.updateSettingByKey({
                key,
                value: isNaN(Number(value)) ? value : Number(value)
            })
            //     }
        }
    }

    return (
        <ModalWithButton buttonText={TEXTS.settingsModalButton}>
            <form
                action={updateSettings}
                className={"flex items-center justify-center h-full px-4 flex-wrap gap-10"}>
                {settings.map((setting) => {
                    return (
                        <div className={"flex flex-col"} key={setting.id}>
                            <label htmlFor={setting.key}>{TEXTS.settingsFieldMap[setting.key]}</label>

                            <Input key={setting.id} type={"text"} name={setting.key} placeholder={setting.key}
                                   defaultValue={setting.value?.toString()}/>
                        </div>
                    )
                })}
                <Button htmlType={"submit"}>Update</Button>
            </form>
        </ModalWithButton>
    )
}
