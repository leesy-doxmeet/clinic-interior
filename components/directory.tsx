"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Search, FileText, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react"
import type { Company } from "@/lib/companies"
import { CompanyCard } from "@/components/company-card"

const ITEMS_PER_PAGE = 19

// ✅ 요청한 순서로 고정 (복수선택 가능)
const REGION_OPTIONS = [
  "서울",
  "경기",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "강원",
  "제주",
] as const

type Region = (typeof REGION_OPTIONS)[number]

// ✅ "서울,경기" / "경기 " 같은 값을 ["서울","경기"] 형태로 표준화
function parseRegions(value: string | undefined | null): string[] {
  return String(value ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
}

export function Directory() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)

  const [excludeSeoul, setExcludeSeoul] = useState(false)
  const [selectedRegions, setSelectedRegions] = useState<Region[]>([])
  const [regionPanelOpen, setRegionPanelOpen] = useState(false)

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
      const regions = parseRegions(company.region) // ["서울","경기"] 형태

      // ✅ 서울 제외 (단일/복수 모두 처리)
      if (excludeSeoul && regions.includes("서울")) return false

      // ✅ 다중 지역 필터(OR): 선택된 지역이 하나라도 포함되면 통과
      if (selectedRegions.length > 0) {
        const hit = selectedRegions.some((r) => regions.includes(r))
        if (!hit) return false
      }

      // ✅ 검색(업체명/설명)
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        const nameOk = (company.name || "").toLowerCase().includes(q)
        const descOk = (company.description || "").toLowerCase().includes(q)
        if (!nameOk && !descOk) return false
      }

      return true
    })
  }, [companies, excludeSeoul, selectedRegions, searchQuery])

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

  const toggleRegion = (region: Region) => {
    setSelectedRegions((prev) => {
      const exists = prev.includes(region)
      const next = exists ? prev.filter((r) => r !== region) : [...prev, region]
      return next
    })
    setCurrentPage(1)
  }

  const clearRegions = () => {
    setSelectedRegions([])
    setCurrentPage(1)
  }

  const selectedCount = selectedRegions.length

  return (
    <div>
      {/* Filter bar */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex flex-col gap-3">
          {/* Row 1: Search + 서울 제외 */}
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

            {/* 서울 제외 보기 */}
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

          {/* Row 2: 지역선택 버튼 (처음엔 숨김, 누르면 펼쳐짐) */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setRegionPanelOpen((v) => !v)}
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                aria-expanded={regionPanelOpen}
                aria-controls="region-panel"
              >
                지역선택
                {selectedCount > 0 && (
                  <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                    {selectedCount}개 선택
                  </span>
                )}
                {regionPanelOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              {selectedCount > 0 && (
                <button
                  type="button"
                  onClick={clearRegions}
                  className="h-10 rounded-lg px-3 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
                >
                  선택 해제
                </button>
              )}
            </div>

            {/* 펼쳐지는 지역 체크박스 패널 */}
            {regionPanelOpen && (
              <div
                id="region-panel"
                className="rounded-xl border border-border bg-background p-3"
              >
                <p className="mb-2 text-sm text-muted-foreground">
                  지역 선택 (복수 선택 가능)
                </p>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                  {REGION_OPTIONS.map((region) => {
                    const checked = selectedRegions.includes(region)
                    return (
                      <label
                        key={region}
                        className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm hover:bg-accent"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleRegion(region)}
                          className="h-4 w-4 rounded border-input accent-primary"
                        />
                        <span className="text-foreground">{region}</span>
                      </label>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
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
