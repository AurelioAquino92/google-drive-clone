import "server-only"

import { eq } from "drizzle-orm"
import { db } from "."
import type { DB_FileType, DB_FolderType } from "./schema"
import { files_table, folders_table } from "./schema"

export const QUERIES = {
    getFolders: async (parsedParentId: number) => {
        const allFolders = await db
            .select()
            .from(folders_table)
            .orderBy(folders_table.name)

        const folders = allFolders.filter((folder) => folder.parent === parsedParentId)
        
        const parents: DB_FolderType[] = []
        let parentId = parsedParentId
        while (parentId !== 1) {
            const foundFolder = allFolders.find((folder) => folder.id === parentId)
            if (!foundFolder) break
            parents.unshift(foundFolder)
            parentId = foundFolder.parent ?? 1
        }
        
        return {
            folders,
            parents
        }
    },

    getFiles: async (parsedFolderId: number) => {
        return db
            .select()
            .from(files_table)
            .where(eq(files_table.parent, parsedFolderId))
            .orderBy(files_table.name)
    },
}

export const MUTATIONS = {
    createFile: async (input: {
        file: Omit<DB_FileType, "id" | "createdAt">,
        userId: string
    }) => {
        return await db.insert(files_table).values({ ...input.file, parent: 1 })
    },

    createFolder: async (folder: Omit<DB_FolderType, "id">) => {
        return await db.insert(folders_table).values(folder)
    },
}


