import type { Metadata } from "next"
import { Suspense } from "react"

import { DoctorCvOneMonthPaymentForm } from "@/components/doctor-cv-one-month-payment-form"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "1개월 결제 | DOXTALK",
  description: "의사 CV 서비스 1개월 결제를 진행합니다.",
}

export default function DoctorCvOneMonthPaymentPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-md px-4 py-6">
        <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-card-foreground">1개월 결제</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            신용·체크카드 또는 실시간 계좌이체로 1개월 이용권을 결제해주세요.
          </p>
          <div className="mt-6">
            <Suspense fallback={<p className="text-sm text-muted-foreground">불러오는 중...</p>}>
              <DoctorCvOneMonthPaymentForm />
            </Suspense>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
