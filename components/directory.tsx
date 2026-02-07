"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Search, FileText, ChevronLeft, ChevronRight } from "lucide-react"
import type { Company } from "@/lib/companies"
import { CompanyCard } from "@/components/company-card"

const ITEMS_PER_PAGE = 20

export function Directory() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)

  const [excludeSeoul, setExcludeSeoul] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  // ✅ public/data/companies.json에서 업체 목록 불러오기
  useEffect(() => {
    let alive = true
    setLoading(true)

    fetch("/data/companies.json", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (!alive) return
        setCompanies(Array.isArray(data) ? data : [])
      })
      .catch((err) => {
        console.error("companies.json load error:", err)
        if (!alive) return
        setCompanies([])
      })
      .finally(() => {
        if (!alive) return
        setLoading(false)
      })

    return () => {
      alive = false
    }
  }, [])

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      if (excludeSeoul && company.region === "서울") return false

      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        const nameOk = (company.name || "").toLowerCase().includes(q)
        const descOk = (company.description || "").toLowerCase().includes(q)
        if (!nameOk && !descOk) return false
      }

      return true
    })
  }, [companies, excludeSeoul, searchQuery])

  const totalPages = Math.max(1, Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE))
  const paginatedCompanies = filteredCompanies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleExcludeSeoulChange = (checked: boolean) => {
    setExcludeSeoul(checked)
    setCurrentPage(1)
  }
  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  return (
    <div>
      {/* Filter bar */}
      <div className="rounded-xl border border-border bg-card p-4">
        {/* ✅ 모바일: 세로(검색 아래 체크박스) / 데스크탑: 가로(검색 오른쪽 체크박스) */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="업체명 검색..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="업체명 검색"
            />
          </div>

          {/* ✅ 서울 제외 보기: 데스크탑에서는 검색창 오른쪽 / 모바일에서는 검색창 아래 */}
          <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground sm:shrink-0">
            <input
              type="checkbox"
              checked={excludeSeoul}
              onChange={(e) => handleExcludeSeoulChange(e.target.checked)}
              className="h-4 w-4 rounded border-input accent-primary"
            />
            <span>서울 제외 보기</span>
          </label>
        </div>
      </div>

      {/* Results count */}
      <div className="mt-4 flex items-center justify-between px-1">
        <p className="text-sm text-muted-foreground">
          총 <span className="font-semibold text-foreground">{filteredCompanies.length}</span>개 업체
        </p>
      </div>

      {/* Company list */}
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {/* Quote CTA card - always first */}
        <Link
          href="/quote"
          className="group relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-primary/40 bg-accent p-5 text-center transition-all hover:border-primary hover:bg-primary/10 hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-110">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <p className="text-base font-semibold text-foreground">닥스밋 무료 개원 상담 신청</p>
            <p className="mt-1 text-sm text-muted-foreground">
              기본정보를 입력해주시면 닥스밋 담당이 연락드립니다.
            </p>
          </div>
        </Link>

        {loading ? (
          <div className="col-span-full rounded-xl border border-dashed border-border bg-card py-16 text-center">
            <p className="text-base font-medium text-foreground">업체 목록 불러오는 중...</p>
            <p className="mt-1 text-sm text-muted-foreground">잠시만 기다려주세요</p>
          </div>
        ) : paginatedCompanies.length > 0 ? (
          paginatedCompanies.map((company) => <CompanyCard key={company.id} company={company} />)
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16 text-center">
            <Search className="mb-3 h-10 w-10 text-muted-foreground/40" />
            <p className="text-base font-medium text-foreground">검색 결과가 없습니다</p>
            <p className="mt-1 text-sm text-muted-foreground">다른 검색어를 사용해 보세요</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="이전 페이지"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm font-medium transition-colors ${
                page === currentPage
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-foreground hover:bg-accent"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="다음 페이지"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}
