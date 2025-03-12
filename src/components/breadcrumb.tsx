import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import type { DB_FolderType } from "~/server/db/schema"

type BreadcrumbType = {
  parents: DB_FolderType[]
}

export function Breadcrumb({ parents }: BreadcrumbType) {
  return (
    <nav className="flex flex-col gap-5" aria-label="Breadcrumb">
      <ol className="flex items-center">
        <li>
          <Link
            href={"/"}
            className="flex px-4 py-2 rounded-md hover:bg-secondary hover:text-primary"
          >
            <Home className="h-5 w-5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {parents.map((parent, index) => (
          <li key={parent.id}>
            <div className="flex items-center">
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <Link
                href={`/f/${parent.id}`}
                className={`px-4 py-2 rounded-md text-sm font-medium hover:bg-secondary ${index === parents.length - 1 ? "text-primary" : "text-muted-foreground hover:text-primary"
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

