import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { Search, Cloud } from "lucide-react"
import { Input } from "./ui/input"
import Link from "next/link"
export function Header() {
  return (
    <header className="flex items-center justify-between px-10 py-3 border-b border-border bg-background">
      <div className="flex items-center gap-2 w-1/4">
        <Cloud className="w-5 h-5" />
        <h2 className="text-2xl font-bold tracking-tighter">Aurelio&apos;s Google Drive Clone</h2>
      </div>
      <div className="flex items-center justify-center w-1/2">
        <div className="flex items-center w-full max-w-md">
          <Search className="w-5 h-5 text-muted-foreground" />
          <Input type="search" placeholder="Search in Drive" className="ml-2 bg-secondary" />
        </div>
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
