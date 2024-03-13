import { serverContext } from "@/app/_core/lib/context"

export const [getPaginationId, setPaginationId] = serverContext<number>(0)
