import Link from "next/link"
import Image from "next/image"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card text-muted-foreground">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Top row: logo + nav links */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <Link href="/" className="relative h-8 w-32">
            <Image
              src="/logos/doxmeet-logo.jpg"
              alt="DOXMEET 로고"
              fill
              className="object-contain object-left"
              sizes="128px"
            />
          </Link>
          <nav className="flex flex-wrap items-center gap-4 text-sm">
            <Link
              href="/terms"
              className="transition-colors hover:text-foreground"
            >
              이용약관
            </Link>
            <span className="text-border">|</span>
            <Link
              href="/sitemap-page"
              className="transition-colors hover:text-foreground"
            >
              사이트맵
            </Link>
          </nav>
        </div>

        {/* Divider */}
        <div className="my-5 h-px bg-border" />

        {/* Info section */}
        <div className="space-y-1.5 text-xs leading-relaxed">
          <p>
            <span className="font-medium text-foreground">닥스밋(DOXMEET)</span>
            {" | 대표 : 홍길동 | 사업자등록번호 : 000-00-00000"}
          </p>
          <p>
            {"주소 : 서울특별시 강남구 테헤란로 123, 4층"}
          </p>
          <p>
            {"Tel : 02-000-0000 | Fax : 02-000-0001 | Email : contact@doxmeet.kr"}
          </p>
        </div>

        {/* Copyright */}
        <p className="mt-5 text-xs text-muted-foreground/60">
          {"Copyright \u00A9 2026 DOXMEET. All Rights Reserved."}
        </p>
      </div>
    </footer>
  )
}
