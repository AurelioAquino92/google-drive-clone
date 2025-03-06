'use client'

import { Header } from "~/components/header"
import { FileList } from "~/components/file-list"
import { Breadcrumb } from "~/components/breadcrumb"
import { useMemo, useState } from "react"
import type { files, folders } from "~/server/db/schema"

export default function DriveContents(props: {
  files: typeof files.$inferSelect[],
  folders: typeof folders.$inferSelect[]
}) {

  const [currentFolder, setCurrentFolder] = useState<number>(1)
  
  const getBreadcrumbsItems = useMemo(() => {
    const breadcrumbs : (typeof folders.$inferSelect)[] = []
    let currentId = currentFolder
    while (currentId !== 1) {
      const folderParent = props.folders.find((folder) => folder.id === currentId)
      if (!folderParent) break
      breadcrumbs.unshift(folderParent)
      currentId = folderParent.parent ?? 1
    }
    return breadcrumbs
  }, [currentFolder, props.folders])
  
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 p-6">
        <Breadcrumb items={getBreadcrumbsItems} handleClick={(newRoot) => setCurrentFolder(newRoot)} />
        <FileList folders={props.folders} files={props.files} handleClick={(newRoot) => setCurrentFolder(newRoot)} />
      </main>
    </div>
  )
}

