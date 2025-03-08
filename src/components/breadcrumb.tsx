import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import type { folders_table } from "~/server/db/schema"

type BreadcrumbType = {
  parents: (typeof folders_table.$inferSelect)[]
}

export function Breadcrumb({ parents } : BreadcrumbType) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            href={"/f/1"}
            className="text-muted-foreground hover:text-primary"
          >
            <Home className="h-5 w-5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {parents.map((parent, index) => (
          <li key={parent.name}>
            <div className="flex items-center">
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <Link
                href={`/f/${parent.id}`}
                className={`ml-2 text-sm font-medium ${
                  index === parents.length - 1 ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
                aria-current={index === parents.length - 1 ? "page" : undefined}
              >
                {parent.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}

