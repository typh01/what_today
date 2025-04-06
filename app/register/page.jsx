"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }

    // Check password match when typing in confirm password
    if (name === "confirmPassword" && form.password !== value) {
      setErrors((prev) => ({ ...prev, confirmPassword: "비밀번호가 일치하지 않습니다" }))
    } else if (name === "confirmPassword") {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Simple validation
    const newErrors = {
      name: form.name ? "" : "이름을 입력해주세요",
      email: form.email ? (form.email.includes("@") ? "" : "유효한 이메일을 입력해주세요") : "이메일을 입력해주세요",
      password: form.password
        ? form.password.length >= 6
          ? ""
          : "비밀번호는 6자 이상이어야 합니다"
        : "비밀번호를 입력해주세요",
      confirmPassword: form.confirmPassword
        ? form.password === form.confirmPassword
          ? ""
          : "비밀번호가 일치하지 않습니다"
        : "비밀번호 확인을 입력해주세요",
    }

    setErrors(newErrors)

    // Check if there are any errors
    if (Object.values(newErrors).every((error) => error === "")) {
      // Form is valid, proceed with registration
      console.log("Registration form submitted:", form)
      // Here you would typically call an API to register the user
      alert("회원가입이 완료되었습니다!")
      // Redirect to login or home page
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-12">
        <div className="container mx-auto max-w-md px-4">
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center">
                <Link href="/" className="inline-flex items-center mr-3">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  <span className="text-sm">돌아가기</span>
                </Link>
              </div>
              <CardTitle className="text-2xl font-bold">회원가입</CardTitle>
              <CardDescription>아래 정보를 입력하여 계정을 만드세요</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    이름
                  </label>
                  <Input id="name" name="name" placeholder="홍길동" value={form.name} onChange={handleChange} />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    이메일
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@example.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium">
                    비밀번호
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={form.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">{showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}</span>
                    </button>
                  </div>
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                  <p className="text-xs text-muted-foreground">비밀번호는 최소 6자 이상이어야 합니다</p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium">
                    비밀번호 확인
                  </label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={form.confirmPassword}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">{showConfirmPassword ? "비밀번호 숨기기" : "비밀번호 보기"}</span>
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                </div>

                <Button type="submit" className="w-full">
                  회원가입
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center">
                이미 계정이 있으신가요?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  로그인
                </Link>
              </div>
              <p className="text-xs text-center text-muted-foreground">
                회원가입을 완료하면{" "}
                <Link href="/terms" className="underline underline-offset-2">
                  이용약관
                </Link>
                과{" "}
                <Link href="/privacy" className="underline underline-offset-2">
                  개인정보처리방침
                </Link>
                에 동의하게 됩니다.
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

