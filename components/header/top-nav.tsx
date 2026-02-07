"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Left: Brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-base font-semibold text-foreground">
            DOXTALK
          </span>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            병원 인테리어
          </span>
        </Link>

        {/* Center/Right: Nav */}
        <nav className="flex items-center gap-2">
          <Link href="/directory" className="text-sm font-medium text-foreground hover:underline">
            업체 목록
          </Link>
          <Link href="/quote" className="text-sm font-medium text-foreground hover:underline">
            견적 요청
          </Link>
          <Link href="/register" className="text-sm font-medium text-foreground hover:underline">
            업체 등록
          </Link>

          <Button asChild className="ml-2 h-9">
            <Link href="/quote">무료 견적 요청</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
