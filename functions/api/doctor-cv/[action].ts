const FALLBACK_DOCTOR_CV_API_URL =
  "https://script.google.com/macros/s/AKfycbwH7GaSiju9geEcNr2kjLo6_ZT27TAiZF8wfD6VW4-3Mqt52qQzIwZylTJERz-vAbAPsQ/exec"

const ACTION_MAP: Record<string, string> = {
  bootstrap: "bootstrap",
  resume: "resumeOrCreateDraft",
  save: "saveDraftStep",
  submit: "submitDraft",
  "summary-insights": "getSummaryInsights",
}

type Env = {
  DOCTOR_CV_API_URL?: string
}

function createJsonResponse(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  })
}

async function callDoctorCvBackend(action: string, payload: unknown, apiUrl: string) {
  const mappedAction = ACTION_MAP[action]
  if (!mappedAction) {
    throw new Error(`허용되지 않은 doctor-cv API action: ${action}`)
  }

  const initialResponse = await fetch(apiUrl, {
    method: "POST",
    redirect: "manual",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action: mappedAction,
      payload: mappedAction === "bootstrap" ? undefined : payload,
    }),
  })

  let response = initialResponse
  if ([301, 302, 303, 307, 308].includes(initialResponse.status)) {
    const redirectUrl = initialResponse.headers.get("location")
    if (!redirectUrl) {
      throw new Error("Apps Script API redirect location을 찾지 못했습니다.")
    }
    response = await fetch(redirectUrl, {
      method: "GET",
      redirect: "follow",
      headers: {
        "cache-control": "no-store",
      },
    })
  }

  const text = await response.text()
  let parsed: any = null
  try {
    parsed = text ? JSON.parse(text) : null
  } catch {
    throw new Error("Apps Script API 응답을 JSON으로 해석하지 못했습니다.")
  }

  if (!response.ok || !parsed || parsed.ok !== true) {
    const message =
      parsed && parsed.error && parsed.error.message
        ? parsed.error.message
        : `Apps Script API 호출이 실패했습니다. (${response.status})`
    throw new Error(message)
  }

  return parsed.result
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const rawAction = context.params.action
    const action = Array.isArray(rawAction) ? rawAction[0] : rawAction
    if (!action) {
      return createJsonResponse({ ok: false, error: { message: "doctor-cv action이 비어 있습니다." } }, 400)
    }

    let payload: unknown = {}
    try {
      payload = await context.request.json()
    } catch {
      payload = {}
    }

    const apiUrl = context.env.DOCTOR_CV_API_URL || FALLBACK_DOCTOR_CV_API_URL
    const result = await callDoctorCvBackend(action, payload, apiUrl)
    return createJsonResponse({ ok: true, result }, 200)
  } catch (error) {
    const message = error instanceof Error ? error.message : "doctor-cv API 처리 중 오류가 발생했습니다."
    return createJsonResponse({ ok: false, error: { message } }, 500)
  }
}
