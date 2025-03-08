'use client'

import { Header } from "~/components/header"
import { FileList } from "~/components/file-list"
import { Breadcrumb } from "~/components/breadcrumb"
import type { files as filesSchema, folders as foldersSchema } from "~/server/db/schema"

export default function DriveContents(props: {
  files: (typeof filesSchema.$inferSelect)[],
  folders: (typeof foldersSchema.$inferSelect)[],
  paths: (typeof foldersSchema.$inferSelect)[]
}) {
  
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 p-6">
        <Breadcrumb folders={props.paths} />
        <FileList folders={props.folders} files={props.files} />
      </main>
    </div>
  )
}

