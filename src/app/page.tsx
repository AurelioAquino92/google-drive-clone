import { Header } from "~/components/header"
import { FileList } from "~/components/file-list"
import { Breadcrumb } from "~/components/breadcrumb"

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 p-6">
        <Breadcrumb />
        <FileList />
      </main>
    </div>
  )
}

