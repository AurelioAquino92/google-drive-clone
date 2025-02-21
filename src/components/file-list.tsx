import { File, Folder, MoreVertical } from "lucide-react"
import { Button } from "~/components/ui/button"

const files = [
  { name: "Document.docx", type: "file", size: "15 KB", modified: "2023-04-01" },
  { name: "Spreadsheet.xlsx", type: "file", size: "22 KB", modified: "2023-04-02" },
  { name: "Presentation.pptx", type: "file", size: "1.2 MB", modified: "2023-04-03" },
  { name: "Images", type: "folder", items: "10 items", modified: "2023-04-04" },
  { name: "Videos", type: "folder", items: "5 items", modified: "2023-04-05" },
]

export function FileList() {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-2xl font-semibold">My Drive</h2>
        <Button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-plus mr-2 h-4 w-4"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          New
        </Button>
      </div>
      <div className="bg-card rounded-lg shadow-md">
        <div className="grid grid-cols-12 gap-4 px-4 py-2 font-semibold text-sm border-b border-border">
          <div className="col-span-6">Name</div>
          <div className="col-span-2">Size</div>
          <div className="col-span-3">Last modified</div>
          <div className="col-span-1"></div>
        </div>
        {files.map((file, index) => (
          <div
            key={index}
            className="grid grid-cols-12 gap-4 px-4 py-3 items-center hover:bg-accent/50 cursor-pointer border-b border-border last:border-b-0"
          >
            <div className="col-span-6 flex items-center space-x-2">
              {file.type === "file" ? (
                <File className="h-5 w-5 text-blue-400" />
              ) : (
                <Folder className="h-5 w-5 text-yellow-400" />
              )}
              <span>{file.name}</span>
            </div>
            <div className="col-span-2 text-sm text-muted-foreground">
              {file.type === "file" ? file.size : file.items}
            </div>
            <div className="col-span-3 text-sm text-muted-foreground">{file.modified}</div>
            <div className="col-span-1 flex justify-end">
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

