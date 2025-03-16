import "server-only"

import { and, eq, inArray, isNull, like } from "drizzle-orm"
import { db } from "."
import type { DB_FileType, DB_FolderType } from "./schema"
import { files_table, folders_table } from "./schema"
import { UTApi } from "uploadthing/server"
import { auth } from "@clerk/nextjs/server"

const utApi = new UTApi()

export const QUERIES = {
    
    getFolders: async (parsedParentId: number | null) => {

        const session = await auth()
        if (!session.userId) {
            throw new Error("User not found")
        }

        const allFolders = await db
            .select()
            .from(folders_table)
            .where(eq(folders_table.ownerId, session.userId))
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
        
        const session = await auth()
        if (!session.userId) {
            throw new Error("User not found")
        }

        return db
            .select()
            .from(files_table)
            .where(and(parsedFolderId ? eq(files_table.parent, parsedFolderId) : isNull(files_table.parent), eq(files_table.ownerId, session.userId)))
            .orderBy(files_table.name)
    },

    getFolderById: async (parsedFolderId: number) => {
        const folders = await db
            .select()
            .from(folders_table)
            .where(eq(folders_table.id, parsedFolderId))
        return folders[0]
    },

    searchContents: async (searchQuery: string) => {
        const session = await auth()
        if (!session.userId) {
            throw new Error("User not found")
        }

        const searchPattern = `%${searchQuery}%`

        const matchingFiles = await db
            .select()
            .from(files_table)
            .where(
                and(
                    eq(files_table.ownerId, session.userId),
                    like(files_table.name, searchPattern)
                )
            )
            .orderBy(files_table.name)

        const matchingFolders = await db
            .select()
            .from(folders_table)
            .where(
                and(
                    eq(folders_table.ownerId, session.userId),
                    like(folders_table.name, searchPattern)
                )
            )
            .orderBy(folders_table.name)

        return {
            files: matchingFiles,
            folders: matchingFolders
        }
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

    renameFolder: async (id: number, newName: string, userId: string) => {
        const [folder] = await db.select().from(folders_table).where(and(eq(folders_table.id, id), eq(folders_table.ownerId, userId)))
        if (!folder) {
            throw new Error("Folder not found")
        }
        return await db.update(folders_table)
            .set({ name: newName })
            .where(and(eq(folders_table.id, id), eq(folders_table.ownerId, userId)))
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

        const findAllContents = async (folderId: number) => {
            const [files, subfolders] = await Promise.all([
                db.select().from(files_table).where(eq(files_table.parent, folderId)),
                db.select().from(folders_table).where(eq(folders_table.parent, folderId))
            ])
            
            let allFiles = [...files]
            let allFolderIds = [folderId]

            const subfolderContents = await Promise.all(
                subfolders.map(subfolder => findAllContents(subfolder.id))
            )
            allFiles = [...allFiles, ...subfolderContents.flatMap(c => c.files)]
            allFolderIds = [...allFolderIds, ...subfolderContents.flatMap(c => c.folderIds)]

            return {
                files: allFiles,
                folderIds: allFolderIds
            }
        }

        const contents = await findAllContents(id)

        await Promise.all([
            utApi.deleteFiles(contents.files.map(file => file.url.split("/").pop()!)),
            db.delete(files_table).where(inArray(files_table.parent, contents.folderIds))
        ])

        await db.delete(folders_table).where(inArray(folders_table.id, contents.folderIds))
    }
}


