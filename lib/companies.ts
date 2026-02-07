export interface Company {
  id: number
  name: string
  region: string
  logo: string
  instagram?: string
  website?: string
  description?: string
}

export const REGIONS = [
  "전체",
  "서울",
  "경기",
  "인천",
  "대전",
  "부산",
  "대구",
  "광주",
  "울산",
  "세종",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
] as const

export const companies: Company[] = [
  {
    id: 1,
    name: "메디플랜 디자인",
    region: "서울",
    logo: "/logos/mediplan.jpg",
    instagram: "https://instagram.com/mediplan_design",
    website: "https://mediplan.co.kr",
    description: "병원 전문 인테리어 15년 경력, 개원부터 리모델링까지",
  },
  {
    id: 2,
    name: "클린메디 인테리어",
    region: "서울",
    logo: "/logos/cleanmedi.jpg",
    instagram: "https://instagram.com/cleanmedi",
    description: "감염관리 기준에 맞는 의료공간 설계 전문",
  },
  {
    id: 3,
    name: "뉴라인 건축사무소",
    region: "경기",
    logo: "/logos/newline.jpg",
    website: "https://newline-arch.co.kr",
    description: "건축설계부터 인테리어까지 원스톱 서비스",
  },
  {
    id: 4,
    name: "헬스케어 스페이스",
    region: "경기",
    logo: "/logos/hcspace.jpg",
    instagram: "https://instagram.com/healthcare_space",
    website: "https://hcspace.kr",
    description: "환자 중심 공간설계, 치과/안과/피부과 다수 실적",
  },
  {
    id: 5,
    name: "메디컬 인테리어 그룹",
    region: "인천",
    logo: "/logos/medical-group.jpg",
    description: "인천/경기 서부 지역 병원 인테리어 전문",
  },
  {
    id: 6,
    name: "프라임 메디 디자인",
    region: "부산",
    logo: "/logos/prime-medi.jpg",
    instagram: "https://instagram.com/prime_medi",
    website: "https://primemedi.co.kr",
    description: "부산/경남 지역 1위 병원 인테리어 업체",
  },
  {
    id: 7,
    name: "더블루 메디컬",
    region: "대전",
    logo: "/logos/theblue.jpg",
    website: "https://theblue-medical.kr",
    description: "대전/충청 지역 의료공간 전문 시공",
  },
  {
    id: 8,
    name: "메디아트 스튜디오",
    region: "대구",
    logo: "/logos/mediart.jpg",
    instagram: "https://instagram.com/mediart_studio",
    description: "감각적인 병원 인테리어 디자인",
  },
  {
    id: 9,
    name: "그린메디 건축",
    region: "광주",
    logo: "/logos/greenmedi.jpg",
    website: "https://greenmedi.co.kr",
    description: "친환경 자재를 활용한 의료공간 설계",
  },
  {
    id: 10,
    name: "메디홈 인테리어",
    region: "서울",
    logo: "/logos/medihome.jpg",
    instagram: "https://instagram.com/medihome_interior",
    website: "https://medihome.co.kr",
    description: "소규모 의원 개원 패키지 전문",
  },
  {
    id: 11,
    name: "드림메디 디자인",
    region: "경기",
    logo: "/logos/dreammedi.jpg",
    instagram: "https://instagram.com/dreammedi",
    description: "합리적 비용의 병원 인테리어 솔루션",
  },
  {
    id: 12,
    name: "메디플러스 건축",
    region: "부산",
    logo: "/logos/mediplus.jpg",
    website: "https://mediplus-arch.kr",
    description: "종합병원부터 동네의원까지 폭넓은 시공 경험",
  },
]
