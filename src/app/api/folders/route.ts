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

export async function DELETE(request: Request) {
    try {
        const session = await auth()
        if (!session.userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const { id } = await request.json() as { id: number }

        await MUTATIONS.deleteFolder(id, session.userId)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error deleting folder:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function PATCH(request: Request) {
    try {
        const session = await auth()
        if (!session.userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const { id, name } = await request.json() as { id: number, name: string }

        await MUTATIONS.renameFolder(id, name, session.userId)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error renaming folder:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
