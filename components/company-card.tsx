import Image from "next/image"
import { Instagram, Globe, MapPin } from "lucide-react"
import type { Company } from "@/lib/companies"

export function CompanyCard({ company }: { company: Company }) {
  return (
    <div className="group rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start gap-4">
        {/* Logo */}
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
          <Image
            src={company.logo || "/placeholder.svg"}
            alt={`${company.name} 로고`}
            fill
            className="object-cover"
            sizes="56px"
          />
        </div>

        <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-semibold text-card-foreground">
              {company.name}
            </h3>
            <div className="mt-1.5 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span>{company.region}</span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            {company.instagram ? (
              <a
                href={company.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label={`${company.name} 인스타그램`}
              >
                <Instagram className="h-4 w-4" />
              </a>
            ) : (
              <span
                className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-lg bg-muted text-muted-foreground/40"
                aria-label="인스타그램 링크 없음"
              >
                <Instagram className="h-4 w-4" />
              </span>
            )}

            {company.website ? (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label={`${company.name} 홈페이지`}
              >
                <Globe className="h-4 w-4" />
              </a>
            ) : (
              <span
                className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-lg bg-muted text-muted-foreground/40"
                aria-label="홈페이지 링크 없음"
              >
                <Globe className="h-4 w-4" />
              </span>
            )}
          </div>
        </div>
      </div>

      {company.description && (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {company.description}
        </p>
      )}
    </div>
  )
}
