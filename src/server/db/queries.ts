import "server-only"

import { and, eq, isNull } from "drizzle-orm"
import { db } from "."
import type { DB_FileType, DB_FolderType } from "./schema"
import { files_table, folders_table } from "./schema"
import { UTApi } from "uploadthing/server"

const utApi = new UTApi()

export const QUERIES = {
    getFolders: async (parsedParentId: number | null) => {
        const allFolders = await db
            .select()
            .from(folders_table)
            .orderBy(folders_table.name)

        const folders = allFolders.filter((folder) => folder.parent === parsedParentId)
        
        const parents: DB_FolderType[] = []
        let parentId = parsedParentId ?? null
        while (parentId !== null) {
            const foundFolder = allFolders.find((folder) => folder.id === parentId)
            if (!foundFolder) break
            parents.unshift(foundFolder)
            parentId = foundFolder.parent
        }
        
        return {
            folders,
            parents
        }
    },

    getFiles: async (parsedFolderId: number | null) => {
        return db
            .select()
            .from(files_table)
            .where(parsedFolderId ? eq(files_table.parent, parsedFolderId) : isNull(files_table.parent))
            .orderBy(files_table.name)
    },

    getFolderById: async (parsedFolderId: number) => {
        const folders = await db
            .select()
            .from(folders_table)
            .where(eq(folders_table.id, parsedFolderId))
        return folders[0]
    }
}

export const MUTATIONS = {
    createFile: async (input: {
        file: Omit<DB_FileType, "id" | "createdAt">,
        userId: string
    }) => {
        return await db.insert(files_table).values({ ...input.file, parent: input.file.parent })
    },

    createFolder: async (folder: Omit<DB_FolderType, "id" | "createdAt">) => {
        return await db.insert(folders_table).values(folder)
    },

    deleteFile: async (id: number, userId: string) => {
        const [file] = await db.select().from(files_table).where(and(eq(files_table.id, id), eq(files_table.ownerId, userId)))
        if (!file) {
            throw new Error("File not found")
        }
        await Promise.all([
            utApi.deleteFiles([file.url.split("/").pop()!]),
            db.delete(files_table).where(and(eq(files_table.id, id), eq(files_table.ownerId, userId)))
        ])
    },

    deleteFolder: async (id: number, userId: string) => {
        const [folder] = await db.select().from(folders_table).where(and(eq(folders_table.id, id), eq(folders_table.ownerId, userId)))
        if (!folder) {
            throw new Error("Folder not found")
        }
        const files = await db.select().from(files_table).where(eq(files_table.parent, id))
        await Promise.all([
            utApi.deleteFiles(files.map((file) => file.url.split("/").pop()!)),
            db.delete(files_table).where(eq(files_table.parent, id))
        ])
        await db.delete(folders_table).where(and(eq(folders_table.id, id), eq(folders_table.ownerId, userId)))
    }
}


