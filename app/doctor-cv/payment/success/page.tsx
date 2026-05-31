import type { Metadata } from "next"

import { DoctorCvPaymentCompleteActions } from "@/components/doctor-cv-payment-complete-actions"
import { SiteFooter } from "@/components/site-footer"
import { DOCTOR_CV_RECURRING_AMOUNT } from "@/lib/doctor-cv-billing"

export const metadata: Metadata = {
  title: "정기 결제 성공 | DOXTALK",
  description: "의사 CV 서비스 정기 결제가 완료되었습니다.",
}

export default function DoctorCvPaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-md px-4 py-6">
        <div className="rounded-xl border border-border bg-card p-6 text-center sm:p-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <svg
              className="h-7 w-7 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-card-foreground">정기 결제 성공</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            월 {DOCTOR_CV_RECURRING_AMOUNT.toLocaleString("ko-KR")}원 정기 결제가 완료되었습니다.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            CV 입력 화면으로 돌아가 계속 진행해 주세요.
          </p>

          <DoctorCvPaymentCompleteActions notifyOpenerOnMount />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
