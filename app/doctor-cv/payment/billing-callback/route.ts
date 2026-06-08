import { NextResponse } from "next/server"

import { DOCTOR_CV_RECURRING_AMOUNT } from "@/lib/doctor-cv-billing"
import {
  buildDoctorCvPaymentFailPath,
  buildDoctorCvPaymentSuccessPath,
  extractDoctorCvPaymentContextParams,
  getTossPaymentsAuthorizationHeader,
} from "@/lib/toss-payments-server"

export const runtime = "edge"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const params = Object.fromEntries(url.searchParams.entries())
  const context = extractDoctorCvPaymentContextParams(url.searchParams)
  const failContext = {
    ...context,
    type: "recurring" as const,
  }

  const authorization = getTossPaymentsAuthorizationHeader()
  if (!authorization || !params.authKey || !params.customerKey) {
    return NextResponse.redirect(
      new URL(buildDoctorCvPaymentFailPath(failContext), request.url),
      303
    )
  }

  const issueRes = await fetch("https://api.tosspayments.com/v1/billing/authorizations/issue", {
    method: "POST",
    headers: {
      Authorization: authorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ authKey: params.authKey, customerKey: params.customerKey }),
  })

  const issueResult = await issueRes.json()

  if (!issueRes.ok || !issueResult.billingKey) {
    return NextResponse.redirect(
      new URL(buildDoctorCvPaymentFailPath(failContext), request.url),
      303
    )
  }

  const orderId = `order_${Date.now()}`

  const billingPaymentBody: {
    amount: number
    customerKey: string
    orderId: string
    orderName: string
    customerName?: string
  } = {
    amount: DOCTOR_CV_RECURRING_AMOUNT,
    customerKey: params.customerKey,
    orderId,
    orderName: "닥스밋 의사 프로필 정기 결제",
  }

  if (context.name) {
    billingPaymentBody.customerName = context.name
  }

  const setPay = await fetch(`https://api.tosspayments.com/v1/billing/${issueResult.billingKey}`, {
    method: "POST",
    headers: {
      Authorization: authorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(billingPaymentBody),
  })

  const setPayResult = await setPay.json()

  if (!setPay.ok || !setPayResult.paymentKey) {
    return NextResponse.redirect(
      new URL(buildDoctorCvPaymentFailPath(failContext), request.url),
      303
    )
  }

  return NextResponse.redirect(
    new URL(
      buildDoctorCvPaymentSuccessPath({
        ...failContext,
        paymentKey: setPayResult.paymentKey,
        orderId: setPayResult.orderId || orderId,
      }),
      request.url
    ),
    303
  )
}
