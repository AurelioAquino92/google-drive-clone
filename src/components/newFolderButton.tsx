import { Plus } from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

export default function NewFolderButton({ currentFolderId }: { currentFolderId?: number }) {
    const router = useRouter()

    async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        const response = await fetch("/api/folders", {
            method: "POST",
            body: JSON.stringify({
                name: "New Folder",
                parent: currentFolderId ?? null
            }),
        })
        await response.json()
        router.refresh()
    }

    return (
        <Button
            type="submit"
            onClick={handleClick}
        >
            <Plus className="w-4 h-4 mr-2" />
            New Folder
        </Button>
    )
}
