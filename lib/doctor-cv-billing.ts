export const DOCTOR_CV_RECURRING_AMOUNT = 10000
export const DOCTOR_CV_ONE_MONTH_AMOUNT = 10000
export const DOCTOR_CV_ONE_MONTH_ORDER_NAME = "닥스밋 의사 프로필 1개월 결제"

export function formatDoctorCvMonthlyPrice(): string {
  return `월 ${DOCTOR_CV_RECURRING_AMOUNT.toLocaleString("ko-KR")}원(부가세 포함)`
}

export function formatDoctorCvOneMonthPrice(): string {
  return `${DOCTOR_CV_ONE_MONTH_AMOUNT.toLocaleString("ko-KR")}원(부가세 포함)`
}

export type DoctorCvPaymentResultType = "recurring" | "one-month"

export const TOSS_PAYMENTS_CLIENT_KEY =
  process.env.NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_AUTH ?? ""

export type DoctorCvPaymentPayload = {
  draftId?: string
  licenseNumber?: string
  name?: string
  phone?: string
  cardNumber: string
  cardExpiryMonth: string
  cardExpiryYear: string
  birthDate: string
  cardPassword: string
}
