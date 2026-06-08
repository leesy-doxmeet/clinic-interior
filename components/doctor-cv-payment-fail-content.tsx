"use client"

import Link from "next/link"
import { useMemo } from "react"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"

export function DoctorCvPaymentFailContent() {
  const searchParams = useSearchParams()
  const isOneMonth = searchParams.get("type") === "one-month"

  const retryHref = useMemo(() => {
    const params = new URLSearchParams()

    if (isOneMonth) {
      params.set("type", "one-month")
    }

    const draftId = searchParams.get("draftId")
    const licenseNumber = searchParams.get("licenseNumber")
    const name = searchParams.get("name")
    const phone = searchParams.get("phone")

    if (draftId) params.set("draftId", draftId)
    if (licenseNumber) params.set("licenseNumber", licenseNumber)
    if (name) params.set("name", name)
    if (phone) params.set("phone", phone)

    const query = params.toString()
    const basePath = isOneMonth ? "/doctor-cv/payment/one-month" : "/doctor-cv/payment"
    return query ? `${basePath}?${query}` : basePath
  }, [isOneMonth, searchParams])

  const handleClose = () => {
    window.close()
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6 text-center sm:p-8">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
        <svg
          className="h-7 w-7 text-destructive"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-card-foreground">
        {isOneMonth ? "결제 실패" : "정기 결제 실패"}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        결제 처리 중 문제가 발생했습니다.
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {isOneMonth
          ? "결제 수단을 확인한 뒤 다시 시도해 주세요."
          : "카드 정보를 확인한 뒤 다시 시도해 주세요."}
      </p>

      <div className="mt-6 space-y-2">
        <Button type="button" className="h-12 w-full text-base font-semibold" asChild>
          <Link href={retryHref}>다시 시도</Link>
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-12 w-full text-base font-semibold"
          onClick={handleClose}
        >
          창 닫기
        </Button>
      </div>
    </div>
  )
}
