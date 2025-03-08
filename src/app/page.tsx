import DriveContents from "./drive-contents";
import { getFiles, getFolders } from "~/server/db/queries";

export default async function HomePage() {

  const [folders, files] = await Promise.all([
    getFolders(), 
    getFiles(1)
  ])
  
  return (
    <DriveContents files={files} folders={folders} parents={[]} />
  )
  
}

