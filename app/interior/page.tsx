import type { Metadata } from "next"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Directory } from "@/components/directory"

export const metadata: Metadata = {
  title: "병원인테리어 업체모음 | DOXTALK",
  description: "의사가 만나는 의사 닥스밋 - 병원 인테리어 업체를 한눈에 비교하세요.",
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Directory />
      </main>
      <SiteFooter />
    </div>
  )
}
