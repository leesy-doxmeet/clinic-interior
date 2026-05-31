export const DOCTOR_CV_RECURRING_AMOUNT = 10000

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
