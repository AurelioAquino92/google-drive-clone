import { File as FileIcon, Folder as FolderIcon, MoreVertical } from "lucide-react";
import type { File, Folder } from "~/lib/mock-data";
import { Button } from "./ui/button";

export default function ItemRow(props: {
    item : File | Folder,
    handleClick?: () => void
}) {
    
    const { item, handleClick } = props

    const onCLickHandler = () => {
        if (!handleClick) return
        handleClick()
    }

    return (
        <div
            onClick={onCLickHandler}
            className="grid grid-cols-12 gap-4 px-4 py-3 items-center hover:bg-accent/50 cursor-pointer border-b border-border last:border-b-0"
        >
            <div className="col-span-6 flex items-center space-x-2">
                {item.type === "file" ? (
                    <FileIcon className="h-5 w-5 text-blue-400" />
                ) : (
                    <FolderIcon className="h-5 w-5 text-yellow-400" />
                )}
                <span>{item.name}</span>
            </div>
            <div className="col-span-2 text-sm text-muted-foreground">
                {item.type === "file" ? item.size : ""}
            </div>
            <div className="col-span-3 text-sm text-muted-foreground">{item.type === "file" ? item.modified : ""}</div>
            <div className="col-span-1 flex justify-end">
                <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}