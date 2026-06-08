import { Suspense } from "react"

import { DoctorCvPaymentFailContent } from "@/components/doctor-cv-payment-fail-content"
import { SiteFooter } from "@/components/site-footer"

export default function DoctorCvPaymentFailPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-md px-4 py-6">
        <Suspense
          fallback={
            <div className="rounded-xl border border-border bg-card p-6 text-center sm:p-8">
              <p className="text-sm text-muted-foreground">불러오는 중...</p>
            </div>
          }
        >
          <DoctorCvPaymentFailContent />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  )
}
