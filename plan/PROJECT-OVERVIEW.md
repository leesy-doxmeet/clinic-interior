# clinic-interior (DOXTALK) 프로젝트 개요

> 이 문서는 AI 에이전트가 코드베이스를 빠르게 파악하기 위한 온보딩 문서입니다.
> 최종 갱신: 2026-06-08

---

## 1. 프로젝트 한 줄 요약

**DOXTALK(닥스밋)** 서비스의 Next.js 웹앱. 하나의 저장소에 **의사 CV 입력·홈페이지 생성** 서비스와 **병원 인테리어 업체 디렉토리** 서비스가 공존한다.

- 배포 도메인(참고): `doxtalk.co.kr`
- 브랜드: DOXMEET / DOXTALK

---

## 2. 기술 스택

| 항목 | 버전/도구 |
|------|-----------|
| 프레임워크 | Next.js 16 (App Router) |
| UI | React 19, TypeScript 5.7 |
| 스타일 | Tailwind CSS 3, shadcn/ui (Radix) |
| 패키지 매니저 | pnpm 10 |
| 폼 | react-hook-form, zod |
| 결제 | Toss Payments (빌링키 정기결제) |
| 백엔드(서버리스) | Google Apps Script Web App |
| 기타 | Daum 우편번호 API, xlsx (엑셀 변환) |

### 주요 스크립트

```bash
pnpm dev          # 개발 서버
pnpm build        # prebuild(엑셀→JSON) 후 빌드
pnpm update:companies  # companies.xlsx → companies.json 수동 변환
```

---

## 3. 디렉토리 구조

```
clinic-interior/
├── app/                      # Next.js App Router 라우트
│   ├── page.tsx              # 루트 = 의사 CV (DoctorCvPage)
│   ├── [licenseNumber]/      # 면허번호 기반 의료진 홈페이지
│   ├── interior/             # 병원 인테리어 서비스
│   ├── doctor-cv/payment/    # CV 정기결제 플로우
│   ├── about/refund/         # 환불·정기결제 정책
│   └── terms/                # 이용약관 (외부 링크)
├── components/               # React 컴포넌트
│   ├── doctor-cv-*.tsx       # CV 관련 React 래퍼
│   ├── directory.tsx         # 인테리어 업체 목록
│   ├── quote-form.tsx        # 개원 상담 신청
│   ├── register-form.tsx     # 업체 등록 신청
│   └── ui/                   # shadcn/ui 컴포넌트
├── lib/
│   ├── doctor-cv-billing.ts  # 결제 상수·타입
│   ├── companies.ts          # 업체 타입·샘플 데이터 (실사용은 JSON)
│   └── utils.ts
├── public/
│   ├── doctor-cv-app.js      # ★ CV 핵심 SPA (~4,300줄 바닐라 JS)
│   ├── doctor-cv-app.css
│   └── data/companies.json   # 인테리어 업체 목록 (빌드 시 생성)
├── scripts/
│   └── excel-to-companies.mjs
├── doctor-cv-assets/         # CV CSS 원본
└── plan/                     # 기획·온보딩 문서 (이 폴더)
```

---

## 4. 서비스 A: 의사 CV (루트 `/`)

### 4.1 라우트

| 경로 | 설명 |
|------|------|
| `/` | 의사 CV 입력 메인 |
| `/{licenseNumber}` | 면허번호(숫자만) 기반 의료진 홈페이지. 숫자 외 문자 제거 후 유효하지 않으면 404 |
| `/doctor-cv/payment` | 정기결제 약관 동의 + 카드 등록 |
| `/doctor-cv/payment/billing-callback` | Toss 빌링키 발급·첫 결제 (Edge API Route) |
| `/doctor-cv/payment/success` | 결제 성공 |
| `/doctor-cv/payment/fail` | 결제 실패 |
| `/doctor-cv/payment_save` | 구 결제 방식 (카드 직접 입력, GAS 저장 주석 처리됨) |
| `/about/refund` | 환불·정기결제 정책 |

### 4.2 아키텍처 (중요)

React와 레거시 JS가 **하이브리드**로 동작한다.

```
app/page.tsx
  └── DoctorCvPage (components/doctor-cv-page.tsx)
        ├── <link> doctor-cv-app.css
        ├── <Script> Daum 우편번호 API
        ├── <Script> /doctor-cv-app.js (data-doctor-cv-api-base 속성)
        ├── DoctorCvAppShell → <div id="app" />
        └── SiteFooter
```

- **실제 UI/상태/비즈니스 로직**: `public/doctor-cv-app.js` (바닐라 JS SPA)
- **React 역할**: 스크립트 로드, `#app` 마운트, 결제·약관 등 일부 페이지
- `DoctorCvAppShell`이 `window.__DOCTOR_CV_BOOT__()` 호출로 앱 부팅

### 4.3 CV 입력 플로우 (8단계)

`FLOW_STEPS` (doctor-cv-app.js):

