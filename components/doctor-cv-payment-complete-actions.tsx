"use client"

import { useEffect } from "react"

import { Button } from "@/components/ui/button"

type DoctorCvPaymentCompleteActionsProps = {
  notifyOpenerOnMount?: boolean
}

export function DoctorCvPaymentCompleteActions({
  notifyOpenerOnMount = false,
}: DoctorCvPaymentCompleteActionsProps) {
  useEffect(() => {
    if (!notifyOpenerOnMount) {
      return
    }

    const payload = { type: "doctor-cv-payment-success" }

    if (window.opener && !window.opener.closed) {
      window.opener.postMessage(payload, window.location.origin)
      window.opener.focus()
    }

    try {
      const BroadcastChannelCtor = window.BroadcastChannel
      const channel = new BroadcastChannelCtor("doctor-cv-payment")
      channel.postMessage(payload)
      channel.close()
    } catch {
      // BroadcastChannel 미지원 환경은 postMessage만 사용
    }
  }, [notifyOpenerOnMount])

  const handleClose = () => {
    window.close()
  }

  return (
    <Button type="button" className="mt-6 h-12 w-full text-base font-semibold" onClick={handleClose}>
      확인
    </Button>
  )
}
