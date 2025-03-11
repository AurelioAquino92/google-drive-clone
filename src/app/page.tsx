import DriveContents from "./drive-contents";
import { QUERIES } from "~/server/db/queries";

export default async function HomePage() {

  const [foldersData, files] = await Promise.all([
    QUERIES.getFolders(1), 
    QUERIES.getFiles(1)
  ])

  const { folders, parents } = foldersData
  
  return (
    <DriveContents files={files} folders={folders} parents={parents} />
  )
  
}

