'use client'

import { Header } from "~/components/header"
import { FileList } from "~/components/file-list"
import { Breadcrumb } from "~/components/breadcrumb"
import { type Folder, mockFiles, mockFolders } from "~/lib/mock-data"
import { useMemo, useState } from "react"

export default function Home() {

  const [currentFolder, setCurrentFolder] = useState<string>("root")
  
  const getBreadcrumbsItems = useMemo(() => {
    const breadcrumbs : Folder[] = []
    let currentId = currentFolder
    while (currentId !== "root") {
      const folderParent = mockFolders.find((folder) => folder.id === currentId)
      if (!folderParent) break
      breadcrumbs.unshift(folderParent)
      currentId = folderParent.parent ?? "root"
    }
    return breadcrumbs
  }, [currentFolder])
  
  const folders = mockFolders.filter((folder) => folder.parent === currentFolder)
  const files = mockFiles.filter((file) => file.parent === currentFolder)

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 p-6">
        <Breadcrumb items={getBreadcrumbsItems} handleClick={(newRoot) => setCurrentFolder(newRoot)} />
        <FileList folders={folders} files={files} handleClick={(newRoot) => setCurrentFolder(newRoot)} />
      </main>
    </div>
  )
}

