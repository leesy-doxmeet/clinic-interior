import { NextResponse } from "next/server"

import { assertAllowedDoctorCvAction, callDoctorCvBackend } from "@/lib/doctor-cv-proxy"

export const dynamic = "force-dynamic"

export async function POST(request: Request, context: { params: Promise<{ action: string }> }) {
  try {
    const { action } = await context.params
    assertAllowedDoctorCvAction(action)

    let payload: unknown = {}
    try {
      payload = await request.json()
    } catch {
      payload = {}
    }

    const result = await callDoctorCvBackend(action, payload)
    return NextResponse.json({ ok: true, result }, { status: 200 })
  } catch (error) {
    const message = error instanceof Error ? error.message : "doctor-cv API 처리 중 오류가 발생했습니다."
    return NextResponse.json({ ok: false, error: { message } }, { status: 500 })
  }
}
