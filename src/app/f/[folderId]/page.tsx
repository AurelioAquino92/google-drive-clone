import DriveContents from "~/app/drive-contents";
import { QUERIES } from "~/server/db/queries";

export default async function FolderPage(props: {
    params: Promise<{ folderId: string }>
}) {

    const params = await props.params
    const parsedFolderId = parseInt(params.folderId)
    if (isNaN(parsedFolderId)) {
        return <div>Invalid Folder ID</div>
    }

    const [allFolders, files] = await Promise.all([
        QUERIES.getFolders(),
        QUERIES.getFiles(parsedFolderId)
    ])

    const folders = allFolders.filter((folder) => folder.parent === parsedFolderId)
    const parents = await QUERIES.getParents(allFolders, parsedFolderId)
    
    return (
        <DriveContents files={files} folders={folders} parents={parents}/>
    )

}

