import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">404 - 페이지를 찾을 수 없습니다</h1>
      <p className="text-lg mb-6">요청하신 페이지가 존재하지 않습니다.</p>
      <Link href="/" className="text-blue-600 hover:underline">
        홈으로 돌아가기
      </Link>
    </div>
  )
}

