"use server"

import { QUERIES } from "~/server/db/queries"
import type { DB_FileType, DB_FolderType } from "~/server/db/schema"

export async function searchContents(query: string): Promise<{
    files: DB_FileType[],
    folders: DB_FolderType[]
}> {
    if (!query) return { files: [], folders: [] }
    return QUERIES.searchContents(query)
} 