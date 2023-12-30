export interface ISettings {
    settings: ISetting[]
}

export type ISetting =
    {
        id?: number
        key: string
        value: string | number
    } & SettingOptions;

type SettingOptions =
    {
        key: "posts_per_page";
        value: number;
    } | {
    key: "comments_cost_usd";
    value: number;
} | {
    key: "comments_amount_per_purchase";
    value: number;
} | {
    key: "site_name";
    value: string;
}
