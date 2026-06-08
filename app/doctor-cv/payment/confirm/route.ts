import { NextResponse } from "next/server"

import { DOCTOR_CV_ONE_MONTH_AMOUNT } from "@/lib/doctor-cv-billing"
import {
  buildDoctorCvPaymentFailPath,
  buildDoctorCvPaymentSuccessPath,
  extractDoctorCvPaymentContextParams,
  getTossPaymentsAuthorizationHeader,
} from "@/lib/toss-payments-server"

export const runtime = "edge"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const context = extractDoctorCvPaymentContextParams(url.searchParams)
  const paymentKey = url.searchParams.get("paymentKey") || ""
  const orderId = url.searchParams.get("orderId") || ""
  const amount = Number(url.searchParams.get("amount") || "0")

  const failContext = {
    ...context,
    type: "one-month" as const,
  }

  if (!paymentKey || !orderId || amount !== DOCTOR_CV_ONE_MONTH_AMOUNT) {
    return NextResponse.redirect(
      new URL(buildDoctorCvPaymentFailPath(failContext), request.url),
      303
    )
  }

  const authorization = getTossPaymentsAuthorizationHeader()
  if (!authorization) {
    return NextResponse.redirect(
      new URL(buildDoctorCvPaymentFailPath(failContext), request.url),
      303
    )
  }

  const confirmRes = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
    method: "POST",
    headers: {
      Authorization: authorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      paymentKey,
      orderId,
      amount,
    }),
  })

  if (!confirmRes.ok) {
    return NextResponse.redirect(
      new URL(buildDoctorCvPaymentFailPath(failContext), request.url),
      303
    )
  }

  return NextResponse.redirect(
    new URL(
      buildDoctorCvPaymentSuccessPath({
        ...failContext,
        paymentKey,
        orderId,
      }),
      request.url
    ),
    303
  )
}
