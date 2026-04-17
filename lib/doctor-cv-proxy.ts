const FALLBACK_DOCTOR_CV_API_URL =
  "https://script.google.com/macros/s/AKfycbwH7GaSiju9geEcNr2kjLo6_ZT27TAiZF8wfD6VW4-3Mqt52qQzIwZylTJERz-vAbAPsQ/exec"

const ALLOWED_ACTIONS = new Set([
  "bootstrap",
  "resume",
  "save",
  "submit",
  "summary-insights",
])

type DoctorCvAction = "bootstrap" | "resume" | "save" | "submit" | "summary-insights"

function getDoctorCvApiUrl() {
  return process.env.DOCTOR_CV_API_URL || process.env.NEXT_PUBLIC_GAS_WEBAPP_URL || FALLBACK_DOCTOR_CV_API_URL
}

function getActionBody(action: DoctorCvAction, payload: unknown) {
  switch (action) {
    case "bootstrap":
      return { action: "bootstrap" }
    case "resume":
      return { action: "resumeOrCreateDraft", payload }
    case "save":
      return { action: "saveDraftStep", payload }
    case "submit":
      return { action: "submitDraft", payload }
    case "summary-insights":
      return { action: "getSummaryInsights", payload }
  }
}

export function assertAllowedDoctorCvAction(action: string): asserts action is DoctorCvAction {
  if (!ALLOWED_ACTIONS.has(action)) {
    throw new Error(`허용되지 않은 doctor-cv API action: ${action}`)
  }
}

export async function callDoctorCvBackend(action: DoctorCvAction, payload?: unknown) {
  const url = getDoctorCvApiUrl()
  if (!url) {
    throw new Error("DOCTOR_CV_API_URL이 아직 설정되지 않았습니다.")
  }

  const initialResponse = await fetch(url, {
    method: "POST",
    cache: "no-store",
    redirect: "manual",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(getActionBody(action, payload)),
  })

  let response = initialResponse
  if ([301, 302, 303, 307, 308].includes(initialResponse.status)) {
    const redirectUrl = initialResponse.headers.get("location")
    if (!redirectUrl) {
      throw new Error("Apps Script API redirect location을 찾지 못했습니다.")
    }

    response = await fetch(redirectUrl, {
      method: "GET",
      cache: "no-store",
      redirect: "follow",
    })
  }

  const text = await response.text()
  let parsed: any = null
  try {
    parsed = text ? JSON.parse(text) : null
  } catch {
    throw new Error("Apps Script API 응답을 JSON으로 해석하지 못했습니다.")
  }

  if (!response.ok) {
    const message =
      parsed && parsed.error && parsed.error.message
        ? parsed.error.message
        : `Apps Script API 호출이 실패했습니다. (${response.status})`
    throw new Error(message)
  }

  if (!parsed || parsed.ok !== true) {
    const message = parsed && parsed.error && parsed.error.message ? parsed.error.message : "Apps Script API 호출이 실패했습니다."
    throw new Error(message)
  }

  return parsed.result
}
