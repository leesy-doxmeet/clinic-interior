"use client"

import Link from "next/link"
import { Building2, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Building2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">
            DOXMEET
          </span>
          <span className="hidden text-sm font-medium text-muted-foreground sm:inline">
            인테리어 디렉토리
          </span>
        </Link>

        {/* Desktop buttons */}
        <nav className="hidden items-center gap-2 md:flex">
          <Button variant="outline" asChild>
            <Link href="/register">업체 등록하기</Link>
          </Button>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex items-center justify-center rounded-md p-2 text-muted-foreground md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-card px-4 pb-4 pt-2 md:hidden">
          <nav className="flex flex-col gap-2">
            <Button variant="outline" asChild className="w-full bg-transparent" onClick={() => setMobileMenuOpen(false)}>
              <Link href="/register">업체 등록하기</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
