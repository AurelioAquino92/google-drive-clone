'use client'

import ItemRow from "./row"
import type { DB_FileType, DB_FolderType } from "~/server/db/schema"
import { UploadButton } from "./uploadthing"
import { useRouter } from "next/navigation"

type FileListProps = {
  folders: DB_FolderType[],
  files: DB_FileType[]
}

export function FileList( { folders, files } : FileListProps) {

  const router = useRouter()

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-2xl font-semibold">My Drive</h2>
        <UploadButton endpoint="imageUploader" onClientUploadComplete={() => {
          router.refresh()
        }} />
      </div>
      <div className="bg-card rounded-lg shadow-md">
        <div className="grid grid-cols-12 gap-4 px-4 py-2 font-semibold text-sm border-b border-border">
          <div className="col-span-6">Name</div>
          <div className="col-span-2">Size</div>
          <div className="col-span-3">Last modified</div>
          <div className="col-span-1"></div>
        </div>
        {folders.map((folder, index) => <ItemRow item={folder} key={index}/> )}
        {files.map((file, index) => <ItemRow item={file} key={index}/> )}
      </div>
    </div>
  )
}

