"use client"

import { useCallback, useMemo, useState } from "react"
import Script from "next/script"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  DOCTOR_CV_ONE_MONTH_AMOUNT,
  DOCTOR_CV_ONE_MONTH_ORDER_NAME,
  formatDoctorCvOneMonthPrice,
  TOSS_PAYMENTS_CLIENT_KEY,
} from "@/lib/doctor-cv-billing"

type OneMonthPaymentMethod = "CARD" | "TRANSFER"

declare global {
  interface Window {
    TossPayments?: (clientKey: string) => {
      payment: (options: { customerKey: string }) => {
        requestPayment: (params: {
          method: OneMonthPaymentMethod
          amount: { currency: "KRW"; value: number }
          orderId: string
          orderName: string
          successUrl: string
          failUrl: string
          customerName?: string
          card?: {
            useEscrow: boolean
            flowMode: "DEFAULT"
            useCardPoint: boolean
            useAppCardOnly: boolean
          }
          transfer?: {
            cashReceipt: { type: "소득공제" }
            useEscrow: boolean
          }
        }) => Promise<void>
      }
    }
  }
}

function createCustomerKey() {
  return crypto.randomUUID().replace(/-/g, "")
}

function createOrderId() {
  const suffix = crypto.randomUUID().replace(/-/g, "").slice(0, 12)
  return `cv1m${Date.now()}${suffix}`
}

export function DoctorCvOneMonthPaymentForm() {
  const searchParams = useSearchParams()
  const draftId = searchParams.get("draftId") || ""
  const licenseNumber = searchParams.get("licenseNumber") || ""
  const name = searchParams.get("name") || ""
  const phone = searchParams.get("phone") || ""

  const [customerKey] = useState(createCustomerKey)
  const [paymentMethod, setPaymentMethod] = useState<OneMonthPaymentMethod>("CARD")
  const [sdkReady, setSdkReady] = useState(false)
  const [agreedRefund, setAgreedRefund] = useState(false)
  const [agreedPrivacy, setAgreedPrivacy] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const allAgreed = agreedRefund && agreedPrivacy

  const callbackQuery = useMemo(() => {
    const params = new URLSearchParams()
    params.set("type", "one-month")
    if (draftId) params.set("draftId", draftId)
    if (licenseNumber) params.set("licenseNumber", licenseNumber)
    if (name) params.set("name", name)
    if (phone) params.set("phone", phone)
    return params.toString()
  }, [draftId, licenseNumber, name, phone])

  const requestOneMonthPayment = useCallback(async () => {
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
    const successUrl = `${origin}/doctor-cv/payment/confirm?${callbackQuery}`
    const failUrl = `${origin}/doctor-cv/payment/fail?${callbackQuery}`

    try {
      setIsSubmitting(true)
      setErrorMessage("")

      const tossPayments = TossPayments(TOSS_PAYMENTS_CLIENT_KEY)
      const payment = tossPayments.payment({ customerKey })
      const orderId = createOrderId()

      const commonParams = {
        amount: {
          currency: "KRW" as const,
          value: DOCTOR_CV_ONE_MONTH_AMOUNT,
        },
        orderId,
        orderName: DOCTOR_CV_ONE_MONTH_ORDER_NAME,
        successUrl,
        failUrl,
        customerName: name || undefined,
      }

      if (paymentMethod === "CARD") {
        await payment.requestPayment({
          method: "CARD",
          ...commonParams,
          card: {
            useEscrow: false,
            flowMode: "DEFAULT",
            useCardPoint: false,
            useAppCardOnly: false,
          },
        })
        return
      }

      await payment.requestPayment({
        method: "TRANSFER",
        ...commonParams,
        transfer: {
          cashReceipt: { type: "소득공제" },
          useEscrow: false,
        },
      })
    } catch (error) {
      console.error("Doctor CV one-month payment error:", error)
      setErrorMessage("결제를 시작할 수 없습니다. 다시 시도해주세요.")
    } finally {
      setIsSubmitting(false)
    }
  }, [allAgreed, callbackQuery, customerKey, name, paymentMethod])

  return (
    <>
      <Script
        src="https://js.tosspayments.com/v2/standard"
        strategy="afterInteractive"
        onLoad={() => setSdkReady(true)}
      />

      <div className="space-y-4">
        <div className="rounded-lg border border-border bg-muted/40 px-4 py-3">
          <p className="text-sm text-muted-foreground">1개월 결제 금액</p>
          <p className="mt-1 text-xl font-bold text-foreground">
            {formatDoctorCvOneMonthPrice()}
          </p>
        </div>

        <div className="space-y-3 rounded-lg border border-border px-4 py-4">
          <p className="text-sm font-medium text-foreground">결제 수단</p>
          <RadioGroup
            value={paymentMethod}
            onValueChange={(value) => {
              setErrorMessage("")
              setPaymentMethod(value as OneMonthPaymentMethod)
            }}
            className="grid gap-3"
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="CARD" id="payment-method-card" />
              <Label htmlFor="payment-method-card" className="text-sm font-normal">
                신용·체크카드
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="TRANSFER" id="payment-method-transfer" />
              <Label htmlFor="payment-method-transfer" className="text-sm font-normal">
                실시간 계좌이체
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3 rounded-lg border border-border px-4 py-4">
          <p className="text-sm font-medium text-foreground">결제 전 동의</p>

          <label className="flex cursor-pointer items-start gap-3">
            <Checkbox
              checked={agreedRefund}
              onCheckedChange={(checked) => {
                setErrorMessage("")
                setAgreedRefund(checked === true)
              }}
              className="mt-0.5"
            />
            <span className="flex flex-1 flex-wrap items-baseline gap-x-1 text-sm leading-relaxed text-foreground">
              <span>
                <span className="font-medium text-primary">[필수]</span> 환불·정기결제 정책에
                동의합니다.
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
                <span className="font-medium text-primary">[필수]</span> 결제를 위한 개인정보
                수집·이용에 동의합니다.
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
          onClick={requestOneMonthPayment}
        >
          {isSubmitting ? "이동 중..." : "결제하기"}
        </Button>
      </div>
    </>
  )
}
