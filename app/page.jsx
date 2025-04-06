import MainContent from "@/components/main-content"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <MainContent />
      </main>
      <SiteFooter />
    </div>
  )
}

