import { auth } from "@clerk/nextjs/server"
import { mockFolders } from "~/lib/mock-data"
import { db } from "~/server/db"
import { folders_table } from "~/server/db/schema"

export default function SandBox() {
    return (
        <div>
            <form action={async () => {
                "use server"
                const user = await auth()
                if (!user) {
                    throw new Error("User not found")
                }
                const rootFolder = await db.insert(folders_table).values({
                    name: "root",
                    ownerId: user.userId!,
                    parent: null,
                }).$returningId()

                const insertableFolders = mockFolders.map((folder) => ({
                    name: folder.name,
                    ownerId: user.userId!,
                    parent: rootFolder[0]!.id
                }))

                await db.insert(folders_table).values(insertableFolders)
                    
                console.log("folders inserted!")
            }}>
                <button type="submit">Seed</button>
            </form>
        </div>
    )
}