1. 학력 (`education`)
2. 학회 (`society`)
3. 자격 (`qualification`)
4. 수련 (`training`)
5. 경력 (`career`)
6. 기타 활동 (`other`)
7. 병원 정보 (`clinic`)
8. 최종 확인 (`summary`)
9. → 제출 후 홈페이지 미리보기 (`homepage`)

### 4.4 백엔드 (Google Apps Script)

- API Base URL: `doctor-cv-page.tsx`에 하드코딩된 GAS Web App URL
  - `https://script.google.com/macros/s/AKfycbwH7GaSiju9geEcNr2kjLo6_ZT27TAiZF8wfD6VW4-3Mqt52qQzIwZylTJERz-vAbAPsQ/exec`
- `callServer(functionName, payload)` → `{ action, payload }` 형태 POST
- 주요 액션: draft 저장, bootstrap, `submitDraft` 등
- 로컬 캐시: `localStorage` (`doctorCvIntake:cache:*`)

### 4.5 결제 플로우 (Toss Payments 정기결제)

**금액**: 월 10,000원 (부가세 포함) — `lib/doctor-cv-billing.ts`의 `DOCTOR_CV_RECURRING_AMOUNT`

```
[CV 최종 확인(summary)] 
  → openPaymentWindow() — 팝업으로 /doctor-cv/payment?draftId&licenseNumber&name&phone
  → DoctorCvPaymentForm — 약관 동의 + Toss SDK v2 requestBillingAuth
  → Toss 리다이렉트 → /doctor-cv/payment/billing-callback
  → 서버: 빌링키 발급 + 첫 결제 10,000원
  → 성공 시 /doctor-cv/payment/success 리다이렉트
  → postMessage + BroadcastChannel("doctor-cv-payment")로 부모 창에 알림
  → doctor-cv-app.js: triggerSubmitAfterPayment() → submitCurrentDraft() 자동 실행
```

**관련 파일**:

| 파일 | 역할 |
|------|------|
| `components/doctor-cv-payment-form.tsx` | 클라이언트: 약관 체크, Toss SDK 로드, 빌링 인증 요청 |
| `app/doctor-cv/payment/billing-callback/route.ts` | Edge: authKey→빌링키, 첫 결제, success/fail 리다이렉트 |
| `components/doctor-cv-payment-complete-actions.tsx` | success 페이지: opener/BroadcastChannel 알림 |
| `app/doctor-cv/payment_save/route.ts` | 구 방식 (카드번호 직접 POST). GAS 빌링키 저장은 주석 처리 |

**결제 창 ↔ CV 앱 통신**:

- 채널명: `doctor-cv-payment`
- 메시지 타입: `{ type: "doctor-cv-payment-success" }`
- `window.opener.postMessage` + `BroadcastChannel` 이중 전달

---

## 5. 서비스 B: 병원 인테리어 (`/interior`)

### 5.1 라우트

| 경로 | 설명 |
|------|------|
| `/interior` | 업체 디렉토리 (메인) |
| `/interior/quote` | 닥스밋 무료 개원 상담 신청 |
| `/interior/register` | 인테리어 업체 등록 신청 |
| `/interior/sitemap-page` | HTML 사이트맵 |

**리다이렉트** (`next.config.mjs`):

- `/register` → `/interior/register`
- `/quote` → `/interior/quote`
- `/sitemap-page` → `/interior/sitemap-page`

### 5.2 업체 데이터 파이프라인

```
data/companies.xlsx
  → scripts/excel-to-companies.mjs (prebuild / update:companies)
  → public/data/companies.json
  → Directory 컴포넌트 fetch("/data/companies.json")
```

- `lib/companies.ts`: `Company` 타입 + 샘플 12개 (실제 런타임은 JSON 사용)
- 로고: `public/logos/{id}.png|jpg|jpeg|webp` 우선순위로 매칭

### 5.3 Directory 기능

- 지역 복수 선택 필터 (서울, 경기, 충북, 충남, 전북, 전남, 경북, 경남, 강원, 제주)
- 업체명·설명 검색
- 정렬: 인스타+웹사이트 링크 있는 업체 우선 → 가나다순
- 페이지당 19개 + 상담 신청 CTA 카드 1개

### 5.4 폼 제출 (GAS)

`QuoteForm`, `RegisterForm` 모두 `NEXT_PUBLIC_GAS_WEBAPP_URL`로 POST (`mode: "no-cors"`).

**QuoteForm** body:

```json
{ "type": "quote", "payload": { ...필드 }, "meta": { "page", "userAgent" } }
```

**RegisterForm** body:

```json
{ "type": "vendor_register", "payload": { ...필드 }, "meta": { "page", "userAgent" } }
```

---

## 6. 환경 변수

