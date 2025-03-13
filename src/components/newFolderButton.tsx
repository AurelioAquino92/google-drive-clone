import { Plus } from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function NewFolderButton({ currentFolderId, name, onSuccess }: { currentFolderId?: number, name: string, onSuccess: () => void }) {
    
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        setIsLoading(true)
        try {
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
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button
            type="submit"
            onClick={handleClick}
            disabled={isLoading}
        >
            <Plus className="w-4 h-4 mr-2" />
            {isLoading ? "Creating..." : "New Folder"}
        </Button>
    )
}
