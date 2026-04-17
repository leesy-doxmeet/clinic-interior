const FALLBACK_DOCTOR_CV_API_URL =
  "https://script.google.com/macros/s/AKfycbwH7GaSiju9geEcNr2kjLo6_ZT27TAiZF8wfD6VW4-3Mqt52qQzIwZylTJERz-vAbAPsQ/exec"

function createJsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  })
}

async function callDoctorCvBackend(action, payload, apiUrl) {
  const initialResponse = await fetch(apiUrl, {
    method: "POST",
    redirect: "manual",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action,
      payload: action === "bootstrap" ? undefined : payload,
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
  let parsed = null
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

export function createDoctorCvHandler(action) {
  return async function onRequestPost(context) {
    try {
      let payload = {}
      try {
        payload = await context.request.json()
      } catch {
        payload = {}
      }

      const apiUrl = context.env.DOCTOR_CV_API_URL || FALLBACK_DOCTOR_CV_API_URL
      const result = await callDoctorCvBackend(action, payload, apiUrl)
      return createJsonResponse({ ok: true, result }, 200)
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "doctor-cv API 처리 중 오류가 발생했습니다."
      return createJsonResponse({ ok: false, error: { message } }, 500)
    }
  }
}
