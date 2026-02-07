import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Directory } from "@/components/directory"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-6">
        {/* Hero text */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            병원 인테리어 업체 디렉토리
          </h1>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            검증된 병원 인테리어 전문 업체를 한눈에 비교하고, 견적을 요청하세요.
          </p>
        </div>
        <Directory />
      </main>
      <SiteFooter />
    </div>
  )
}
