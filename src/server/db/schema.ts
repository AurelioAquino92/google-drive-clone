import { bigint, index, int, singlestoreTableCreator, text, timestamp } from "drizzle-orm/singlestore-core";

export const createTable = singlestoreTableCreator((name) => `drive_tutorial_${name}`)

export const users = createTable("users", {
  id: bigint({ mode: "number", unsigned: true }).primaryKey().autoincrement(),
  name: text("name"),
  age: int("age")
})

export const files_table = createTable(
  "files", 
  {
    id: bigint({ mode: "number", unsigned: true }).primaryKey().autoincrement(),
    ownerId: text("ownerId").notNull(),
    name: text("name").notNull(),
    size: int("size").notNull(),
    url: text("url").notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    parent: bigint("parent", { mode: "number", unsigned: true })
  },
  (t) => {
    return [
      index("parent_index").on(t.parent),
      index("ownerId_index").on(t.ownerId)
    ]
  }
)

export const folders_table = createTable(
  "folders", 
  {
    id: bigint({ mode: "number", unsigned: true }).primaryKey().autoincrement(),
    ownerId: text("ownerId").notNull(),
    name: text("name").notNull(),
    parent: bigint("parent", { mode: "number", unsigned: true }),
    createdAt: timestamp("createdAt").defaultNow(),
  },
  (t) => {
    return [
      index("parent_index").on(t.parent),
      index("ownerId_index").on(t.ownerId)
    ]
  }
)

export type DB_FileType = typeof files_table.$inferSelect
export type DB_FolderType = typeof folders_table.$inferSelect