import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import type { folders } from "~/server/db/schema"

type BreadcrumbType = {
  items: (typeof folders.$inferSelect)[]
  handleClick: (folder: number) => void
}

export function Breadcrumb({ items, handleClick } : BreadcrumbType) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <div
            onClick={() => handleClick(1)} 
            className="text-muted-foreground hover:text-primary"
          >
            <Home className="h-5 w-5" />
            <span className="sr-only">Home</span>
          </div>
        </li>
        {items.map((item, index) => (
          <li key={item.name}>
            <div className="flex items-center">
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <Link
                href="#"
                onClick={() => handleClick(item.id)}
                className={`ml-2 text-sm font-medium ${
                  index === items.length - 1 ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
                aria-current={index === items.length - 1 ? "page" : undefined}
              >
                {item.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}

