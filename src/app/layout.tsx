import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "~/lib/utils"
import {
  ClerkProvider
} from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Google Drive Clone",
  description: "A Google Drive clone with dark mode as default",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={cn("dark", inter.className)}>
        <body className="min-h-screen bg-background font-sans antialiased">{children}</body>
      </html>
    </ClerkProvider>
  )
}

