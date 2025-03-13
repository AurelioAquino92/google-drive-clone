import { File as FileIcon, Folder as FolderIcon, MoreVertical, Trash } from "lucide-react";
import { Button } from "./ui/button";
import type { DB_FileType, DB_FolderType } from "~/server/db/schema";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ItemRow(props: {
    item : DB_FileType | DB_FolderType,
}) {
    const router = useRouter()
    const { item } = props
    const isFile = "size" in item
    const [open, setOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault()
        setIsDeleting(true)
        const endpoint = isFile ? "/api/files" : "/api/folders"
        await fetch(endpoint, {
            method: "DELETE",
            body: JSON.stringify({ id: item.id }),
        })
        setOpen(false)
        router.refresh()
    }

    return (
        <Link
            href={isFile ? `${item.url}` : `/f/${item.id}`}
            target={isFile ? "_blank" : undefined}
            className={`grid grid-cols-12 gap-4 px-4 py-3 items-center hover:bg-accent/50 cursor-pointer border-b border-border last:border-b-0 ${isDeleting ? "opacity-50 cursor-not-allowed" : ""}`}
        >
            <div className="col-span-6 flex items-center space-x-2">
                {isFile ? (
                    <FileIcon className="h-5 w-5 text-blue-400" />
                ) : (
                    <FolderIcon className="h-5 w-5 text-yellow-400" />
                )}
                <span>{item.name}</span>
            </div>
            <div className="col-span-2 text-sm text-muted-foreground">
                {isFile ? item.size : ""}
            </div>
            <div className="col-span-3 text-sm text-muted-foreground">{isFile ? item.createdAt?.toString() : ""}</div>
            <div className="col-span-1 flex justify-end">
                <DropdownMenu open={open} onOpenChange={setOpen}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" disabled={isDeleting}>
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={handleDelete} className="text-red-600 focus:text-red-500" disabled={isDeleting}>
                            <Trash className="h-4 w-4 mr-2" />
                            {isDeleting ? "Deleting..." : "Delete Forever Now"}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </Link>
    )
}