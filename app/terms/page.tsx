export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-foreground">이용약관</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        이용약관은 DOXMEET 공식 페이지에서 확인하실 수 있습니다.
      </p>

      <a
        href="https://www.doxmeet.com/about/tos"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
      >
        DOXMEET 이용약관 보러가기
      </a>
    </div>
  )
}
