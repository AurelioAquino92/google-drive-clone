import { Plus } from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

// TODO: Loading states
export default function NewFolderButton({ currentFolderId, name, onSuccess }: { currentFolderId?: number, name: string, onSuccess: () => void }) {
    const router = useRouter()

    async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        const response = await fetch("/api/folders", {
            method: "POST",
            body: JSON.stringify({
                name: name,
                parent: currentFolderId ?? null
            }),
        })
        await response.json()
        onSuccess()
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
