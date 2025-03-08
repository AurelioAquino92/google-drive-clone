'use client'

import { Header } from "~/components/header"
import { FileList } from "~/components/file-list"
import { Breadcrumb } from "~/components/breadcrumb"
import type { files_table as filesSchema, folders_table as foldersSchema } from "~/server/db/schema"

export default function DriveContents(props: {
  files: (typeof filesSchema.$inferSelect)[],
  folders: (typeof foldersSchema.$inferSelect)[],
  parents: (typeof foldersSchema.$inferSelect)[]
}) {
  
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 p-6">
        <Breadcrumb parents={props.parents} />
        <FileList folders={props.folders} files={props.files} />
      </main>
    </div>
  )
}

