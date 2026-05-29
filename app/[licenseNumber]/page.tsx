import { notFound } from "next/navigation"
import type { Metadata } from "next"

import { DoctorCvPage } from "@/components/doctor-cv-page"

export const runtime = "edge"

type LicenseHomepagePageProps = {
  params: Promise<{
    licenseNumber: string
  }>
}

export async function generateMetadata({ params }: LicenseHomepagePageProps): Promise<Metadata> {
  const { licenseNumber } = await params
  const normalizedLicenseNumber = normalizeLicenseNumberParam(licenseNumber)

  return {
    title: normalizedLicenseNumber ? `의료진 홈페이지 ${normalizedLicenseNumber} | DOXTALK` : "의료진 홈페이지 | DOXTALK",
    description: "의사 CV 제출 정보가 적용된 의료진 홈페이지입니다.",
  }
}

export default async function LicenseHomepagePage({ params }: LicenseHomepagePageProps) {
  const { licenseNumber } = await params
  if (!normalizeLicenseNumberParam(licenseNumber)) {
    notFound()
  }

  return <DoctorCvPage />
}

function normalizeLicenseNumberParam(value: string) {
  return value.replace(/[^0-9]/g, "")
}
