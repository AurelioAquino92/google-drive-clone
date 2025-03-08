import { File as FileIcon, Folder as FolderIcon, MoreVertical } from "lucide-react";
import { Button } from "./ui/button";
import type { files_table, folders_table } from "~/server/db/schema";
import Link from "next/link";

export default function ItemRow(props: {
    item : (typeof files_table.$inferSelect) | (typeof folders_table.$inferSelect),
}) {
    
    const { item } = props
    const isFile = "size" in item

    return (
        <Link
            href={isFile ? "#" : `/f/${item.id}`}
            className="grid grid-cols-12 gap-4 px-4 py-3 items-center hover:bg-accent/50 cursor-pointer border-b border-border last:border-b-0"
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
                <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </div>
        </Link>
    )
}