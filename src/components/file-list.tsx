'use client'

import { Button } from "~/components/ui/button"
import ItemRow from "./row"
import type { Folder, File } from "~/lib/mock-data"

type FileListProps = {
  folders: Folder[],
  files: File[],
  handleClick: (folder: string) => void
}

export function FileList( { folders, files, handleClick } : FileListProps) {

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-2xl font-semibold">My Drive</h2>
        <Button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-plus mr-2 h-4 w-4"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          New
        </Button>
      </div>
      <div className="bg-card rounded-lg shadow-md">
        <div className="grid grid-cols-12 gap-4 px-4 py-2 font-semibold text-sm border-b border-border">
          <div className="col-span-6">Name</div>
          <div className="col-span-2">Size</div>
          <div className="col-span-3">Last modified</div>
          <div className="col-span-1"></div>
        </div>
        {folders.map((folder, index) => <ItemRow item={folder} key={index} handleClick={() => {
          handleClick(folder.id)
        }}/> )}
        {files.map((file, index) => <ItemRow item={file} key={index}/> )}
      </div>
    </div>
  )
}

