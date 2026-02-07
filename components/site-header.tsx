"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="w-full border-b border-border bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        {/* Left: Logo + Title */}
        <div className="flex min-w-0 items-center gap-3">
          {/* DOXMEET 로고 */}
          <a
            href="https://www.doxmeet.com"
            target="_blank"
            rel="noopener noreferrer"
            className="relative h-8 w-28 shrink-0 sm:w-36"
            aria-label="DOXMEET"
          >
            <Image
              src="/logos/doxmeet.png"
              alt="DOXMEET"
              fill
              className="object-contain object-left"
              sizes="144px"
              priority
            />
          </a>

          {/* 타이틀/설명 (모바일에서 줄바꿈/말줄임 안전) */}
          <div className="min-w-0 leading-tight">
            <div className="truncate text-base font-semibold text-foreground sm:text-lg">
              인테리어 업체 모음
            </div>
            <div className="hidden truncate text-xs text-muted-foreground sm:block">
              닥스밋에서 모은 병원 인테리어 업체 리스트입니다. 지속적으로 업데이트 됩니다.
            </div>
          </div>
        </div>

        {/* Right: Desktop buttons */}
        <div className="hidden items-center gap-2 sm:flex">
          {/* ✅ 같은 색(= outline)으로 통일 */}
          <Button variant="outline" asChild className="h-9">
            <a
              href="https://doxtalk.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              KMA 연수교육 캘린더
            </a>
          </Button>

          <Button variant="outline" asChild className="h-9">
            <Link href="/register">업체 등록하기</Link>
          </Button>
        </div>

        {/* Mobile: hamburger -> Sheet */}
        <div className="sm:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[280px]">
              <SheetHeader>
                <SheetTitle>메뉴</SheetTitle>
              </SheetHeader>

              <div className="mt-6 space-y-3">
                <Button variant="outline" asChild className="w-full">
                  <a
                    href="https://doxtalk.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                  >
                    KMA 연수교육 캘린더
                  </a>
                </Button>

                <Button variant="outline" asChild className="w-full">
                  <Link href="/register" onClick={() => setOpen(false)}>
                    업체 등록하기
                  </Link>
                </Button>

                {/* 모바일에서 설명도 보여주고 싶으면 */}
                <p className="pt-2 text-xs leading-relaxed text-muted-foreground">
                  닥스밋에서 모은 병원 인테리어 업체 리스트입니다. 지속적으로 업데이트 됩니다.
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
