import { bigint, index, int, singlestoreTableCreator, text } from "drizzle-orm/singlestore-core";

export const createTable = singlestoreTableCreator((name) => `drive_tutorial_${name}`)

export const users = createTable("users", {
  id: bigint({ mode: "number", unsigned: true }).primaryKey().autoincrement(),
  name: text("name"),
  age: int("age")
})

export const files = createTable(
  "files", 
  {
    id: bigint({ mode: "number", unsigned: true }).primaryKey().autoincrement(),
    name: text("name").notNull(),
    size: int("size").notNull(),
    url: text("url").notNull(),
    parent: bigint("parent", { mode: "number", unsigned: true }).notNull()
  },
  (t) => {
    return [index("parent_index").on(t.parent)]
  }
)

export const folders = createTable(
  "folders", 
  {
    id: bigint({ mode: "number", unsigned: true }).primaryKey().autoincrement(),
    name: text("name").notNull(),
    parent: bigint("parent", { mode: "number", unsigned: true })
  },
  (t) => {
    return [index("parent_index").on(t.parent)]
  }
)