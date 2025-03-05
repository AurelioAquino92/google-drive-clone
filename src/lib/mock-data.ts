export interface File {
    id: string,
    name: string,
    type: "file",
    url: string,
    parent: string,
    size: string,
    modified: string
}

export type Folder = {
    id: string,
    name: string,
    type: "folder",
    parent: string | null
}

export const mockFolders: Folder[] = [
  { id: "4", name: "Documents", type: "folder", parent: "1" },
  { id: "1", name: "Spreadsheets", type: "folder", parent: "root" },
  { id: "2", name: "Presentations", type: "folder", parent: "root" }
]

export const mockFiles: File[] = [
    {id: "1", name: "1.doc", type: "file", url: "/files/1.doc", parent: "root", size: "5 MB", modified: "01-01-2025"},
    {id: "3", name: "2.doc", type: "file", url: "/files/2.doc", parent: "root", size: "5 MB", modified: "01-01-2025"},
    {id: "7", name: "3.doc", type: "file", url: "/files/3.doc", parent: "1", size: "5 MB", modified: "01-01-2025"},
    {id: "9", name: "4.doc", type: "file", url: "/files/4.doc", parent: "2", size: "5 MB", modified: "01-01-2025"}
]