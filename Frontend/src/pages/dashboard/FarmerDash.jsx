import Content from "./components/Content"
import Sidebar from "./components/Sidebar"
import TopNav from "./components/TopNav"

export default function Layout() {
  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <div className="w-full flex flex-1 flex-col">
        <header className="h-16 border-b border-[#1F1F23]">
          <TopNav />
        </header>
        <div className="flex-1 overflow-auto p-6"><Content/></div>
      </div>
    </div>
  )
}

