import { db } from "~/server/db";
import DriveContents from "./drive-contents";
import { files as filesSchema, folders as foldersSchema } from "~/server/db/schema";

export default async function HomePage() {

  const folders = await db.select().from(foldersSchema)
  const files = await db.select().from(filesSchema)
  
  return (
    <DriveContents files={files} folders={folders} />
  )
  
}

