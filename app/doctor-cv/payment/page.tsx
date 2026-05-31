import type { Metadata } from "next"
import { Suspense } from "react"

import { DoctorCvPaymentForm } from "@/components/doctor-cv-payment-form"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "환불·정기결제 정책 동의 | DOXTALK",
  description: "의사 CV 서비스 환불·정기결제 정책에 동의하고 카드를 등록합니다.",
}

export default function DoctorCvPaymentPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-md px-4 py-6">
        <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-card-foreground">환불·정기결제 정책 동의</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            정기 결제 등록을 위해 환불·정기결제 정책에 동의한 뒤 카드를 등록해주세요.
          </p>
          <div className="mt-6">
            <Suspense fallback={<p className="text-sm text-muted-foreground">불러오는 중...</p>}>
              <DoctorCvPaymentForm />
            </Suspense>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
