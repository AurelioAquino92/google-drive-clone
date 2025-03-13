import Link from "next/link"
import { ArrowRight, Cloud } from "lucide-react"

import { Button } from "~/components/ui/button"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import { SignUpButton } from "@clerk/nextjs"

export default async function GetStartedPage() {

    const session = await auth()
    if (session.userId) {
        return redirect("/")
    }

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-black via-slate-950 to-black">
            <header className="flex items-center justify-center py-6">
                <div className="flex items-center gap-2">
                    <Cloud className="h-8 w-8 text-white" />
                    <span className="text-xl font-bold text-white">Aurelio&apos;s Google Drive Clone</span>
                </div>
            </header>
            <main className="flex-1">
                <section className="flex flex-col items-center justify-center space-y-10 py-20 text-center md:py-32 ">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl">
                            Real Storage, Maximum Security
                        </h1>
                        <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                            Aurelio&apos;s Google Drive Clone gives you real file uploads and secure cloud storage that only you can access.
                        </p>
                    </div>
                    <SignUpButton mode="modal" signInFallbackRedirectUrl="/">
                        <Button className="group h-12 px-8 text-lg" size="lg">
                            Get Started
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </SignUpButton>
                    <div className="text-sm text-gray-400">No credit card required</div>
                </section>
            </main>
            <footer className="border-t border-gray-800 py-6">
                <div className="px-20 flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div className="text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} Aurelio&apos;s Drive. All rights reserved.
                    </div>
                    <div className="flex">
                        <Link href="https://www.linkedin.com/in/aurelio-aquino-9876ba95/" target="_blank" className="text-sm text-gray-400 hover:text-gray-300">
                            Contact
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
