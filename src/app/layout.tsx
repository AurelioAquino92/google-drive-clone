import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "~/lib/utils"
import {
  ClerkProvider
} from '@clerk/nextjs'
import { PostHogProvider } from "./_providers/providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Aurelio's Google Drive Clone",
  description: "Just like Google Drive, but worse!",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={cn("dark", inter.className)}>
        <PostHogProvider>
          <body className="min-h-screen bg-background font-sans antialiased">{children}</body>
        </PostHogProvider>
      </html>
    </ClerkProvider>
  )
}

