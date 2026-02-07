"use client"

import React, { useState } from "react"
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
  { name: "name", label: "이름", placeholder: "홍길동" },
  { name: "phone", label: "연락받을 전화번호", placeholder: "010-0000-0000" },
  { name: "department", label: "진료과", placeholder: "예: 치과, 안과, 피부과" },
  { name: "location", label: "현장위치", placeholder: "예: 서울시 강남구" },
  { name: "startDate", label: "착공 가능일자", placeholder: "예: 2026년 4월" },
  { name: "openDate", label: "희망 오픈일자", placeholder: "예: 2026년 8월" },
  { name: "contractStatus", label: "계약상태", placeholder: "예: 임대차계약 완료" },
  { name: "buildingUse", label: "건물 용도변경", placeholder: "예: 필요 / 불필요 / 모름" },
  { name: "blueprint", label: "건축도면 유무", placeholder: "예: 있음 / 없음 / 모름" },
  { name: "rooms", label: "필요실", placeholder: "예: 진료실 2, 대기실, 상담실" },
] as const

type FormData = Record<string, string>

export function QuoteForm() {
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

      // ✅ Apps Script doPost가 기대하는 구조: { type, payload, meta }
      const body = {
        type: "quote",
        payload: {
          ...formData,
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
      console.error("Quote submit error:", error)
      alert("전송 중 오류가 발생했습니다. 다시 시도해주세요.")
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
              htmlFor={field.name}
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              {field.label}
            </label>
            <input
              id={field.name}
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
          {isSubmitting ? "전송 중..." : "견적 요청하기"}
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
            <DialogTitle className="text-xl">의사가 만나는 의사 닥스밋</DialogTitle>
            <DialogDescription className="pt-1 text-base">
              닥스밋 담당자가 빠른시일 내 연락드리겠습니다. 더 빠른 안내는 070-7834-8371로 연락 부탁드립니다.
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
