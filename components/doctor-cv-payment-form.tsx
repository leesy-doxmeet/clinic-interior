"use client"

import { useCallback, useMemo, useState } from "react"
import Script from "next/script"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DOCTOR_CV_RECURRING_AMOUNT,
  formatDoctorCvMonthlyPrice,
  TOSS_PAYMENTS_CLIENT_KEY,
} from "@/lib/doctor-cv-billing"

declare global {
  interface Window {
    TossPayments?: (clientKey: string) => {
      payment: (options: { customerKey: string }) => {
        requestBillingAuth: (params: {
          method: "CARD"
          successUrl: string
          failUrl: string
          customerEmail?: string
          customerName?: string
        }) => Promise<void>
      }
    }
  }
}

function createCustomerKey() {
  return crypto.randomUUID().replace(/-/g, "")
}

export function DoctorCvPaymentForm() {
  const searchParams = useSearchParams()
  const draftId = searchParams.get("draftId") || ""
  const licenseNumber = searchParams.get("licenseNumber") || ""
  const name = searchParams.get("name") || ""
  const phone = searchParams.get("phone") || ""

  const [customerKey] = useState(createCustomerKey)
  const [sdkReady, setSdkReady] = useState(false)
  const [agreedRecurring, setAgreedRecurring] = useState(false)
  const [agreedPrivacy, setAgreedPrivacy] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const allAgreed = agreedRecurring && agreedPrivacy

  const callbackQuery = useMemo(() => {
    const params = new URLSearchParams()
    if (draftId) params.set("draftId", draftId)
    if (licenseNumber) params.set("licenseNumber", licenseNumber)
    if (name) params.set("name", name)
    if (phone) params.set("phone", phone)
    return params.toString()
  }, [draftId, licenseNumber, name, phone])

  const requestBillingAuth = useCallback(async () => {
    if (!allAgreed) {
      setErrorMessage("필수 약관에 모두 동의해주세요.")
      return
    }

    const TossPayments = window.TossPayments
    if (!TossPayments) {
      setErrorMessage("결제 모듈을 불러오는 중입니다. 잠시 후 다시 시도해주세요.")
      return
    }

    const origin = window.location.origin
    const successUrl = callbackQuery
      ? `${origin}/doctor-cv/payment/billing-callback?${callbackQuery}`
      : `${origin}/doctor-cv/payment/billing-callback`
    const failUrl = `${origin}/doctor-cv/payment/fail`

    try {
      setIsSubmitting(true)
      setErrorMessage("")

      const tossPayments = TossPayments(TOSS_PAYMENTS_CLIENT_KEY)
      const payment = tossPayments.payment({ customerKey })

      await payment.requestBillingAuth({
        method: "CARD",
        successUrl,
        failUrl,
        customerName: name || undefined,
      })
    } catch (error) {
      console.error("Doctor CV billing auth error:", error)
      setErrorMessage("카드 등록을 시작할 수 없습니다. 다시 시도해주세요.")
    } finally {
      setIsSubmitting(false)
    }
  }, [allAgreed, callbackQuery, customerKey, name])

  return (
    <>
      <Script
        src="https://js.tosspayments.com/v2/standard"
        strategy="afterInteractive"
        onLoad={() => setSdkReady(true)}
      />

      <div className="space-y-4">
        <div className="rounded-lg border border-border bg-muted/40 px-4 py-3">
          <p className="text-sm text-muted-foreground">정기 결제 금액</p>
          <p className="mt-1 text-xl font-bold text-foreground">
            {formatDoctorCvMonthlyPrice()}
          </p>
        </div>

        <div className="space-y-3 rounded-lg border border-border px-4 py-4">
          <p className="text-sm font-medium text-foreground">환불·정기결제 정책 동의</p>

          <label className="flex cursor-pointer items-start gap-3">
            <Checkbox
              checked={agreedRecurring}
              onCheckedChange={(checked) => {
                setErrorMessage("")
                setAgreedRecurring(checked === true)
              }}
              className="mt-0.5"
            />
            <span className="flex flex-1 flex-wrap items-baseline gap-x-1 text-sm leading-relaxed text-foreground">
              <span>
                <span className="font-medium text-primary">[필수]</span> 환불·정기결제 정책에
                동의합니다. 등록한 카드로 매월{" "}
                {DOCTOR_CV_RECURRING_AMOUNT.toLocaleString("ko-KR")}원(부가세 포함)이 자동 결제됩니다.
              </span>
              <a
                href="/about/refund"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => event.stopPropagation()}
                className="shrink-0 font-medium text-primary underline"
              >
                바로가기
              </a>
            </span>
          </label>

          <label className="flex cursor-pointer items-start gap-3">
            <Checkbox
              checked={agreedPrivacy}
              onCheckedChange={(checked) => {
                setErrorMessage("")
                setAgreedPrivacy(checked === true)
              }}
              className="mt-0.5"
            />
            <span className="flex flex-1 flex-wrap items-baseline gap-x-1 text-sm leading-relaxed text-foreground">
              <span>
                <span className="font-medium text-primary">[필수]</span> 결제 및 정기 결제 등록을
                위한 개인정보 수집·이용에 동의합니다.
              </span>
              <a
                href="https://www.doxmeet.com/about/privacy"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => event.stopPropagation()}
                className="shrink-0 font-medium text-primary underline"
              >
                바로가기
              </a>
            </span>
          </label>
        </div>

        {errorMessage ? (
          <p className="text-sm text-destructive" role="alert">
            {errorMessage}
          </p>
        ) : null}

        <Button
          type="button"
          className="mt-2 h-12 w-full text-base font-semibold"
          disabled={!allAgreed || !sdkReady || isSubmitting}
          onClick={requestBillingAuth}
        >
          {isSubmitting ? "이동 중..." : "카드 등록하기"}
        </Button>
      </div>
    </>
  )
}
