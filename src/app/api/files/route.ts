import { auth } from "@clerk/nextjs/server"

import { NextResponse } from "next/server"
import { MUTATIONS } from "~/server/db/queries"

export async function DELETE(request: Request) {
    try {
        const session = await auth()
        if (!session.userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const { id } = await request.json() as { id: number }

        await MUTATIONS.deleteFile(id, session.userId)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error deleting file:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}