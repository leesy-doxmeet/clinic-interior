import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RegisterForm } from "@/components/register-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "업체 등록 - DOXMEET 인테리어 디렉토리",
  description: "DOXMEET 인테리어 디렉토리에 업체를 등록하세요",
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 py-6">
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          디렉토리로 돌아가기
        </Link>

        <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-card-foreground">업체 등록</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            아래 정보를 입력하시면 검토 후 디렉토리에 등록됩니다.
          </p>
          <div className="mt-6">
            <RegisterForm />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
