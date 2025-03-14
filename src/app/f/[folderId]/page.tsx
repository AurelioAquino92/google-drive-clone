import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DriveContents from "~/app/drive-contents";
import { QUERIES } from "~/server/db/queries";

export default async function FolderPage(props: {
    params: Promise<{ folderId: string }>
}) {

    const session = await auth()

    if (!session.userId) {
        return redirect("/getstarted")
    }

    const params = await props.params
    const parsedFolderId = parseInt(params.folderId)
    if (isNaN(parsedFolderId)) {
        return <div>Invalid Folder ID</div>
    }

    const [foldersData, files] = await Promise.all([
        QUERIES.getFolders(parsedFolderId),
        QUERIES.getFiles(parsedFolderId)
    ])

    const { folders, parents } = foldersData

    return (
        <DriveContents files={files} folders={folders} parents={parents} currentFolderId={parsedFolderId} />
    )

}

