"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    __DOCTOR_CV_BOOT__?: () => void
  }
}

export function DoctorCvAppShell() {
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      window.__DOCTOR_CV_BOOT__?.()
    })

    return () => {
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return <div id="app" className="app-root" />
}
