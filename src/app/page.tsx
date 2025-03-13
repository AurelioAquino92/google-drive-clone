import { redirect } from "next/navigation";
import DriveContents from "./drive-contents";
import { QUERIES } from "~/server/db/queries";
import { auth } from "@clerk/nextjs/server";

export default async function HomePage() {

  const session = await auth()

  if (!session.userId) {
    return redirect("/getstarted")
  }

  const [foldersData, files] = await Promise.all([
    QUERIES.getFolders(null), 
    QUERIES.getFiles(null)
  ])

  const { folders, parents } = foldersData
  
  return (
    <DriveContents files={files} folders={folders} parents={parents}/>
  )
  
}

