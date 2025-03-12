import { Button } from "~/components/ui/button"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { Search } from "lucide-react"
import { Input } from "./ui/input"

export function Header() {
  return (
    <header className="flex items-center justify-between px-10 py-3 border-b border-border bg-background">
      <div className="w-1/4">
        <h2 className="text-2xl font-semibold">Aurelio&apos;s Google Drive Clone</h2>
      </div>
      <div className="flex items-center justify-center w-1/2">
        <div className="flex items-center w-full max-w-md">
          <Search className="w-5 h-5 text-muted-foreground" />
          <Input type="search" placeholder="Search in Drive" className="ml-2 bg-secondary" />
        </div>
      </div>
      <div className="flex items-center justify-end space-x-4 w-1/4">
        <Button variant="ghost" size="icon">
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
            className="lucide lucide-help-circle"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <path d="M12 17h.01" />
          </svg>
        </Button>
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
