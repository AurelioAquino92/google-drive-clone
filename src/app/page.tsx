import { db } from "~/server/db";
import DriveContents from "./drive-contents";
import { files as filesSchema, folders as foldersSchema } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export default async function HomePage() {

  const foldersPromise = db
      .select()
      .from(foldersSchema)
      .where(eq(foldersSchema.parent, 1))
      .orderBy(foldersSchema.name)
  const filesPromise = db
      .select()
      .from(filesSchema)
      .where(eq(filesSchema.parent, 1))
      .orderBy(filesSchema.name)

  const [folders, files] = await Promise.all([foldersPromise, filesPromise])
  
  return (
    <DriveContents files={files} folders={folders} paths={[]} />
  )
  
}

