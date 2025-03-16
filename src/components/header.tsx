import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { Search, Cloud, File, Folder, Loader2 } from "lucide-react"
import { useState } from "react"
import { searchContents } from "~/app/actions"
import { useDebouncedCallback } from "use-debounce"
import type { DB_FileType, DB_FolderType } from "~/server/db/schema"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import { Input } from "~/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function Header() {
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<{
    files: DB_FileType[],
    folders: DB_FolderType[]
  }>({ files: [], folders: [] })
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const handleSearch = useDebouncedCallback(async (term: string) => {
    if (!term) {
      setSearchResults({ files: [], folders: [] })
      return
    }

    setIsSearching(true)
    try {
      const results = await searchContents(term)
      setSearchResults(results)
      setIsOpen(true)
    } catch (error) {
      console.error("Search failed:", error instanceof Error ? error.message : String(error))
      setSearchResults({ files: [], folders: [] })
    } finally {
      setIsSearching(false)
    }
  }, 500)

  return (
    <header className="flex items-center justify-between px-10 py-3 border-b border-border bg-background">
      <div className="flex items-center gap-2 w-1/4">
        <Cloud className="w-5 h-5 text-sky-500" />
        <h2 className="text-2xl font-bold tracking-tighter">Aurelio&apos;s Google Drive Clone</h2>
      </div>
      <div className="flex items-center justify-center w-1/2">
        <Popover open={isOpen && (searchResults.files.length > 0 || searchResults.folders.length > 0)} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <div className="rounded-lg border shadow-md w-full max-w-md relative flex items-center">
              {isSearching ? (
                <Loader2 className="w-5 h-5 animate-spin absolute left-3" />
              ) : (
                <Search className="w-5 h-5 text-muted-foreground absolute left-3" />
              )}
              <Input
                placeholder="Search in Drive"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  void handleSearch(e.target.value)
                }}
                className="border-0 pl-10"
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0" align="start">
            {searchTerm && (
              <div className="py-2">
                {searchResults.folders.length === 0 && searchResults.files.length === 0 ? (
                  <p className="px-4 py-2 text-sm text-muted-foreground">No results found.</p>
                ) : (
                  <>
                    {searchResults.folders.length > 0 && (
                      <div className="mb-2">
                        <p className="px-4 py-1 text-sm font-medium text-muted-foreground">Folders</p>
                        {searchResults.folders.map((folder) => (
                          <button
                            key={folder.id}
                            className="w-full px-4 py-2 text-sm flex items-center gap-2 hover:bg-accent cursor-pointer"
                            onClick={() => {
                              router.push(`/f/${folder.id}`)
                              setIsOpen(false)
                            }}
                          >
                            <Folder className="w-4 h-4" />
                            <span>{folder.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                    {searchResults.files.length > 0 && (
                      <div>
                        <p className="px-4 py-1 text-sm font-medium text-muted-foreground">Files</p>
                        {searchResults.files.map((file) => (
                          <button
                            key={file.id}
                            className="w-full px-4 py-2 text-sm flex items-center gap-2 hover:bg-accent cursor-pointer"
                            onClick={() => {
                              router.push(`/f/${file.parent ?? ""}`)
                              setIsOpen(false)
                            }}
                          >
                            <File className="w-4 h-4" />
                            <span>{file.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center justify-end space-x-4 w-1/4">
        <Link href="https://www.linkedin.com/in/aurelio-aquino-9876ba95/" target="_blank" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors hover:animate-pulse">
          Contact
        </Link>
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  )
}
