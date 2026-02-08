import React from "react"
import type { Metadata, Viewport } from "next"
import { Noto_Sans_KR } from "next/font/google"

import "./globals.css"

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-sans-kr",
})

export const metadata: Metadata = {
  title: "병원인테리어 업체모음",
  icons: {
    icon: "/favicon.ico"
  },
  description: "의사가 만나는 의사 닥스밋 - 병원 인테리어 업체를 한눈에 비교하세요",
}

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKr.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
