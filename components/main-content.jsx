"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function MainContent() {
  const [lottoNumbers, setLottoNumbers] = useState([8, 12, 27, 33, 42, 45])

  // 로또 번호 생성 함수
  const generateLottoNumbers = () => {
    const newNumbers = []
    while (newNumbers.length < 6) {
      const num = Math.floor(Math.random() * 45) + 1
      if (!newNumbers.includes(num)) {
        newNumbers.push(num)
      }
    }
    setLottoNumbers(newNumbers.sort((a, b) => a - b))
  }

  // 번호 색상 결정 함수
  const getNumberColor = (num) => {
    if (num <= 10) return "bg-yellow-500"
    if (num <= 20) return "bg-blue-500"
    if (num <= 30) return "bg-red-500"
    if (num <= 40) return "bg-gray-500"
    return "bg-green-500"
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* 오늘 일정 블록 */}
          <Card>
            <CardHeader>
              <CardTitle>오늘 일정</CardTitle>
              <CardDescription>오늘의 중요한 일정</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { time: "09:00", title: "아침 미팅" },
                  { time: "12:30", title: "점심 식사" },
                  { time: "15:00", title: "프로젝트 회의" },
                  { time: "18:30", title: "저녁 약속" },
                ].map((event, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-16 text-sm font-medium">{event.time}</div>
                    <div className="flex-1">{event.title}</div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/schedule">
                <Button variant="outline">일정 관리</Button>
              </Link>
            </CardFooter>
          </Card>

          {/* 일기 게시판 블록 */}
          <Card>
            <CardHeader>
              <CardTitle>일기</CardTitle>
              <CardDescription>최근 작성한 일기 목록</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-b pb-4 last:border-0 last:pb-0">
                    <h3 className="font-medium">오늘의 일기 #{i}</h3>
                    <p className="text-sm text-muted-foreground">
                      오늘은 정말 좋은 하루였습니다. 날씨도 좋고 기분도 좋았어요.
                    </p>
                    <div className="mt-2 text-xs text-muted-foreground">2023년 5월 {i}일</div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/diary">
                <Button variant="outline">더보기</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        {/* 로그인 블록 */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>로그인</CardTitle>
              <CardDescription>계정에 로그인하세요</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Input type="email" placeholder="이메일" />
                </div>
                <div className="space-y-2">
                  <Input type="password" placeholder="비밀번호" />
                </div>
                <Button type="submit" className="w-full">
                  로그인
                </Button>
              </form>
              <div className="mt-4 text-center text-sm">
                계정이 없으신가요?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  회원가입
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* 날씨 위젯 */}
          <Card>
            <CardHeader>
              <CardTitle>오늘의 날씨</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">24°C</div>
                  <div className="text-muted-foreground">서울, 맑음</div>
                </div>
                <div className="text-5xl">☀️</div>
              </div>
            </CardContent>
          </Card>

          {/* 로또 번호 생성기 */}
          <Card>
            <CardHeader>
              <CardTitle>로또 번호 생성기</CardTitle>
              <CardDescription>행운의 번호를 생성해보세요</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center gap-2 mb-4">
                {lottoNumbers.map((num) => (
                  <div
                    key={num}
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-white ${getNumberColor(num)}`}
                  >
                    {num}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={generateLottoNumbers}>번호 생성하기</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

