import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { MUTATIONS } from "~/server/db/queries"

type FolderRequest = {
    name: string
    parent: number | null
}

export async function POST(request: Request) {
    try {
        const user = await auth()
        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const { name, parent } = await request.json() as FolderRequest

        const folder = await MUTATIONS.createFolder({
            name,
            ownerId: user.userId!,
            parent: parent ?? null
        })

        return NextResponse.json(folder)
    } catch (error) {
        console.error("Error creating folder:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
