import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

const items = [
  { name: "My Drive", href: "#" },
  { name: "Projects", href: "#" },
  { name: "Website Redesign", href: "#" },
]

export function Breadcrumb() {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="#" className="text-muted-foreground hover:text-primary">
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.name}>
            <div className="flex items-center">
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <Link
                href={item.href}
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

