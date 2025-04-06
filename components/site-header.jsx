import Link from "next/link"

export default function SiteHeader() {
  const menuItems = [
    { name: "일정", href: "/schedule" },
    { name: "일기", href: "/diary" },
    { name: "로또", href: "/lotto" },
    { name: "날씨", href: "/weather" },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container mx-auto max-w-6xl px-4 flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold">오늘뭐함</span>
            </div>
          </Link>
        </div>

        <nav className="flex items-center gap-6">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href} className="text-sm font-medium transition-colors hover:text-primary">
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

