"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function DiaryPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [diaries, setDiaries] = useState([
    {
      id: 1,
      title: "2023년 5월 1일의 일기",
      content:
        "오늘은 정말 좋은 하루였습니다. 아침에 일어나서 맛있는 아침을 먹고, 오후에는 친구들과 만나 즐거운 시간을 보냈어요.",
      date: "2023-05-01",
      favorite: false,
    },
    {
      id: 2,
      title: "2023년 5월 2일의 일기",
      content: "오늘은 비가 많이 왔어요. 집에서 책을 읽으며 조용한 시간을 보냈습니다. 가끔은 이런 날도 좋은 것 같아요.",
      date: "2023-05-02",
      favorite: false,
    },
    {
      id: 3,
      title: "2023년 5월 3일의 일기",
      content:
        "오늘은 회사에서 중요한 프로젝트를 마무리했어요. 팀원들과 함께 축하하는 시간을 가졌습니다. 정말 뿌듯한 하루였어요.",
      date: "2023-05-03",
      favorite: true,
    },
    {
      id: 4,
      title: "2023년 5월 15일의 일기",
      content: "오늘은 오랜만에 가족들과 함께 시간을 보냈습니다. 정말 소중한 시간이었어요.",
      date: "2023-05-15",
      favorite: true,
    },
    {
      id: 5,
      title: "2023년 6월 1일의 일기",
      content: "6월의 첫날입니다. 새로운 달의 시작과 함께 새로운 목표를 세웠어요. 이번 달도 열심히 살아봐야겠습니다.",
      date: "2023-06-01",
      favorite: false,
    },
    {
      id: 6,
      title: "2023년 6월 2일의 일기",
      content: "오늘은 새로운 취미를 시작했어요. 그림 그리기를 배우기 시작했는데, 생각보다 재미있었습니다.",
      date: "2023-06-02",
      favorite: false,
    },
  ])

  const [newDiary, setNewDiary] = useState({
    title: "",
    content: "",
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [viewDiary, setViewDiary] = useState(null)
  const [isNewDiaryDialogOpen, setIsNewDiaryDialogOpen] = useState(false)

  // 일기 작성 폼 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewDiary((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // 일기 저장 핸들러
  const handleSaveDiary = (e) => {
    e.preventDefault()

    if (!newDiary.title || !newDiary.content) {
      alert("제목과 내용을 모두 입력해주세요.")
      return
    }

    const today = new Date()
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`

    const newEntry = {
      id: Date.now(),
      title: newDiary.title,
      content: newDiary.content,
      date: formattedDate,
      favorite: false,
    }

    setDiaries([newEntry, ...diaries])
    setNewDiary({ title: "", content: "" })
    setIsNewDiaryDialogOpen(false)
    alert("일기가 저장되었습니다.")
  }

  // 즐겨찾기 토글 핸들러
  const toggleFavorite = (id) => {
    setDiaries(diaries.map((diary) => (diary.id === id ? { ...diary, favorite: !diary.favorite } : diary)))
  }

  // 일기 상세 보기
  const viewDiaryDetail = (diary) => {
    setViewDiary(diary)
    setIsDialogOpen(true)
  }

  // 일기 삭제 핸들러
  const handleDeleteDiary = (id) => {
    if (window.confirm("정말로 이 일기를 삭제하시겠습니까?")) {
      setDiaries(diaries.filter((diary) => diary.id !== id))
      setIsDialogOpen(false)
    }
  }

  // 탭에 따른 일기 필터링
  const filteredDiaries = () => {
    switch (activeTab) {
      case "recent":
        return diaries.slice(0, 3)
      case "favorites":
        return diaries.filter((diary) => diary.favorite)
      default:
        return diaries
    }
  }

  // 현재 활성화된 탭에 따라 필터링된 일기 목록
  const currentDiaries = filteredDiaries()

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-8">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">일기장</h1>
              <p className="text-muted-foreground">오늘의 생각과 감정을 기록해보세요</p>
            </div>
            <Button onClick={() => setIsNewDiaryDialogOpen(true)}>새 일기 작성</Button>
          </div>

          <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">전체</TabsTrigger>
              <TabsTrigger value="recent">최근</TabsTrigger>
              <TabsTrigger value="favorites">즐겨찾기</TabsTrigger>
            </TabsList>
            <div className="mt-4">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {currentDiaries.map((diary) => (
                  <DiaryCard key={diary.id} diary={diary} onFavoriteToggle={toggleFavorite} onView={viewDiaryDetail} />
                ))}
              </div>
              {currentDiaries.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">일기가 없습니다.</p>
                </div>
              )}
            </div>
          </Tabs>
        </div>
      </main>
      <SiteFooter />

      {/* 일기 상세 보기 다이얼로그 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {viewDiary && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{viewDiary.title}</DialogTitle>
              <DialogDescription>{viewDiary.date}</DialogDescription>
            </DialogHeader>
            <div className="py-4 whitespace-pre-wrap">{viewDiary.content}</div>
            <DialogFooter className="flex justify-between sm:justify-between">
              <Button variant="outline" onClick={() => toggleFavorite(viewDiary.id)}>
                {viewDiary.favorite ? "★ 즐겨찾기 해제" : "☆ 즐겨찾기"}
              </Button>
              <Button variant="destructive" onClick={() => handleDeleteDiary(viewDiary.id)}>
                삭제
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* 새 일기 작성 다이얼로그 */}
      <Dialog open={isNewDiaryDialogOpen} onOpenChange={setIsNewDiaryDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>새 일기 작성</DialogTitle>
            <DialogDescription>오늘 하루를 기록해보세요</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveDiary}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Input placeholder="제목" name="title" value={newDiary.title} onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Textarea
                  placeholder="오늘 어떤 일이 있었나요?"
                  className="min-h-[200px]"
                  name="content"
                  value={newDiary.content}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setNewDiary({ title: "", content: "" })
                  setIsNewDiaryDialogOpen(false)
                }}
              >
                취소
              </Button>
              <Button type="submit">저장</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function DiaryCard({ diary, onFavoriteToggle, onView }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{diary.title}</CardTitle>
        <CardDescription>{diary.date}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">{diary.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm" onClick={() => onFavoriteToggle(diary.id)}>
          {diary.favorite ? "★" : "☆"}
        </Button>
        <Button variant="outline" size="sm" onClick={() => onView(diary)}>
          자세히 보기
        </Button>
      </CardFooter>
    </Card>
  )
}

