import { eq } from "drizzle-orm";
import DriveContents from "~/app/drive-contents";
import { db } from "~/server/db";
import { files as filesSchema, folders as foldersSchema } from "~/server/db/schema";

export default async function FolderPage(props: {
    params: Promise<{ folderId: string }>
}) {

    const params = await props.params
    const parsedFolderId = parseInt(params.folderId)
    if (isNaN(parsedFolderId)) {
        return <div>Invalid Folder ID</div>
    }

    const foldersPromise = db
        .select()
        .from(foldersSchema)
        .orderBy(foldersSchema.name)
    const filesPromise = db
        .select()
        .from(filesSchema)
        .where(eq(filesSchema.parent, parsedFolderId))
        .orderBy(filesSchema.name)

    const [allFolders, files] = await Promise.all([foldersPromise, filesPromise])

    const folders = allFolders.filter((folder) => folder.parent === parsedFolderId)

    const paths : (typeof foldersSchema.$inferSelect)[] = []
    let parentId = parsedFolderId
    while (parentId !== 1) {
        const foundFolder = allFolders.find((folder) => folder.id === parentId)
        if (!foundFolder) break
        paths.unshift(foundFolder)
        parentId = foundFolder.parent ?? 1
    }
    
    return (
        <DriveContents files={files} folders={folders} paths={paths}/>
    )

}

