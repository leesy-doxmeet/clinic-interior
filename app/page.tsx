import type { Metadata } from "next"
import Script from "next/script"

import { DoctorCvAppShell } from "@/components/doctor-cv-app-shell"

export const metadata: Metadata = {
  title: "의사 CV 입력 | DOXTALK",
  description: "의사 학력, 수련, 자격, 경력, 병원 정보를 입력하고 구조화된 CV로 정리하세요.",
}

export default function HomePage() {
  return (
    <>
      <link rel="stylesheet" href="/doctor-cv-app.css" />
      <Script id="doctor-cv-config" strategy="beforeInteractive">
        {`window.DOCTOR_CV_API_BASE = "https://script.google.com/macros/s/AKfycbwH7GaSiju9geEcNr2kjLo6_ZT27TAiZF8wfD6VW4-3Mqt52qQzIwZylTJERz-vAbAPsQ/exec";`}
      </Script>
      <Script
        src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="afterInteractive"
      />
      <Script src="/doctor-cv-app.js" strategy="afterInteractive" />
      <DoctorCvAppShell />
    </>
  )
}
