import Link from "next/link"

export default function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container mx-auto max-w-6xl px-4 flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} 오늘뭐함. 모든 권리 보유.
        </p>
        <div className="flex gap-4">
          <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
            이용약관
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
            개인정보처리방침
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
            문의하기
          </Link>
        </div>
      </div>
    </footer>
  )
}

