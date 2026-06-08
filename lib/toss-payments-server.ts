import type { DoctorCvPaymentResultType } from "@/lib/doctor-cv-billing"

type TossPayment = {
  status?: string
  totalAmount?: number
  orderId?: string
}

export type DoctorCvPaymentContextParams = {
  type?: DoctorCvPaymentResultType
  paymentKey?: string
  orderId?: string
  draftId?: string
  licenseNumber?: string
  name?: string
  phone?: string
}

export function getTossPaymentsAuthorizationHeader() {
  const secretKey = process.env.TOSS_PAYMENTS_SECRET_KEY
  if (!secretKey) {
    return ""
  }

  return `Basic ${btoa(`${secretKey}:`)}`
}

export async function verifyTossPayment(
  paymentKey: string,
  options?: { expectedAmount?: number; orderId?: string }
): Promise<boolean> {
  const authorization = getTossPaymentsAuthorizationHeader()
  if (!authorization || !paymentKey) {
    return false
  }

  const response = await fetch(
    `https://api.tosspayments.com/v1/payments/${encodeURIComponent(paymentKey)}`,
    {
      method: "GET",
      headers: {
        Authorization: authorization,
      },
      cache: "no-store",
    }
  )

  if (!response.ok) {
    return false
  }

  const payment = (await response.json()) as TossPayment

  if (payment.status !== "DONE") {
    return false
  }

  if (
    options?.expectedAmount != null &&
    payment.totalAmount !== options.expectedAmount
  ) {
    return false
  }

  if (options?.orderId && payment.orderId !== options.orderId) {
    return false
  }

  return true
}

export function appendDoctorCvPaymentContextParams(
  target: URLSearchParams,
  params: DoctorCvPaymentContextParams
) {
  if (params.type) target.set("type", params.type)
  if (params.paymentKey) target.set("paymentKey", params.paymentKey)
  if (params.orderId) target.set("orderId", params.orderId)
  if (params.draftId) target.set("draftId", params.draftId)
  if (params.licenseNumber) target.set("licenseNumber", params.licenseNumber)
  if (params.name) target.set("name", params.name)
  if (params.phone) target.set("phone", params.phone)
}

export function buildDoctorCvPaymentFailPath(params: DoctorCvPaymentContextParams) {
  const search = new URLSearchParams()
  appendDoctorCvPaymentContextParams(search, params)
  search.delete("paymentKey")
  search.delete("orderId")

  const query = search.toString()
  return query ? `/doctor-cv/payment/fail?${query}` : "/doctor-cv/payment/fail"
}

export function buildDoctorCvPaymentSuccessPath(params: DoctorCvPaymentContextParams) {
  const search = new URLSearchParams()
  appendDoctorCvPaymentContextParams(search, params)

  const query = search.toString()
  return query ? `/doctor-cv/payment/success?${query}` : "/doctor-cv/payment/success"
}

export function extractDoctorCvPaymentContextParams(
  searchParams: URLSearchParams
): DoctorCvPaymentContextParams {
  const type = searchParams.get("type")

  return {
    type: type === "one-month" || type === "recurring" ? type : undefined,
    paymentKey: searchParams.get("paymentKey") || undefined,
    orderId: searchParams.get("orderId") || undefined,
    draftId: searchParams.get("draftId") || undefined,
    licenseNumber: searchParams.get("licenseNumber") || undefined,
    name: searchParams.get("name") || undefined,
    phone: searchParams.get("phone") || undefined,
  }
}
