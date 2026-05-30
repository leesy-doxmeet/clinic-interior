"use client"

import Link from "next/link"

import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"

export default function DoctorCvPaymentFailPage() {
  const handleClose = () => {
    window.close()
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-md px-4 py-6">
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

          <h1 className="text-2xl font-bold text-card-foreground">정기 결제 실패</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            결제 처리 중 문제가 발생했습니다.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            카드 정보를 확인한 뒤 다시 시도해 주세요.
          </p>

          <div className="mt-6 space-y-2">
            <Button type="button" className="h-12 w-full text-base font-semibold" asChild>
              <Link href="/doctor-cv/payment">다시 시도</Link>
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
      </main>
      <SiteFooter />
    </div>
  )
}
