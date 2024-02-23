export enum SettingKey {
    posts_per_page = "posts_per_page",
    comments_cost_usd = "comments_cost_usd",
    comments_amount_per_purchase = "comments_amount_per_purchase",
    site_name = "site_name",
    registration_cost_usd = "registration_cost_usd",
}

export interface ISettings {
    settings: ISetting[]
}

export type ISetting = {
    id?: number
    key: string
    value: string | number
} & SettingOptions

export type CreateSetting = {
    value: number | string
    key: SettingKey | string
}

export type SettingOptions =
    | {
          key: "posts_per_page"
          value: number
      }
    | {
          key: "comments_cost_usd"
          value: number
      }
    | {
          key: "comments_amount_per_purchase"
          value: number
      }
    | {
          key: "site_name"
          value: string
      }
    | {
          key: "registration_cost_usd"
          value: number
      }