| 변수 | 공개 | 용도 |
|------|------|------|
| `NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_AUTH` | O | Toss 클라이언트 키 (빌링 인증 UI) |
| `TOSS_PAYMENTS_SECRET_KEY` | X | billing-callback 서버 인증 |
| `TOSS_PAYMENTS_BASIC_AUTH` | X | payment_save 구 API 인증 |
| `NEXT_PUBLIC_GAS_WEBAPP_URL` | O | 인테리어 quote/register 폼 제출 |
| `DOCTOR_CV_GAS_WEBAPP_URL` | X | CV 결제 후 빌링키 GAS 저장 (현재 payment_save에서 주석) |

`.env.local` 파일은 저장소에 없음. 로컬/배포 환경에서 별도 설정 필요.

---

## 7. 공통 UI·레이아웃

- **루트 레이아웃** (`app/layout.tsx`): Noto Sans KR 폰트, `lang="ko"`, ThemeProvider 없음
- **인테리어**: `SiteHeader` + `SiteFooter` 사용
- **의사 CV**: `SiteFooter`만 (헤더는 doctor-cv-app.js 내부)
- **shadcn/ui**: `components/ui/` — Button, Dialog, Checkbox 등

---

## 8. 수정 시 주의사항

### 8.1 doctor-cv-app.js 수정

- 파일이 매우 큼 (~4,300줄). 상태는 `state` 객체, 렌더는 `renderApp()`.
- CSS는 `public/doctor-cv-app.css` (원본: `doctor-cv-assets/doctor-cv-app.css`).
- 스크립트 버전 캐시: `?v=20260531-service-provision` 쿼리스트링.
- E2E 헬퍼: `window.__E2E__` (snapshot, applyPersonaDraft, submit).

### 8.2 결제 관련 수정

- 현재 **권장 플로우**: Toss SDK v2 `requestBillingAuth` → `billing-callback` route
- `payment_save` route는 레거시. GAS 빌링키 저장 로직이 주석 처리되어 있음.
- billing-callback은 `runtime = "edge"`. `btoa` 사용.

### 8.3 인테리어 업체 추가

1. `data/companies.xlsx` 수정
2. `pnpm update:companies` 또는 `pnpm build` (prebuild 자동 실행)
3. 로고 이미지를 `public/logos/{id}.png` 등으로 추가

### 8.4 디자인/CSS 변경

- 사용자 규칙상 **스타일 변경은 명시적 요청 없이 하지 않음**.
- doctor-cv-app.css는 레거시 CV 앱 전용 스타일.

---

## 9. 주요 파일 빠른 참조

| 작업 목적 | 먼저 볼 파일 |
|-----------|-------------|
| CV 입력 로직 | `public/doctor-cv-app.js` |
| CV React 진입점 | `components/doctor-cv-page.tsx`, `doctor-cv-app-shell.tsx` |
| 결제 UI | `components/doctor-cv-payment-form.tsx` |
| 결제 서버 처리 | `app/doctor-cv/payment/billing-callback/route.ts` |
| 인테리어 목록 | `components/directory.tsx`, `public/data/companies.json` |
| 상담/등록 폼 | `components/quote-form.tsx`, `register-form.tsx` |
| 업체 데이터 변환 | `scripts/excel-to-companies.mjs` |
| 결제 상수 | `lib/doctor-cv-billing.ts` |
| 라우트 리다이렉트 | `next.config.mjs` |
| SEO 사이트맵 | `app/sitemap.ts` |

---

## 10. 외부 서비스 의존성

| 서비스 | URL/용도 |
|--------|----------|
| Google Apps Script | CV draft 저장·제출, 인테리어 폼 수신 |
| Toss Payments API | `api.tosspayments.com` 빌링키·정기결제 |
| Toss Payments SDK | `https://js.tosspayments.com/v2/standard` |
| Daum 우편번호 | `t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js` |
| DOXMEET | `www.doxmeet.com` (로고, 개인정보처리방침, 이용약관) |

---

## 11. 알려진 특이사항

1. **루트 `/`는 인테리어가 아니라 의사 CV**이다. 인테리어는 `/interior`.
2. CV 앱은 React가 아닌 **바닐라 JS SPA** — React 컴포넌트만으로 CV UI를 찾으면 안 됨.
3. `lib/companies.ts`의 하드코딩 배열은 **사용되지 않을 수 있음** (JSON이 실제 소스).
4. `payment_save`와 `billing-callback` 두 결제 경로가 공존. 신규는 billing-callback 기준.
5. GAS URL이 소스에 하드코딩된 곳이 있음 (환경변수 미사용).
6. `app/sitemap.ts`에 CV·결제 페이지는 포함되지 않음 (인테리어 위주).

---

## 12. 로컬 개발 체크리스트

```bash
pnpm install
# .env.local 설정 (위 환경 변수 참고)
pnpm dev
```

- CV 테스트: `http://localhost:3000/`
- 인테리어: `http://localhost:3000/interior`
- 결제 테스트: Toss 테스트 키 + 팝업 허용 필요
- 업체 목록: `data/companies.xlsx` 없으면 prebuild 실패 → 엑셀 파일 필요
