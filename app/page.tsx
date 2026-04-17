import fs from "node:fs"
import path from "node:path"
import type { Metadata } from "next"
import Script from "next/script"

import { DoctorCvAppShell } from "@/components/doctor-cv-app-shell"

export const metadata: Metadata = {
  title: "의사 CV 입력 | DOXTALK",
  description: "의사 학력, 수련, 자격, 경력, 병원 정보를 입력하고 구조화된 CV로 정리하세요.",
}

function readDoctorCvStyles() {
  return fs.readFileSync(path.join(process.cwd(), "doctor-cv-assets", "doctor-cv-app.css"), "utf8")
}

export default function HomePage() {
  const styles = readDoctorCvStyles()

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <Script id="doctor-cv-config" strategy="beforeInteractive">
        {`window.DOCTOR_CV_API_BASE = "/api/doctor-cv";`}
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
