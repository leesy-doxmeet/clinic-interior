type TossPaymentsPaymentMethod = "CARD" | "TRANSFER"

type TossPaymentsRequestPaymentParams = {
  method: TossPaymentsPaymentMethod
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
    cashReceipt: { type: string }
    useEscrow: boolean
  }
}

type TossPaymentsRequestBillingAuthParams = {
  method: "CARD"
  successUrl: string
  failUrl: string
  customerEmail?: string
  customerName?: string
}

type TossPaymentsSdk = {
  payment: (options: { customerKey: string }) => {
    requestBillingAuth: (
      params: TossPaymentsRequestBillingAuthParams,
    ) => Promise<void>
    requestPayment: (params: TossPaymentsRequestPaymentParams) => Promise<void>
  }
}

interface Window {
  TossPayments?: (clientKey: string) => TossPaymentsSdk
}
