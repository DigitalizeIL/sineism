import { DEFAULT_PAGE_SIZE } from "@/app/(protected)/(posts)/(modules)/categories/consts/pagination"
import { PaginationCursorResponse } from "../../types/pagination.types"
import { SettingKey } from "@/app/(protected)/(posts)/(modules)/settings/lib/settings.interface"
import { settingsService } from "@/app/(protected)/(posts)/(modules)/settings/lib/settings.service"

export class BaseContentRepository {
    constructor(public itemsPerPage: number = DEFAULT_PAGE_SIZE) {
        this.initSettings()
    }

    private async initSettings() {
        this.itemsPerPage = await settingsService.getSettingValueByKey(
            SettingKey.posts_per_page,
            Number,
            DEFAULT_PAGE_SIZE
        )
    }

    getPaginationCursors(
        cursors: number[],
        currentCursor?: number
    ): PaginationCursorResponse {
        const lastCursor = cursors[cursors.length - 1]
        const firstCursor = cursors[0]

        const defaultReponse: PaginationCursorResponse = {
            last: lastCursor,
            next: lastCursor,
            previous: firstCursor,
            first: firstCursor,
        }

        const currentIndex = cursors.indexOf(currentCursor ?? -1)

        if (currentIndex === -1) {
            return defaultReponse
        }

        const response: PaginationCursorResponse = {
            ...defaultReponse,
            next: cursors[currentIndex + this.itemsPerPage],
            previous: cursors[currentIndex - this.itemsPerPage],
        }

        return response
    }
}
