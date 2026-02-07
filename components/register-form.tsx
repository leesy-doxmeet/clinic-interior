"use client"

import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"

const FORM_FIELDS = [
  { name: "companyName", label: "업체명", placeholder: "예: 메디플랜 디자인" },
  { name: "contactName", label: "담당자명", placeholder: "홍길동" },
  { name: "phone", label: "연락처", placeholder: "010-0000-0000" },
  { name: "email", label: "이메일", placeholder: "example@company.com" },
  { name: "region", label: "활동지역", placeholder: "예: 서울, 경기" },
  { name: "instagram", label: "인스타그램 링크", placeholder: "https://instagram.com/..." },
  { name: "website", label: "홈페이지 링크", placeholder: "https://..." },
  { name: "intro", label: "한줄소개", placeholder: "병원 인테리어 전문 업체입니다" },
  { name: "notes", label: "비고", placeholder: "추가 전달사항이 있으면 입력해주세요" },
] as const

type FormData = Record<string, string>

export function RegisterForm() {
  const [formData, setFormData] = useState<FormData>({})
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsSubmitting(true)

      const url = process.env.NEXT_PUBLIC_GAS_WEBAPP_URL
      if (!url) {
        alert("전송 주소가 없습니다. .env.local의 NEXT_PUBLIC_GAS_WEBAPP_URL을 확인해주세요.")
        return
      }

      // Apps Script doPost가 기대하는 정확한 구조
      const body = {
        type: "vendor_register",
        payload: {
          companyName: formData.companyName || "",
          contactName: formData.contactName || "",
          phone: formData.phone || "",
          email: formData.email || "",
          region: formData.region || "",
          instagram: formData.instagram || "",
          website: formData.website || "",
          intro: formData.intro || "",
          notes: formData.notes || "",
        },
        meta: {
          page: typeof window !== "undefined" ? window.location.href : "",
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        },
      }

      await fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      setDialogOpen(true)
      setFormData({})
    } catch (error) {
      console.error("Vendor register submit error:", error)
      alert("업체 등록 전송 중 오류가 발생했습니다.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        {FORM_FIELDS.map((field) => (
          <div key={field.name}>
            <label
              htmlFor={`register-${field.name}`}
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              {field.label}
            </label>
            <input
              id={`register-${field.name}`}
              type="text"
              placeholder={field.placeholder}
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>
        ))}

        <Button
          type="submit"
          className="mt-2 h-12 w-full text-base font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? "전송 중..." : "등록 요청하기"}
        </Button>
      </form>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="text-center sm:max-w-md">
          <DialogHeader className="items-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <svg
                className="h-6 w-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <DialogTitle className="text-xl">등록 요청 완료</DialogTitle>
            <DialogDescription className="pt-1 text-base">
              빠른시일 내 검토해 업로드 할게요.
            </DialogDescription>
          </DialogHeader>
          <DialogClose asChild>
            <Button className="mt-2 w-full">확인</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  )
}
