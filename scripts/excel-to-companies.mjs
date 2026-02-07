import fs from "fs"
import path from "path"
import xlsx from "xlsx"

// 경로 설정
const INPUT = path.join(process.cwd(), "data", "companies.xlsx")
const OUTPUT_DIR = path.join(process.cwd(), "public", "data")
const OUTPUT = path.join(OUTPUT_DIR, "companies.json")

function cleanUrl(v) {
  const s = String(v ?? "").trim()
  if (!s || s.toUpperCase() === "X") return ""
  if (s.startsWith("http://") || s.startsWith("https://")) return s
  return ""
}

function cleanText(v) {
  return String(v ?? "").trim()
}

function normalizeKeys(obj) {
  const result = {}
  for (const key of Object.keys(obj)) {
    result[key.toLowerCase()] = obj[key]
  }
  return result
}

// ✅ 로고 파일 존재하면 png > jpg > webp 순으로 선택
function pickLogoPath(id) {
  const candidates = [
    `/logos/${id}.png`,
    `/logos/${id}.jpg`,
    `/logos/${id}.jpeg`,
    `/logos/${id}.webp`,
  ]

  for (const urlPath of candidates) {
    const filePath = path.join(process.cwd(), "public", urlPath.replace(/^\//, ""))
    if (fs.existsSync(filePath)) return urlPath
  }

  // 없으면 빈 값 (CompanyCard에서 이니셜로 대체)
  return ""
}

function main() {
  console.log("====================================")
  console.log("📁 INPUT 경로:", INPUT)
  console.log("📁 OUTPUT 경로:", OUTPUT)
  console.log("====================================")

  if (!fs.existsSync(INPUT)) {
    console.error(`❌ 엑셀 파일이 없습니다: ${INPUT}`)
    console.error(`👉 data/companies.xlsx 로 파일을 넣어주세요`)
    process.exit(1)
  }

  console.log("✅ 엑셀 파일 찾음")

  const wb = xlsx.readFile(INPUT)
  const sheetName = wb.SheetNames[0]
  const ws = wb.Sheets[sheetName]

  const rawRows = xlsx.utils.sheet_to_json(ws, { defval: "" })
  console.log(`📄 엑셀에서 읽은 행 수: ${rawRows.length}`)

  const companies = rawRows
    .map((row, index) => {
      const r = normalizeKeys(row)

      const id = Number(r.no || r.id || 0) || 0
      const name = cleanText(r.name)
      const region = cleanText(r.region)

      if (!id || !name || !region) {
        console.warn(`⚠️ ${index + 1}번째 행 무시됨 (필수값 부족):`, { id, name, region })
        return null
      }

      // ✅ 로고 자동 매칭: public/logos/{id}.png 등
      const logo = pickLogoPath(id)

      return {
        id,
        name,
        region,
        logo,
        instagram: cleanUrl(r.insta_hp || r.insta || r.instagram),
        website: cleanUrl(r.official_hp || r.website || r.homepage),
        description: cleanText(r.description || ""),
      }
    })
    .filter(Boolean)
    .sort((a, b) => a.id - b.id)

  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  fs.writeFileSync(OUTPUT, JSON.stringify(companies, null, 2), "utf-8")

  const logoCount = companies.filter((c) => c.logo).length

  console.log("====================================")
  console.log(`✅ 생성 완료: ${OUTPUT}`)
  console.log(`✅ 변환된 업체 수: ${companies.length}`)
  console.log(`🖼️ 로고 매칭된 업체 수: ${logoCount}`)
  console.log("====================================")
}

main()
