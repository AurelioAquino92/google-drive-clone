import "server-only"

import { eq } from "drizzle-orm"
import { db } from "."
import { files_table, folders_table } from "./schema"

export const QUERIES = {
    getFolders: async () => {
        return db
            .select()
            .from(folders_table)
            .orderBy(folders_table.name)
    },

    getFiles: async (parsedFolderId: number) => {
        return db
            .select()
            .from(files_table)
            .where(eq(files_table.parent, parsedFolderId))
            .orderBy(files_table.name)
    },

    getParents: async (allFolders: (typeof folders_table.$inferSelect)[], currentId: number) => {
        const parents: (typeof folders_table.$inferSelect)[] = []
        let parentId = currentId
        while (parentId !== 1) {
            const foundFolder = allFolders.find((folder) => folder.id === parentId)
            if (!foundFolder) break
            parents.unshift(foundFolder)
            parentId = foundFolder.parent ?? 1
        }
        return parents
    }
}