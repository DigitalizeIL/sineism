import { useEffect, useState } from "react"

function useAsyncMemo<T>(
    fetchFunction: () => Promise<T>,
    dependencies: React.DependencyList
): { value: T | undefined; loading: boolean; error: Error | null }
function useAsyncMemo<T>(
    fetchFunction: () => Promise<T>,
    dependencies: React.DependencyList,
    initialValue: T
): { value: T; loading: boolean; error: Error | null }
function useAsyncMemo<T>(
    fetchFunction: () => Promise<T>,
    dependencies: React.DependencyList,
    initialValue?: T
): { value: T | undefined; loading: boolean; error: Error | null } {
    const [value, setValue] = useState<T | undefined>(initialValue)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        let isMounted = true
        setLoading(true)
        setError(null)

        fetchFunction()
            .then((result) => {
                if (isMounted) {
                    setValue(result)
                    setLoading(false)
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError(err as Error)
                    setLoading(false)
                }
            })

        return () => {
            isMounted = false
        }
    }, dependencies)

    return {
        value,
        loading,
        error,
    }
}

export default useAsyncMemo
