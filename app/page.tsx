import type { Metadata } from "next"

import { DoctorCvPage } from "@/components/doctor-cv-page"

export const metadata: Metadata = {
  title: "의사 CV 입력 | DOXTALK",
  description: "의사 학력, 수련, 자격, 경력, 병원 정보를 입력하고 구조화된 CV로 정리하세요.",
}

export default function HomePage() {
  return <DoctorCvPage />
}
