import { type NavigationStatus } from "~~/server/db/schema"

export type Navigation = {
    title: string
    description: string
    category_id: number
    tags: string[]
    url: string
    status: NavigationStatus
    created_at: string
    reviewed_at?: string
    submitter: string
}