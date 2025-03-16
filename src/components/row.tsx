import { File as FileIcon, Folder as FolderIcon, MoreVertical, Trash, Pencil } from "lucide-react";
import { Button } from "./ui/button";
import type { DB_FileType, DB_FolderType } from "~/server/db/schema";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { format } from "date-fns";
import { Input } from "./ui/input";

const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export default function ItemRow(props: {
    item : DB_FileType | DB_FolderType,
}) {
    const router = useRouter()
    const { item } = props
    const isFile = "size" in item
    const [open, setOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [showRenameDialog, setShowRenameDialog] = useState(false)
    const [newName, setNewName] = useState(item.name)
    const [isRenaming, setIsRenaming] = useState(false)
    const [linkClicked, setLinkClicked] = useState(false)

    const handleDelete = async () => {
        setIsDeleting(true)
        const endpoint = isFile ? "/api/files" : "/api/folders"
        await fetch(endpoint, {
            method: "DELETE",
            body: JSON.stringify({ id: item.id }),
        })
        setOpen(false)
        setShowDeleteDialog(false)
        router.refresh()
    }

    const handleRename = async () => {
        if (isFile) return
        setIsRenaming(true)
        await fetch("/api/folders", {
            method: "PATCH",
            body: JSON.stringify({ id: item.id, name: newName }),
        })
        setOpen(false)
        setShowRenameDialog(false)
        setIsRenaming(false)
        router.refresh()
    }

    return (
        <>
            <Link
                href={isFile ? `${item.url}` : `/f/${item.id}`}
                target={isFile ? "_blank" : undefined}
                onClick={(e) => {
                    if (!isFile && !e.defaultPrevented) {
                        setLinkClicked(true)
                    }
                }}
                className={`grid grid-cols-12 gap-4 px-4 py-3 items-center hover:bg-accent/50 cursor-pointer border-b border-border last:border-b-0 ${isDeleting || isRenaming ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                <div className="col-span-6 flex items-center space-x-2">
                    {isFile ? (
                        <FileIcon className={`h-5 w-5 text-blue-400`} />
                    ) : (
                        <FolderIcon className={`h-5 w-5 text-yellow-400 ${linkClicked ? "animate-bounce" : ""}`} />
                    )}
                    <span>{item.name}</span>
                </div>
                <div className="col-span-2 text-sm text-muted-foreground">
                    {isFile && item.size ? formatBytes(Number(item.size)) : "-"}
                </div>
                <div className="col-span-3 text-sm text-muted-foreground">
                    {item.createdAt ? format(new Date(item.createdAt), 'MMM dd, yyyy HH:mm') : ""}
                </div>
                <div className="col-span-1 flex justify-end">
                    <DropdownMenu open={open} onOpenChange={setOpen}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" disabled={isDeleting || isRenaming}>
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {!isFile && (
                                <DropdownMenuItem 
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setShowRenameDialog(true)
                                        setOpen(false)
                                    }} 
                                    disabled={isDeleting || isRenaming}
                                >
                                    <Pencil className="h-4 w-4 mr-2" />
                                    Rename
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuItem 
                                onClick={(e) => {
                                    e.preventDefault()
                                    setShowDeleteDialog(true)
                                    setOpen(false)
                                }} 
                                className="text-red-600 focus:text-red-500" 
                                disabled={isDeleting || isRenaming}
                            >
                                <Trash className="h-4 w-4 mr-2" />
                                Delete Forever
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </Link>

            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete {isFile ? "File" : "Folder"}</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete &quot;{item.name}&quot;? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDeleteDialog(false)} disabled={isDeleting}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                            {isDeleting ? "Deleting..." : "Delete Forever"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={showRenameDialog} onOpenChange={setShowRenameDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Rename Folder</DialogTitle>
                        <DialogDescription>
                            Enter a new name for &quot;{item.name}&quot;
                        </DialogDescription>
                    </DialogHeader>
                    <Input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="Enter new name"
                        disabled={isRenaming}
                    />
                    <DialogFooter>
                        <Button variant="outline" onClick={() => {
                            setShowRenameDialog(false)
                            setNewName(item.name)
                        }} disabled={isRenaming}>
                            Cancel
                        </Button>
                        <Button onClick={handleRename} disabled={isRenaming || !newName.trim()}>
                            {isRenaming ? "Renaming..." : "Rename"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}