import { useCallback, useEffect, useState } from "react"

interface InfiniteScrollReturns {
    isFetching: boolean
}

function useInfiniteScroll(
    callback: (done: () => void) => void
): InfiniteScrollReturns {
    const [isFetching, setIsFetching] = useState<boolean>(false)

    const handleScroll = useCallback(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop !==
                document.documentElement.offsetHeight ||
            isFetching
        )
            return
        setIsFetching(true)
    }, [isFetching])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [handleScroll])

    useEffect(() => {
        if (!isFetching) return
        callback(() => {
            setIsFetching(false)
        })
    }, [callback, isFetching])

    return { isFetching }
}
