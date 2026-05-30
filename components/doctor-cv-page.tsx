import Script from "next/script"

import { DoctorCvAppShell } from "@/components/doctor-cv-app-shell"
import { SiteFooter } from "@/components/site-footer"

const doctorCvApiBase =
  "https://script.google.com/macros/s/AKfycbwH7GaSiju9geEcNr2kjLo6_ZT27TAiZF8wfD6VW4-3Mqt52qQzIwZylTJERz-vAbAPsQ/exec"

export function DoctorCvPage() {
  return (
    <>
      <link rel="stylesheet" href="/doctor-cv-app.css" />
      <Script
        src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="afterInteractive"
      />
      <Script
        src="/doctor-cv-app.js?v=20260530-opener"
        strategy="afterInteractive"
        data-doctor-cv-api-base={doctorCvApiBase}
      />
      <DoctorCvAppShell />
      <SiteFooter />
    </>
  )
}
