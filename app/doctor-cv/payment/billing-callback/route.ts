import { NextResponse } from "next/server"

export const runtime = "edge"

function getTossPaymentsAuthorizationHeader() {
  const secretKey = process.env.TOSS_PAYMENTS_SECRET_KEY
  if (!secretKey) {
    return ""
  }

  return `Basic ${btoa(`${secretKey}:`)}`
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const params = Object.fromEntries(url.searchParams.entries())

  const authorization = getTossPaymentsAuthorizationHeader()

  const issueRes = await fetch("https://api.tosspayments.com/v1/billing/authorizations/issue", {
    method: "POST",
    headers: {
      Authorization: authorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ authKey: params.authKey, customerKey: params.customerKey }),
  })

  const issueResult = await issueRes.json();

  const setPay = await fetch(`https://api.tosspayments.com/v1/billing/${issueResult.billingKey}`, {
    method: "POST",
    headers: {
      Authorization: authorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: 10000,
      customerKey: params.customerKey,
      orderId: "order_" + new Date().getTime(),
      orderName: "닥스밋 의사 프로필 정기 결제",
    }),
  })

  if (setPay.ok) {
    return NextResponse.redirect(new URL("/doctor-cv/payment/success", request.url), 303)
  }

  return NextResponse.redirect(new URL("/doctor-cv/payment/fail", request.url), 303)
}
