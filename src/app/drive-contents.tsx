'use client'

import { Header } from "~/components/header"
import { FileList } from "~/components/file-list"
import { Breadcrumb } from "~/components/breadcrumb"
import type { DB_FileType, DB_FolderType } from "~/server/db/schema"

export default function DriveContents(props: {
  files: DB_FileType[],
  folders: DB_FolderType[],
  parents: DB_FolderType[],
  currentFolderId?: number
}) {
  
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-black via-slate-950 to-black">
      <Header />
      <main className="flex-1 py-6 mx-52">
        <Breadcrumb parents={props.parents} />
        <FileList folders={props.folders} files={props.files} currentFolderId={props.currentFolderId} />
      </main>
    </div>
  )
}

