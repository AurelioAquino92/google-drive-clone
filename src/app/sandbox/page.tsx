import { mockFiles, mockFolders } from "~/lib/mock-data"
import { db } from "~/server/db"
import { files, folders } from "~/server/db/schema"

export default function SandBox() {
    return (
        <div>
            <form action={async () => {
                "use server"

                console.log('hellooooo')

                const folderInsert = await db.insert(folders).values(mockFolders.map((folder, index) => ({
                    id: index + 1,
                    name: folder.name,
                    parent: index !== 0 ? 1 : null
                })))
                const fileInsert = await db.insert(files).values(mockFiles.map((file, index) => ({
                    id: index + 1,
                    name: file.name,
                    size: 5000,
                    url: file.url,
                    parent: (index % 3) + 1
                })))
            }}>
                <button type="submit">Seed</button>
            </form>
        </div>
    )
}