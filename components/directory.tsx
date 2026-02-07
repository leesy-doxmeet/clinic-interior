"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, ChevronDown, SlidersHorizontal, FileText, ChevronLeft, ChevronRight } from "lucide-react"
import { companies, REGIONS } from "@/lib/companies"
import { CompanyCard } from "@/components/company-card"

const ITEMS_PER_PAGE = 20

export function Directory() {
  const [selectedRegion, setSelectedRegion] = useState("전체")
  const [excludeSeoul, setExcludeSeoul] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      // Region filter
      if (selectedRegion !== "전체" && company.region !== selectedRegion) {
        return false
      }
      // Exclude Seoul
      if (excludeSeoul && company.region === "서울") {
        return false
      }
      // Search query
      if (
        searchQuery &&
        !company.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !company.description?.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }
      return true
    })
  }, [selectedRegion, excludeSeoul, searchQuery])

  // Reset page when filters change
  const totalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE)
  const paginatedCompanies = filteredCompanies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // Reset to page 1 when filters change
  const handleRegionChange = (value: string) => {
    setSelectedRegion(value)
    setCurrentPage(1)
  }
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
        <div className="flex items-center gap-2 pb-3 text-sm font-medium text-foreground">
          <SlidersHorizontal className="h-4 w-4" />
          <span>필터</span>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Region dropdown */}
          <div className="relative">
            <select
              value={selectedRegion}
              onChange={(e) => handleRegionChange(e.target.value)}
              className="h-10 w-full appearance-none rounded-lg border border-input bg-background py-2 pl-3 pr-9 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring sm:w-40"
              aria-label="지역 선택"
            >
              {REGIONS.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>

          {/* Exclude Seoul checkbox */}
          <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={excludeSeoul}
              onChange={(e) => handleExcludeSeoulChange(e.target.checked)}
              className="h-4 w-4 rounded border-input accent-primary"
            />
            <span>서울 제외 보기</span>
          </label>

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
            <p className="text-base font-semibold text-foreground">닥스밋에 견적 요청하기</p>
            <p className="mt-1 text-sm text-muted-foreground">
              기본정보를 입력해주시면 닥스밋 담당이 연락드립니다.
            </p>
          </div>
        </Link>

        {paginatedCompanies.length > 0 ? (
          paginatedCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16 text-center">
            <Search className="mb-3 h-10 w-10 text-muted-foreground/40" />
            <p className="text-base font-medium text-foreground">검색 결과가 없습니다</p>
            <p className="mt-1 text-sm text-muted-foreground">
              다른 검색어나 필터를 사용해 보세요
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
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
