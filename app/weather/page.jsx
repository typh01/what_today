import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function WeatherPage() {
  // 현재 날씨 데이터 (실제로는 API에서 가져올 것)
  const currentWeather = {
    location: "서울특별시 강남구",
    temperature: 24,
    condition: "맑음",
    icon: "☀️",
    feelsLike: 26,
    humidity: 45,
    windSpeed: 2.5,
    windDirection: "북동",
    precipitation: 0,
    fineDust: "좋음",
    ultraFineDust: "보통",
    uvIndex: "높음",
    sunrise: "05:32",
    sunset: "19:48",
  }

  // 시간별 날씨 예보
  const hourlyForecast = [
    { time: "지금", temp: 24, icon: "☀️", precipitation: 0 },
    { time: "15시", temp: 25, icon: "☀️", precipitation: 0 },
    { time: "16시", temp: 25, icon: "☀️", precipitation: 0 },
    { time: "17시", temp: 24, icon: "⛅", precipitation: 0 },
    { time: "18시", temp: 22, icon: "⛅", precipitation: 0 },
    { time: "19시", temp: 21, icon: "⛅", precipitation: 0 },
    { time: "20시", temp: 20, icon: "🌙", precipitation: 0 },
    { time: "21시", temp: 19, icon: "🌙", precipitation: 0 },
    { time: "22시", temp: 19, icon: "🌙", precipitation: 0 },
    { time: "23시", temp: 18, icon: "🌙", precipitation: 0 },
    { time: "00시", temp: 18, icon: "🌙", precipitation: 0 },
    { time: "01시", temp: 17, icon: "🌙", precipitation: 0 },
  ]

  // 주간 날씨 예보
  const weeklyForecast = [
    { day: "오늘", date: "5.10", highTemp: 25, lowTemp: 17, amIcon: "☀️", pmIcon: "⛅", precipitation: 0 },
    { day: "내일", date: "5.11", highTemp: 27, lowTemp: 18, amIcon: "⛅", pmIcon: "🌧️", precipitation: 60 },
    { day: "토", date: "5.12", highTemp: 22, lowTemp: 16, amIcon: "🌧️", pmIcon: "🌧️", precipitation: 80 },
    { day: "일", date: "5.13", highTemp: 21, lowTemp: 15, amIcon: "🌧️", pmIcon: "⛅", precipitation: 30 },
    { day: "월", date: "5.14", highTemp: 23, lowTemp: 14, amIcon: "⛅", pmIcon: "☀️", precipitation: 10 },
    { day: "화", date: "5.15", highTemp: 25, lowTemp: 15, amIcon: "☀️", pmIcon: "☀️", precipitation: 0 },
    { day: "수", date: "5.16", highTemp: 26, lowTemp: 16, amIcon: "☀️", pmIcon: "☀️", precipitation: 0 },
  ]

  // 생활지수
  const lifeIndex = [
    { name: "자외선", level: "높음", icon: "☀️", description: "햇볕에 노출 시 화상을 입을 수 있어요" },
    { name: "세차", level: "좋음", icon: "🚗", description: "세차하기 좋은 날씨예요" },
    { name: "빨래", level: "좋음", icon: "👕", description: "빨래가 잘 마를 거예요" },
    { name: "우산", level: "불필요", icon: "☂️", description: "우산 없이도 외출할 수 있어요" },
    { name: "수면", level: "좋음", icon: "😴", description: "숙면하기 좋은 날씨예요" },
    { name: "감기", level: "낮음", icon: "🤧", description: "감기 걱정 없는 날씨예요" },
  ]

  // 지역별 날씨
  const regionWeather = [
    { region: "서울", temp: 24, condition: "맑음", icon: "☀️" },
    { region: "인천", temp: 23, condition: "맑음", icon: "☀️" },
    { region: "경기", temp: 24, condition: "맑음", icon: "☀️" },
    { region: "강원", temp: 22, condition: "구름조금", icon: "⛅" },
    { region: "충북", temp: 25, condition: "맑음", icon: "☀️" },
    { region: "충남", temp: 24, condition: "맑음", icon: "☀️" },
    { region: "전북", temp: 25, condition: "맑음", icon: "☀️" },
    { region: "전남", temp: 26, condition: "맑음", icon: "☀️" },
    { region: "경북", temp: 23, condition: "구름조금", icon: "⛅" },
    { region: "경남", temp: 25, condition: "맑음", icon: "☀️" },
    { region: "부산", temp: 24, condition: "맑음", icon: "☀️" },
    { region: "제주", temp: 26, condition: "맑음", icon: "☀️" },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-6">
        <div className="container mx-auto max-w-6xl px-4">
          {/* 현재 날씨 정보 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{currentWeather.location} 날씨</h1>
            <p className="text-sm text-muted-foreground mb-6">
              업데이트:{" "}
              {new Date().toLocaleString("ko-KR", {
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* 현재 날씨 카드 */}
              <Card className="col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle>현재 날씨</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-5xl font-bold mb-2">{currentWeather.temperature}°</div>
                      <div className="text-xl">{currentWeather.condition}</div>
                      <div className="text-sm text-muted-foreground mt-1">체감온도 {currentWeather.feelsLike}°</div>
                    </div>
                    <div className="text-7xl">{currentWeather.icon}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 text-blue-500">💧</div>
                      <div>
                        <div className="text-sm font-medium">습도</div>
                        <div>{currentWeather.humidity}%</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 text-blue-500">💨</div>
                      <div>
                        <div className="text-sm font-medium">바람</div>
                        <div>
                          {currentWeather.windSpeed}m/s ({currentWeather.windDirection})
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 text-blue-500">☔</div>
                      <div>
                        <div className="text-sm font-medium">강수량</div>
                        <div>{currentWeather.precipitation}mm</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 text-blue-500">🌫️</div>
                      <div>
                        <div className="text-sm font-medium">미세먼지</div>
                        <div>{currentWeather.fineDust}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 시간별 날씨 카드 */}
              <Card className="col-span-1 lg:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle>시간별 날씨</CardTitle>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="flex overflow-x-auto pb-4 space-x-8 pt-2">
                    {hourlyForecast.map((hour, i) => (
                      <div key={i} className="flex flex-col items-center min-w-[80px]">
                        <div className="text-lg font-medium mb-2">{hour.time}</div>
                        <div className="text-6xl my-3">{hour.icon}</div>
                        <div className="text-2xl font-bold mt-1">{hour.temp}°</div>
                        <div className="text-sm text-blue-500 mt-2">
                          {hour.precipitation > 0 ? `${hour.precipitation}%` : ""}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 주간 날씨 예보 */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>주간 날씨</CardTitle>
              <CardDescription>7일간의 날씨 예보</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyForecast.map((day, i) => (
                  <div key={i} className="flex items-center py-2 border-b last:border-0">
                    <div className="w-20">
                      <div className="font-medium">{day.day}</div>
                      <div className="text-sm text-muted-foreground">{day.date}</div>
                    </div>
                    <div className="flex-1 flex items-center">
                      <div className="flex items-center gap-1 w-24">
                        <div className="text-2xl">{day.amIcon}</div>
                        <div className="text-sm">오전</div>
                      </div>
                      <div className="flex items-center gap-1 w-24">
                        <div className="text-2xl">{day.pmIcon}</div>
                        <div className="text-sm">오후</div>
                      </div>
                    </div>
                    <div className="w-24 text-right">
                      <div className="font-medium">
                        {day.highTemp}° / {day.lowTemp}°
                      </div>
                      {day.precipitation > 0 && <div className="text-sm text-blue-500">{day.precipitation}%</div>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 생활지수와 지역별 날씨 탭 */}
          <Tabs defaultValue="lifeIndex" className="mb-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="lifeIndex">생활지수</TabsTrigger>
              <TabsTrigger value="regionWeather">지역별 날씨</TabsTrigger>
            </TabsList>

            <TabsContent value="lifeIndex">
              <Card>
                <CardHeader>
                  <CardTitle>생활지수</CardTitle>
                  <CardDescription>오늘의 생활지수 정보</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {lifeIndex.map((index, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 border rounded-lg">
                        <div className="text-3xl">{index.icon}</div>
                        <div>
                          <div className="font-medium">{index.name}</div>
                          <div className="text-sm font-bold text-primary">{index.level}</div>
                          <div className="text-xs text-muted-foreground mt-1">{index.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="regionWeather">
              <Card>
                <CardHeader>
                  <CardTitle>지역별 날씨</CardTitle>
                  <CardDescription>전국 주요 지역의 현재 날씨</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {regionWeather.map((region, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="text-3xl">{region.icon}</div>
                        <div>
                          <div className="font-medium">{region.region}</div>
                          <div className="text-lg font-bold">{region.temp}°</div>
                          <div className="text-xs text-muted-foreground">{region.condition}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* 일출/일몰 정보 */}
          <Card>
            <CardHeader>
              <CardTitle>일출/일몰</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-around items-center">
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 text-orange-500 mb-2">🌅</div>
                  <div className="text-sm font-medium">일출</div>
                  <div className="text-xl font-bold">{currentWeather.sunrise}</div>
                </div>
                <div className="h-20 border-l"></div>
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 text-orange-500 mb-2">🌇</div>
                  <div className="text-sm font-medium">일몰</div>
                  <div className="text-xl font-bold">{currentWeather.sunset}</div>
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

