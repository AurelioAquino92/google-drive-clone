import DriveContents from "./drive-contents";
import { QUERIES } from "~/server/db/queries";
// TODO: True Home Page
export default async function HomePage() {

  const [foldersData, files] = await Promise.all([
    QUERIES.getFolders(null), 
    QUERIES.getFiles(null)
  ])

  const { folders, parents } = foldersData
  
  return (
    <DriveContents files={files} folders={folders} parents={parents}/>
  )
  
}

