import DriveContents from "./drive-contents";
import { QUERIES } from "~/server/db/queries";

export default async function HomePage() {

  const [folders, files] = await Promise.all([
    QUERIES.getFolders(), 
    QUERIES.getFiles(1)
  ])
  
  return (
    <DriveContents files={files} folders={folders} parents={[]} />
  )
  
}

