"use client"

import { useState } from "react"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LottoPage() {
  const [numbers, setNumbers] = useState([8, 12, 27, 33, 42, 45])
  const [savedSets, setSavedSets] = useState([
    { id: 1, name: "내 행운의 번호", numbers: [8, 12, 27, 33, 42, 45], date: "2023-05-10" },
    { id: 2, name: "생일 번호", numbers: [4, 16, 23, 28, 34, 41], date: "2023-05-09" },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [setName, setSetName] = useState("")
  const [statistics, setStatistics] = useState({
    mostFrequent: [10, 34, 27, 12, 45],
    leastFrequent: [9, 15, 26, 41, 2],
  })

  // 로또 번호 생성 함수
  const generateNumbers = () => {
    setIsLoading(true)

    // 실제 애플리케이션에서는 더 복잡한 알고리즘이나 API를 사용할 수 있음
    setTimeout(() => {
      const newNumbers = []
      while (newNumbers.length < 6) {
        const num = Math.floor(Math.random() * 45) + 1
        if (!newNumbers.includes(num)) {
          newNumbers.push(num)
        }
      }
      setNumbers(newNumbers.sort((a, b) => a - b))
      setIsLoading(false)
    }, 800) // 로딩 효과를 위한 지연
  }

  // 번호 세트 저장 함수
  const saveNumberSet = () => {
    if (numbers.length === 0) {
      alert("저장할 번호가 없습니다.")
      return
    }

    const name = setName.trim() || `번호 세트 ${savedSets.length + 1}`
    const newSet = {
      id: Date.now(),
      name,
      numbers: [...numbers],
      date: new Date().toLocaleDateString(),
    }

    const updatedSets = [...savedSets, newSet]
    setSavedSets(updatedSets)

    alert(`"${name}" 세트가 저장되었습니다.`)
    setSetName("")
  }

  // 번호 세트 삭제 함수
  const deleteSet = (id) => {
    const updatedSets = savedSets.filter((set) => set.id !== id)
    setSavedSets(updatedSets)
  }

  // 번호 세트 복사 함수
  const copyToClipboard = (numbers) => {
    const text = numbers.join(", ")
    navigator.clipboard.writeText(text)
    alert("번호가 클립보드에 복사되었습니다.")
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
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-8">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">로또 번호 생성기</h1>
              <p className="text-muted-foreground">행운의 번호를 생성하고 관리하세요</p>
            </div>
          </div>

          {/* 번호 생성 카드 */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>번호 생성</CardTitle>
              <CardDescription>무작위 로또 번호를 생성합니다</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                  {numbers.map((num, index) => (
                    <div
                      key={index}
                      className={`flex h-16 w-16 items-center justify-center rounded-full text-white text-xl font-bold ${getNumberColor(num)}`}
                    >
                      {num}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 justify-center mb-6">
                  <Button onClick={generateNumbers} disabled={isLoading} className="gap-2">
                    {isLoading ? "생성 중..." : "번호 생성하기"}
                  </Button>

                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="세트 이름"
                      value={setName}
                      onChange={(e) => setSetName(e.target.value)}
                      className="max-w-[200px]"
                    />
                    <Button variant="outline" onClick={saveNumberSet} className="gap-2">
                      저장하기
                    </Button>
                  </div>

                  <Button variant="outline" onClick={() => copyToClipboard(numbers)} className="gap-2">
                    복사하기
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 탭 컨테이너 */}
          <Tabs defaultValue="saved" className="mb-8">
            <TabsList>
              <TabsTrigger value="saved">저장된 번호</TabsTrigger>
              <TabsTrigger value="stats">번호 통계</TabsTrigger>
            </TabsList>

            {/* 저장된 번호 탭 */}
            <TabsContent value="saved">
              <Card>
                <CardHeader>
                  <CardTitle>저장된 번호 세트</CardTitle>
                  <CardDescription>
                    {savedSets.length > 0 ? "저장한 번호 세트를 관리하세요" : "아직 저장된 번호 세트가 없습니다"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {savedSets.length > 0 ? (
                    <div className="space-y-4">
                      {savedSets.map((set) => (
                        <div key={set.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-medium">{set.name}</h3>
                            <span className="text-sm text-muted-foreground">{set.date}</span>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {set.numbers.map((num, index) => (
                              <div
                                key={index}
                                className={`flex h-10 w-10 items-center justify-center rounded-full text-white text-sm font-bold ${getNumberColor(num)}`}
                              >
                                {num}
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => copyToClipboard(set.numbers)}>
                              복사
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => deleteSet(set.id)}>
                              삭제
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">번호를 생성하고 저장해보세요!</p>
                      <Button onClick={generateNumbers}>번호 생성하기</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* 번호 통계 탭 */}
            <TabsContent value="stats">
              <Card>
                <CardHeader>
                  <CardTitle>번호 통계</CardTitle>
                  <CardDescription>자주 나오는 번호와 적게 나오는 번호</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">자주 나오는 번호 TOP 5</h3>
                      <div className="flex flex-wrap gap-3">
                        {statistics.mostFrequent.map((num, index) => (
                          <div
                            key={index}
                            className={`flex h-12 w-12 items-center justify-center rounded-full text-white font-bold ${getNumberColor(num)}`}
                          >
                            {num}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">적게 나오는 번호 TOP 5</h3>
                      <div className="flex flex-wrap gap-3">
                        {statistics.leastFrequent.map((num, index) => (
                          <div
                            key={index}
                            className={`flex h-12 w-12 items-center justify-center rounded-full text-white font-bold ${getNumberColor(num)}`}
                          >
                            {num}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="font-medium mb-2">로또 번호 색상 의미</h3>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
                          <span className="text-sm">1-10번</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                          <span className="text-sm">11-20번</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full bg-red-500"></div>
                          <span className="text-sm">21-30번</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full bg-gray-500"></div>
                          <span className="text-sm">31-40번</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full bg-green-500"></div>
                          <span className="text-sm">41-45번</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* 당첨 확인 카드 */}
          <Card>
            <CardHeader>
              <CardTitle>당첨 확인</CardTitle>
              <CardDescription>최근 당첨 번호와 비교해보세요</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">최근 당첨 번호 (1065회)</h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-white text-sm font-bold ${getNumberColor(3)}`}
                    >
                      3
                    </div>
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-white text-sm font-bold ${getNumberColor(10)}`}
                    >
                      10
                    </div>
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-white text-sm font-bold ${getNumberColor(24)}`}
                    >
                      24
                    </div>
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-white text-sm font-bold ${getNumberColor(33)}`}
                    >
                      33
                    </div>
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-white text-sm font-bold ${getNumberColor(38)}`}
                    >
                      38
                    </div>
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-white text-sm font-bold ${getNumberColor(45)}`}
                    >
                      45
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full text-white text-sm font-bold bg-primary relative">
                      30
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">추첨일: 2023년 5월 6일</p>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-3">내 번호 당첨 확인</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    생성한 번호 또는 저장된 번호를 선택하여 당첨 여부를 확인하세요.
                  </p>
                  <Button>당첨 확인하기</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

