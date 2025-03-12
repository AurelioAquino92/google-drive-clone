'use client'

import ItemRow from "./row"
import type { DB_FileType, DB_FolderType } from "~/server/db/schema"
import { UploadButton } from "./uploadthing"
import { useRouter } from "next/navigation"
import NewFolderButton from "./newFolderButton"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import { Input } from "./ui/input"

type FileListProps = {
  folders: DB_FolderType[],
  files: DB_FileType[],
  currentFolderId?: number
}

export function FileList({ folders, files, currentFolderId }: FileListProps) {
  const router = useRouter()
  const [folderName, setFolderName] = useState("New Folder")
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className="mt-4 pt-4 flex gap-5 border-t border-border">
      <div className="flex flex-col items-center gap-5 px-2">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="py-5">
              <Plus className="w-4 h-4 mr-2" />
              New Folder
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Folder</DialogTitle>
            </DialogHeader>
            <Input
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Folder name"
            />
            <NewFolderButton 
              currentFolderId={currentFolderId} 
              name={folderName}
              onSuccess={() => {
                setDialogOpen(false)
                setFolderName("New Folder")
              }}
            />
          </DialogContent>
        </Dialog>
        <UploadButton
          input={{
            folderId: currentFolderId ?? null
          }}
          endpoint="driveUploader"
          onClientUploadComplete={() => {
            router.refresh()
          }}
        />
      </div>
      <div className="bg-card rounded-lg shadow-md w-full">
        <div className="grid grid-cols-12 gap-4 px-4 py-2 font-semibold text-sm border-b border-border">
          <div className="col-span-6">Name</div>
          <div className="col-span-2">Size</div>
          <div className="col-span-3">Last modified</div>
          <div className="col-span-1"></div>
        </div>
        {folders.map((folder, index) => <ItemRow item={folder} key={index} />)}
        {files.map((file, index) => <ItemRow item={file} key={index} />)}
      </div>
    </div>
  )
}
