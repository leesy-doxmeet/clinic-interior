import { NextResponse } from "next/server"

import {
  DOCTOR_CV_RECURRING_AMOUNT,
  type DoctorCvPaymentPayload,
} from "@/lib/doctor-cv-billing"

const DOCTOR_CV_GAS_WEBAPP_URL =
  process.env.DOCTOR_CV_GAS_WEBAPP_URL ??
  "https://script.google.com/macros/s/AKfycbwH7GaSiju9geEcNr2kjLo6_ZT27TAiZF8wfD6VW4-3Mqt52qQzIwZylTJERz-vAbAPsQ/exec"

export const runtime = "edge"

export async function POST(request: Request) {
  let body: Partial<DoctorCvPaymentPayload> = {}

  try {
    body = (await request.json()) as Partial<DoctorCvPaymentPayload>
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 })
  }

  let customerKey = crypto.randomUUID()
  customerKey = customerKey.replace(/-/g, "")

  const params = {
    cardExpirationMonth: body.cardExpiryMonth,
    cardExpirationYear: body.cardExpiryYear,
    cardNumber: body.cardNumber,
    cardPassword: body.cardPassword,
    customerIdentityNumber: body.birthDate,
    customerKey: customerKey,
  }

  const setCard = await fetch("https://api.tosspayments.com/v1/billing/authorizations/card", {
    method: "POST",
    headers: {
      Authorization: `Basic ${process.env.TOSS_PAYMENTS_BASIC_AUTH}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })

  const setCardResult = await setCard.json()
  console.log("setCardResult : ", setCardResult)

  if (!setCard.ok || !setCardResult.billingKey) {
    return NextResponse.redirect(new URL("/doctor-cv/payment/fail", request.url), 303)
  }

  // const gasSave = await fetch(DOCTOR_CV_GAS_WEBAPP_URL, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "text/plain;charset=utf-8",
  //   },
  //   body: JSON.stringify({
  //     action: "saveRegularPayment",
  //     payload: {
  //       licence: body.licenseNumber ?? "",
  //       name: body.name ?? "",
  //       phon: body.phone ?? "",
  //       blilingKey: setCardResult.billingKey,
  //       customerKey: customerKey,
  //     },
  //   }),
  // })

  // let gasSaveResult: { ok?: boolean } | null = null
  // try {
  //   gasSaveResult = (await gasSave.json()) as { ok?: boolean }
  // } catch {
  //   return NextResponse.redirect(new URL("/doctor-cv/payment/fail", request.url), 303)
  // }

  // if (!gasSave.ok || !gasSaveResult || gasSaveResult.ok !== true) {
  //   return NextResponse.redirect(new URL("/doctor-cv/payment/fail", request.url), 303)
  // }

  const setPay = await fetch(`https://api.tosspayments.com/v1/billing/${setCardResult.billingKey}`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${process.env.TOSS_PAYMENTS_BASIC_AUTH}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: DOCTOR_CV_RECURRING_AMOUNT,
      customerKey: customerKey,
      orderId: "order_" + new Date().getTime(),
      orderName: "닥스밋 의사 프로필 정기 결제",
    }),
  })

  if (setPay.ok) {
    return NextResponse.redirect(new URL("/doctor-cv/payment/success", request.url), 303)
  }

  return NextResponse.redirect(new URL("/doctor-cv/payment/fail", request.url), 303)
}
