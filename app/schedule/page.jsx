"use client"

import { useState } from "react"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SchedulePage() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [date, setDate] = useState(new Date())
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [viewEvent, setViewEvent] = useState(null)
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "팀 미팅",
      date: "2023-05-10",
      time: "09:00",
      location: "회의실 A",
      description: "주간 팀 미팅 및 프로젝트 진행 상황 공유",
      category: "work",
      important: true,
    },
    {
      id: 2,
      title: "점심 약속",
      date: "2023-05-10",
      time: "12:30",
      location: "서울 강남구 레스토랑",
      description: "친구와 점심 식사",
      category: "personal",
      important: false,
    },
    {
      id: 3,
      title: "병원 예약",
      date: "2023-05-11",
      time: "15:00",
      location: "서울 강남구 병원",
      description: "정기 건강 검진",
      category: "health",
      important: true,
    },
    {
      id: 4,
      title: "영화 관람",
      date: "2023-05-12",
      time: "19:00",
      location: "메가박스 강남",
      description: "새로 개봉한 영화 관람",
      category: "entertainment",
      important: false,
    },
    {
      id: 5,
      title: "가족 모임",
      date: "2023-05-14",
      time: "18:00",
      location: "부모님 댁",
      description: "가족 저녁 식사",
      category: "family",
      important: true,
    },
    {
      id: 6,
      title: "프로젝트 마감일",
      date: "2023-05-15",
      time: "17:00",
      location: "회사",
      description: "분기별 프로젝트 마감",
      category: "work",
      important: true,
    },
  ])

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    time: "09:00",
    location: "",
    description: "",
    category: "personal",
    important: false,
  })

  // 이벤트 카테고리에 따른 색상
  const getCategoryColor = (category) => {
    switch (category) {
      case "work":
        return "bg-blue-500"
      case "personal":
        return "bg-green-500"
      case "health":
        return "bg-red-500"
      case "entertainment":
        return "bg-purple-500"
      case "family":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  // 이벤트 카테고리 한글 이름
  const getCategoryName = (category) => {
    switch (category) {
      case "work":
        return "업무"
      case "personal":
        return "개인"
      case "health":
        return "건강"
      case "entertainment":
        return "여가"
      case "family":
        return "가족"
      default:
        return "기타"
    }
  }

  // 탭에 따른 이벤트 필터링
  const filteredEvents = () => {
    const today = new Date().toISOString().split("T")[0]

    switch (activeTab) {
      case "upcoming":
        return events
          .filter((event) => event.date >= today)
          .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
      case "important":
        return events
          .filter((event) => event.important)
          .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
      case "past":
        return events
          .filter((event) => event.date < today)
          .sort((a, b) => b.date.localeCompare(a.date) || a.time.localeCompare(b.time))
      default:
        return events.sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
    }
  }

  // 이벤트 상세 보기
  const viewEventDetail = (event) => {
    setViewEvent(event)
    setIsDialogOpen(true)
  }

  // 이벤트 삭제 핸들러
  const handleDeleteEvent = (id) => {
    if (window.confirm("정말로 이 일정을 삭제하시겠습니까?")) {
      setEvents(events.filter((event) => event.id !== id))
      setIsDialogOpen(false)
    }
  }

  // 중요 표시 토글 핸들러
  const toggleImportant = (id) => {
    setEvents(events.map((event) => (event.id === id ? { ...event, important: !event.important } : event)))
  }

  // 새 이벤트 입력 핸들러
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setNewEvent((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  // 셀렉트 입력 핸들러
  const handleSelectChange = (name, value) => {
    setNewEvent((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // 이벤트 저장 핸들러
  const handleSaveEvent = (e) => {
    e.preventDefault()

    if (!newEvent.title || !newEvent.date || !newEvent.time) {
      alert("제목, 날짜, 시간을 모두 입력해주세요.")
      return
    }

    const newEventEntry = {
      id: Date.now(),
      ...newEvent,
    }

    setEvents([...events, newEventEntry])
    setIsAddEventOpen(false)
    setNewEvent({
      title: "",
      date: new Date().toISOString().split("T")[0],
      time: "09:00",
      location: "",
      description: "",
      category: "personal",
      important: false,
    })
    alert("일정이 저장되었습니다.")
  }

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric", weekday: "long" }
    return new Date(dateString).toLocaleDateString("ko-KR", options)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-8">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">일정 관리</h1>
              <p className="text-muted-foreground">중요한 일정을 관리하고 확인하세요</p>
            </div>
            <Button onClick={() => setIsAddEventOpen(true)}>새 일정 추가</Button>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>일정 목록</CardTitle>
                <CardDescription>다가오는 일정과 지난 일정을 확인하세요</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="upcoming" className="mb-6" onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="upcoming">다가오는 일정</TabsTrigger>
                    <TabsTrigger value="important">중요 일정</TabsTrigger>
                    <TabsTrigger value="past">지난 일정</TabsTrigger>
                  </TabsList>
                  <TabsContent value="upcoming" className="mt-4">
                    <EventList
                      events={filteredEvents()}
                      onView={viewEventDetail}
                      onToggleImportant={toggleImportant}
                      getCategoryColor={getCategoryColor}
                      getCategoryName={getCategoryName}
                    />
                  </TabsContent>
                  <TabsContent value="important" className="mt-4">
                    <EventList
                      events={filteredEvents()}
                      onView={viewEventDetail}
                      onToggleImportant={toggleImportant}
                      getCategoryColor={getCategoryColor}
                      getCategoryName={getCategoryName}
                    />
                  </TabsContent>
                  <TabsContent value="past" className="mt-4">
                    <EventList
                      events={filteredEvents()}
                      onView={viewEventDetail}
                      onToggleImportant={toggleImportant}
                      getCategoryColor={getCategoryColor}
                      getCategoryName={getCategoryName}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>달력</CardTitle>
                <CardDescription>일정을 날짜별로 확인하세요</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                <div className="mt-4">
                  <h3 className="font-medium mb-2">선택한 날짜: {formatDate(date)}</h3>
                  <div className="space-y-2">
                    {events
                      .filter((event) => event.date === date.toISOString().split("T")[0])
                      .sort((a, b) => a.time.localeCompare(b.time))
                      .map((event) => (
                        <div
                          key={event.id}
                          className="p-2 border rounded-md cursor-pointer hover:bg-muted"
                          onClick={() => viewEventDetail(event)}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${getCategoryColor(event.category)}`}></div>
                            <span className="font-medium">{event.time}</span>
                          </div>
                          <div className="ml-4">{event.title}</div>
                        </div>
                      ))}
                    {events.filter((event) => event.date === date.toISOString().split("T")[0]).length === 0 && (
                      <p className="text-sm text-muted-foreground">이 날짜에 예정된 일정이 없습니다.</p>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setNewEvent((prev) => ({
                      ...prev,
                      date: date.toISOString().split("T")[0],
                    }))
                    setIsAddEventOpen(true)
                  }}
                >
                  이 날짜에 일정 추가
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>카테고리별 일정</CardTitle>
              <CardDescription>카테고리별로 일정을 확인하세요</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {["work", "personal", "health", "entertainment", "family"].map((category) => (
                  <Card key={category}>
                    <CardHeader className={`${getCategoryColor(category)} text-white rounded-t-lg py-2 px-4`}>
                      <CardTitle className="text-sm">{getCategoryName(category)}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3">
                      <p className="text-2xl font-bold">
                        {events.filter((event) => event.category === category).length}
                      </p>
                      <p className="text-xs text-muted-foreground">일정</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <SiteFooter />

      {/* 일정 상세 보기 다이얼로그 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {viewEvent && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{viewEvent.title}</DialogTitle>
              <DialogDescription>
                {formatDate(viewEvent.date)} {viewEvent.time}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-3 h-3 rounded-full ${getCategoryColor(viewEvent.category)}`}></div>
                <span>{getCategoryName(viewEvent.category)}</span>
                {viewEvent.important && <span className="ml-auto text-red-500 font-bold">중요</span>}
              </div>

              {viewEvent.location && (
                <div className="mb-2">
                  <p className="text-sm font-medium">장소</p>
                  <p>{viewEvent.location}</p>
                </div>
              )}

              {viewEvent.description && (
                <div className="mb-2">
                  <p className="text-sm font-medium">설명</p>
                  <p className="whitespace-pre-wrap">{viewEvent.description}</p>
                </div>
              )}
            </div>
            <DialogFooter className="flex justify-between sm:justify-between">
              <Button variant="outline" onClick={() => toggleImportant(viewEvent.id)}>
                {viewEvent.important ? "중요 해제" : "중요 표시"}
              </Button>
              <Button variant="destructive" onClick={() => handleDeleteEvent(viewEvent.id)}>
                삭제
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* 새 일정 추가 다이얼로그 */}
      <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>새 일정 추가</DialogTitle>
            <DialogDescription>새로운 일정의 상세 정보를 입력하세요</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveEvent}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm font-medium">
                  제목
                </label>
                <Input
                  id="title"
                  name="title"
                  value={newEvent.title}
                  onChange={handleInputChange}
                  placeholder="일정 제목"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="date" className="text-sm font-medium">
                    날짜
                  </label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={newEvent.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="time" className="text-sm font-medium">
                    시간
                  </label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={newEvent.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <label htmlFor="location" className="text-sm font-medium">
                  장소
                </label>
                <Input
                  id="location"
                  name="location"
                  value={newEvent.location}
                  onChange={handleInputChange}
                  placeholder="일정 장소 (선택사항)"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="category" className="text-sm font-medium">
                  카테고리
                </label>
                <Select value={newEvent.category} onValueChange={(value) => handleSelectChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="카테고리 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="work">업무</SelectItem>
                    <SelectItem value="personal">개인</SelectItem>
                    <SelectItem value="health">건강</SelectItem>
                    <SelectItem value="entertainment">여가</SelectItem>
                    <SelectItem value="family">가족</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">
                  설명
                </label>
                <Input
                  id="description"
                  name="description"
                  value={newEvent.description}
                  onChange={handleInputChange}
                  placeholder="일정에 대한 설명 (선택사항)"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="important"
                  name="important"
                  checked={newEvent.important}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label htmlFor="important" className="text-sm font-medium">
                  중요 일정으로 표시
                </label>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddEventOpen(false)}>
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

function EventList({ events, onView, onToggleImportant, getCategoryColor, getCategoryName }) {
  if (events.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">일정이 없습니다.</p>
      </div>
    )
  }

  // 날짜별로 그룹화
  const groupedEvents = events.reduce((acc, event) => {
    if (!acc[event.date]) {
      acc[event.date] = []
    }
    acc[event.date].push(event)
    return acc
  }, {})

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric", weekday: "long" }
    return new Date(dateString).toLocaleDateString("ko-KR", options)
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedEvents)
        .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
        .map(([date, dateEvents]) => (
          <div key={date}>
            <h3 className="font-medium mb-2">{formatDate(date)}</h3>
            <div className="space-y-2">
              {dateEvents
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((event) => (
                  <Card key={event.id} className={event.important ? "border-red-500" : ""}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${getCategoryColor(event.category)}`}></div>
                          <span className="text-sm">{getCategoryName(event.category)}</span>
                        </div>
                        <span className="text-sm font-medium">{event.time}</span>
                      </div>
                      <h4 className="font-medium mt-2">{event.title}</h4>
                      {event.location && <p className="text-sm text-muted-foreground mt-1">📍 {event.location}</p>}
                      <div className="flex justify-between mt-4">
                        <Button variant="ghost" size="sm" onClick={() => onToggleImportant(event.id)}>
                          {event.important ? "★" : "☆"}
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => onView(event)}>
                          자세히 보기
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}
    </div>
  )
}

