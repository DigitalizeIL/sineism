import { ReactNode } from "react"

type CategoryFeedProps = {
    Header?: ReactNode
    FeedItems?: ReactNode
    Footer?: ReactNode
}

export function ContentFeed({ Header, FeedItems, Footer }: CategoryFeedProps) {
    return (
        <div className="flex flex-col h-full">
            {Header}
            <div
                className={
                    "flex flex-col flex-1 justify-start items-center w-full"
                }>
                {FeedItems}
            </div>
            <div className="mt-auto">
                <div className="-mt-28">{Footer}</div>
            </div>
        </div>
    )
}
