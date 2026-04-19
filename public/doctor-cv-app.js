const STORAGE_KEYS = {
  LAST_IDENTITY: 'doctorCvIntake:lastIdentity',
  CACHE_PREFIX: 'doctorCvIntake:cache:',
};

const FLOW_STEPS = [
  { key: 'education', label: '학력', short: '1' },
  { key: 'society', label: '학회', short: '2' },
  { key: 'qualification', label: '자격', short: '3' },
  { key: 'training', label: '수련', short: '4' },
  { key: 'career', label: '경력', short: '5' },
  { key: 'other', label: '기타 활동', short: '6' },
  { key: 'clinic', label: '병원 정보', short: '7' },
  { key: 'summary', label: '최종 확인', short: '8' },
];

const EDUCATION_SLOTS = ['학사', '석사', '박사'];
const OTHER_ACTIVITY_TYPES = ['논문', '수상', '강연', '포스터', '봉사', '연수', '저서', '출판', '미디어', '기타'];
const TRAINING_TYPES = ['인턴', '전공의', '전임의'];
const TRAINING_STATUS_OPTIONS = ['수료', '재직', '사직'];
const QUALIFICATION_TYPES = ['의사면허', '치과의사면허'];
const SPECIALIST_OPTIONS = ['예', '아니오'];
const SPECIALTY_OTHER_VALUE = '__specialty_other__';
const SPECIALTY_OPTIONS = [
  '내과 (내과)',
  '신경과',
  '정신건강의학과 (정신과)',
  '외과 (일반외과)',
  '정형외과',
  '신경외과',
  '심장혈관흉부외과 (흉부외과)',
  '성형외과',
  '마취통증의학과 (마취과)',
  '산부인과',
  '소아청소년과',
  '안과',
  '이비인후과',
  '피부과',
  '비뇨의학과 (비뇨기과)',
  '영상의학과 (진단방사선과)',
  '방사선종양학과 (치료방사선과)',
  '병리과 (해부병리과)',
  '진단검사의학과 (임상병리과)',
  '재활의학과',
  '예방의학과',
  '직업환경의학과 (산업의학과)',
  '핵의학과',
  '가정의학과',
  '응급의학과',
  '결핵과',
  '치과',
];

const LANDING_REASON_CARDS = [
  {
    title: '흩어진 병원 소개',
    body: '병원 홈페이지에는 선생님의 전문 이력이 짧게만 표시되는 경우가 많습니다.',
  },
  {
    title: '빠져 있는 세부 경력',
    body: '수련, 학회, 논문, 주요 활동이 분리되어 있으면 전문성이 충분히 전달되지 않습니다.',
  },
  {
    title: 'AI가 설명할 근거 부족',
    body: '정리된 공개 프로필이 없으면 AI가 선생님을 정확하게 소개하기 어렵습니다.',
  },
];

const LANDING_PREP_ITEMS = [
  '전문분야',
  '학력·수련',
  '자격·면허',
  '학회·논문·활동',
  '병원 정보',
];

const LANDING_HARD_TO_READ_ITEMS = [
  '병원소개 한두 줄',
  '학회·논문 정보 분산',
  '수련·경력 누락',
  '세부 전문분야 불명확',
  'AI가 조합하기 어려운 정보',
];

const LANDING_EASY_TO_READ_ITEMS = [
  'AI가 읽는 의사 프로필',
  '학력·수련·자격 구조화',
  '학회·논문·활동 정리',
  '병원 정보 연결',
  '무료 홈페이지 제작 기반 확보',
];

const LANDING_NEXT_STEP_ITEMS = [
  '학력',
  '학회 활동',
  '자격 및 면허',
  '수련',
  '경력',
  '기타 활동',
  '병원 정보',
  '최종 확인',
];

const LANDING_CLOSING_POINTS = [
  'AI가 읽는 의사 프로필',
  '무료 홈페이지 제작 기반',
  '초기 입력 의료진 우선 제작',
];

const LANDING_BENEFIT_CHIPS = [
  '초기 입력 의료진 우선 제작',
  '본인 확인 후 이어쓰기',
  '제출 후 수정 가능',
  '6월 말 AI 최적화 홈페이지 안내 예정',
];

const LANDING_HERO_PROFILE_ITEMS = [
  '전문분야',
  '학력·수련',
  '자격·면허',
  '학회·논문·활동',
  '병원 정보',
];

const LANDING_HERO_HOMEPAGE_ITEMS = [
  '선생님 소개 문구',
  '진료 강점',
  '경력 타임라인',
  '병원 위치·진료시간',
  '검색 가능한 공개 프로필',
];

const LANDING_PROCESS_CARDS = [
  {
    title: '1. 본인 확인',
    body: '이름, 휴대폰 번호, 면허번호로 기존 작성 내역을 불러오거나 새 프로필을 시작합니다.',
  },
  {
    title: '2. 전문 이력 입력',
    body: '학력, 학회, 자격, 수련, 경력, 기타 활동, 병원 정보를 순서대로 입력합니다.',
  },
  {
    title: '3. 프로필·홈페이지 기반 생성',
    body: '입력한 정보는 AI가 읽기 쉬운 의사 프로필과 무료 홈페이지 제작 기반으로 활용됩니다.',
  },
];

const SECTION_META = {
  society: {
    label: '학회 활동',
    title: '학회 활동',
    description: '학회명, 역할, 회원 구분을 나누어 입력하면 선생님의 전문 활동을 더 정확하게 정리할 수 있습니다.',
    emptyTitle: '아직 입력된 학회 활동이 없습니다',
    emptyBody: '학회명부터 먼저 입력하고, 역할이나 회원 구분은 필요한 경우에만 추가해 주세요.',
    addLabel: '학회 활동 추가',
  },
  qualification: {
    label: '자격',
    title: '자격',
    description: '전문의 면허가 2개라면 2번 입력해주세요',
    emptyTitle: '아직 입력된 자격 정보가 없습니다',
    emptyBody: '면허번호와 전문의 여부를 먼저 입력한 뒤 필요한 전문의 정보를 추가해 주세요.',
    addLabel: '자격 추가',
  },
  training: {
    label: '수련',
    title: '수련(인턴,전공의,전임의)',
    description: '인턴, 레지던트, 전임의를 각각 따로 입력해주세요',
    emptyTitle: '아직 입력된 수련 정보가 없습니다',
    emptyBody: '인턴, 전공의, 전임의를 각각 따로 적어 주세요.',
    addLabel: '수련 추가',
  },
  career: {
    label: '경력',
    title: '경력',
    description: '현재와 과거 경력을 병원명, 진료과, 직책 중심으로 정리해 주세요.',
    emptyTitle: '아직 입력된 경력 정보가 없습니다',
    emptyBody: '현재 근무 중인 병원부터 먼저 적어도 괜찮습니다.',
    addLabel: '경력 추가',
  },
  other: {
    label: '기타 활동',
    title: '기타 활동',
    description: '논문, 강연, 출판, 수상 등 필요한 활동만 간단히 남겨 주세요.',
    emptyTitle: '아직 입력된 기타 활동이 없습니다',
    emptyBody: '환자에게 보여주고 싶은 활동 중심으로만 입력해도 됩니다.',
    addLabel: '기타 활동 추가',
  },
};

const SERVER_ENDPOINTS = {
  getBootstrapData: 'bootstrap',
  resumeOrCreateDraft: 'resume',
  saveDraftStep: 'save',
  submitDraft: 'submit',
  getSummaryInsights: 'summary-insights',
};

const SERVER_ACTIONS = {
  getBootstrapData: 'bootstrap',
  resumeOrCreateDraft: 'resumeOrCreateDraft',
  saveDraftStep: 'saveDraftStep',
  submitDraft: 'submitDraft',
  getSummaryInsights: 'getSummaryInsights',
};

const state = {
  bootstrap: null,
  loading: true,
  appError: '',
  identityError: '',
  notice: null,
  summaryInsights: {
    loading: false,
    cacheKey: '',
    data: null,
    error: '',
  },
  draft: createDraftSkeleton(),
  identityForm: createEmptyIdentity(),
  currentStepKey: 'landing',
  localOnly: false,
  identityBusy: false,
  submitBusy: false,
  pendingSaves: 0,
  confirmDialog: {
    open: false,
    title: '',
    message: '',
    confirmLabel: '확인',
    tone: 'default',
    onConfirm: null,
  },
  editor: {
    open: false,
    sectionKey: '',
    index: -1,
    slotType: '',
    item: null,
    meta: {},
    error: '',
  },
  viewport: {
    width: typeof window !== 'undefined' ? window.innerWidth : 1440,
    lastScrollY: 0,
    stepperHidden: false,
  },
};

let backgroundSaveChain = Promise.resolve();
let initPromise = null;

window.__DOCTOR_CV_BOOT__ = initApp;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp, { once: true });
} else {
  queueMicrotask(initApp);
}
window.addEventListener('beforeunload', handleBeforeUnload);

async function initApp() {
  if (initPromise) {
    return initPromise;
  }

  initPromise = (async function () {
    state.identityForm = loadLastIdentity();
    state.viewport.width = window.innerWidth;
    state.viewport.lastScrollY = window.scrollY || 0;

    if (!window.__DOCTOR_CV_EVENT_HANDLERS_BOUND__) {
      window.addEventListener('scroll', handleWindowScroll, { passive: true });
      window.addEventListener('resize', handleViewportResize);
      window.__DOCTOR_CV_EVENT_HANDLERS_BOUND__ = true;
    }

    renderApp();

    try {
      state.bootstrap = await callServer('getBootstrapData');
      if (!state.bootstrap.spreadsheetConfigured) {
        state.appError =
          'Google Sheets 연결이 아직 설정되지 않았습니다. 배포 전에 Script Properties에 SPREADSHEET_ID를 입력해 주세요.';
      }
    } catch (error) {
      state.appError = error.message || '초기 설정을 불러오지 못했습니다.';
    } finally {
      state.loading = false;
      renderApp();
    }
  })();

  try {
    return await initPromise;
  } finally {
    initPromise = null;
  }
}
function createEmptyIdentity() {
  return {
    name: '',
    phone: '',
    licenseNumber: '',
  };
}

function createEmptyScheduleItem() {
  return {
    id: createClientId(),
    days: '',
    openTime: '',
    closeTime: '',
    note: '',
  };
}

function createEmptyClinicInfo() {
  return {
    clinicName: '',
    postcode: '',
    address: '',
    addressDetail: '',
    fullAddress: '',
    phone: '',
    openingHours: '',
    closedDays: '',
    parking: '',
    schedules: [createEmptyScheduleItem()],
  };
}

function resetSummaryInsights() {
  state.summaryInsights = {
    loading: false,
    cacheKey: '',
    data: null,
    error: '',
  };
}

function createDraftSkeleton() {
  return {
    draftId: '',
    doctorKey: '',
    identity: createEmptyIdentity(),
    status: 'draft',
    lastCompletedStep: 'identity',
    createdAt: '',
    updatedAt: '',
    submittedAt: '',
    education: [],
    society: [],
    qualification: [],
    training: [],
    career: [],
    other: [],
    clinicInfo: createEmptyClinicInfo(),
    meta: {
      resumeStepKey: 'education',
    },
  };
}

function callServer(functionName, payload) {
  const endpointKey = SERVER_ENDPOINTS[functionName];
  const actionKey = SERVER_ACTIONS[functionName];
  const apiBase = window.DOCTOR_CV_API_BASE || '/api/doctor-cv';
  const isDirectApi = /^https?:\/\//i.test(apiBase);
  if (!endpointKey || !actionKey) {
    return Promise.reject(new Error('지원되지 않는 서버 요청입니다: ' + functionName));
  }

  const requestUrl = isDirectApi ? apiBase : apiBase + '/' + endpointKey;
  const requestPayload = typeof payload === 'undefined' ? {} : payload;
  const requestBody = isDirectApi
    ? {
        action: actionKey,
        payload: actionKey === 'bootstrap' ? undefined : requestPayload,
      }
    : requestPayload;

  return fetch(requestUrl, {
    method: 'POST',
    cache: 'no-store',
    redirect: 'follow',
    headers: {
      'Content-Type': isDirectApi ? 'text/plain;charset=utf-8' : 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
    .then(async function (response) {
      let parsed = null;
      try {
        parsed = await response.json();
      } catch (error) {
        throw new Error('서버 응답을 해석하지 못했습니다.');
      }

      if (!response.ok || !parsed || parsed.ok !== true) {
        const message =
          parsed && parsed.error && parsed.error.message
            ? parsed.error.message
            : '서버 오류가 발생했습니다.';
        throw new Error(message);
      }

      return parsed.result;
    })
    .catch(function (error) {
      const message = error && error.message ? error.message : String(error || '서버 오류가 발생했습니다.');
      throw new Error(message);
    });
}

function renderApp() {
  const root = document.getElementById('app');
  if (!root) {
    return;
  }

  if (state.loading) {
    root.innerHTML = renderLoadingScreen();
    return;
  }

  if (state.appError) {
    root.innerHTML = renderConfigError();
    return;
  }

  root.innerHTML = renderActiveScreen();
  syncUiAfterRender();
}

function renderLoadingScreen() {
  return `
    <main class="page-shell identity fade-up landing-loading-screen">
      <section class="landing-loading-card">
        <div class="landing-brand-lockup landing-loading-brand">
          <img class="landing-brand-logo" src="/doxmeet-logo.svg" alt="닥스밋">
          <div class="landing-brand-copy">
            <div class="landing-brand-kicker">DOXMEET SERVICE</div>
            <div class="landing-brand-name">닥스밋 의사 프로필</div>
          </div>
        </div>
        <div class="landing-loading-spinner" aria-hidden="true"></div>
        <h1 class="landing-loading-title">접속중입니다</h1>
        <div class="landing-loading-body">닥스밋 서비스 화면을 준비하고 있습니다. 잠시만 기다려 주세요.</div>
      </section>
    </main>
  `;
}

function renderConfigError() {
  const propertyKeys = state.bootstrap && state.bootstrap.propertyKeys ? state.bootstrap.propertyKeys : {};
  return `
    <main class="page-shell identity fade-up">
      <section class="hero-panel dark">
        <div class="eyebrow dark">deployment check</div>
        <h1 class="hero-title">배포 설정이 아직 끝나지 않았습니다</h1>
        <div class="hero-body">${escapeHtml(state.appError)}</div>
      </section>

      <section class="card section-card stack-16" style="margin-top:18px;">
        <div>
          <div class="card-title">확인할 항목</div>
          <div class="card-body">Apps Script의 <strong>프로젝트 설정 → 스크립트 속성</strong>에 아래 키를 등록해 주세요.</div>
        </div>
        <div class="soft-card section-card stack-12">
          <div><strong>${escapeHtml(propertyKeys.SPREADSHEET_ID || 'SPREADSHEET_ID')}</strong><div class="micro-copy">Google Spreadsheet ID</div></div>
          <div><strong>${escapeHtml(propertyKeys.ADMIN_EMAIL || 'ADMIN_EMAIL')}</strong><div class="micro-copy">최종 제출 알림 메일 수신 주소</div></div>
          <div><strong>${escapeHtml(propertyKeys.APP_VERSION || 'APP_VERSION')}</strong><div class="micro-copy">예: <code>mvp-0.1.0</code></div></div>
        </div>
      </section>
    </main>
  `;
}

function renderActiveScreen() {
  if (state.currentStepKey === 'landing') {
    return renderLandingScreen();
  }

  if (!state.draft.draftId || state.currentStepKey === 'identity') {
    return renderIdentityScreen();
  }

  let content = '';
  if (state.currentStepKey === 'education') {
    content = renderEducationStep();
  } else if (state.currentStepKey === 'clinic') {
    content = renderClinicStep();
  } else if (state.currentStepKey === 'summary') {
    content = renderSummaryStep();
  } else {
    content = renderRepeatableSectionStep(state.currentStepKey);
  }

  return `
    <main class="page-shell flow-screen fade-up">
      ${renderStepper()}
      ${state.notice ? renderNoticeBanner() : ''}
      ${content}
      ${renderBottomBar()}
      ${state.editor.open ? renderEditorModal() : ''}
      ${state.confirmDialog.open ? renderConfirmDialog() : ''}
    </main>
  `;
}

function renderLandingScreen() {
  return `
    <main class="page-shell landing-page fade-up">
      <section class="hero-panel landing-hero-panel">
        <div class="landing-hero-grid">
          <div class="landing-copy-stack">
            <div class="landing-brand-lockup">
              <img class="landing-brand-logo" src="/doxmeet-logo.svg" alt="닥스밋">
              <div class="landing-brand-copy">
                <div class="landing-brand-kicker">DOXMEET SERVICE</div>
                <div class="landing-brand-name">닥스밋 의사 프로필</div>
              </div>
            </div>
            <div class="eyebrow dark">AI 검색 시대, 의사 프로필 선점</div>
            <h1 class="landing-hero-title">앞으로 환자는 병원이 아니라 의사를 AI로 찾습니다</h1>
            <div class="landing-hero-body">
              <p>좋은 경력이 있어도 흩어져 있으면 AI는 선생님을 정확히 설명하기 어렵습니다.</p>
              <p>학력, 수련, 전문분야, 학회, 경력, 병원 정보를 직접 입력하면 AI가 읽는 의사 프로필로 정리하고, 추후 무료 AI 최적화 홈페이지 제작의 기반으로 활용합니다.</p>
            </div>
            <div class="landing-hero-actions">
              <button class="btn btn-primary" type="button" onclick="startIntakeFromLanding()">무료 홈페이지 받을 프로필 만들기</button>
            </div>
            <div class="micro-copy landing-helper-copy">직접 입력 · 저장 후 이어쓰기 가능 · 제출 후 수정 가능</div>
          </div>

          <aside class="card landing-structured-card" aria-label="예시 구조화 프로필">
            <div class="landing-structured-head">
              <div>
                <div class="eyebrow">landing preview</div>
                <div class="landing-structured-title">입력 후 만들어지는 것</div>
              </div>
              <div class="landing-structured-badge">정리 예시</div>
            </div>
            <div class="landing-structured-group-grid">
              <section class="landing-structured-group">
                <div class="landing-structured-group-title">AI가 읽는 의사 프로필</div>
                <ul class="landing-structured-list">
                  ${LANDING_HERO_PROFILE_ITEMS.map(function (item) {
                    return `<li>${escapeHtml(item)}</li>`;
                  }).join('')}
                </ul>
              </section>
              <section class="landing-structured-group">
                <div class="landing-structured-group-title">무료 홈페이지 제작 기반</div>
                <ul class="landing-structured-list">
                  ${LANDING_HERO_HOMEPAGE_ITEMS.map(function (item) {
                    return `<li>${escapeHtml(item)}</li>`;
                  }).join('')}
                </ul>
              </section>
            </div>
            <div class="landing-structured-footer">입력한 정보가 곧 선생님 홈페이지의 원고가 됩니다</div>
          </aside>
        </div>
      </section>

      <section class="landing-section landing-benefit-section">
        <div class="landing-benefit-bar" aria-label="랜딩 혜택 요약">
          ${LANDING_BENEFIT_CHIPS.map(function (item) {
            return `<div class="landing-benefit-chip">${escapeHtml(item)}</div>`;
          }).join('')}
        </div>
      </section>

      <section class="landing-section stack-20">
        <div class="section-mini-head">
          <div>
            <h1>좋은 경력이 있어도, AI가 읽을 수 없으면 없는 정보처럼 보일 수 있습니다</h1>
            <p>지금 선생님의 정보는 병원 소개, 학회 활동, 논문, 포털 프로필, 병원 홈페이지에 흩어져 있습니다.</p>
            <p>사람은 여러 정보를 조합해 이해할 수 있지만, AI는 한 명의 의사 프로필로 정리된 정보를 더 쉽게 이해합니다.</p>
          </div>
        </div>
        <div class="landing-reason-grid">
          ${LANDING_REASON_CARDS.map(function (card) {
            return `
              <article class="card landing-info-card">
                <h2 class="landing-card-title">${escapeHtml(card.title)}</h2>
                <p class="landing-card-body">${escapeHtml(card.body)}</p>
              </article>
            `;
          }).join('')}
        </div>
      </section>

      <section class="landing-section stack-20">
        <div class="section-mini-head">
          <div>
            <h1>직접 입력하면, 흩어진 이력이 하나의 의사 프로필이 됩니다</h1>
            <p>직접 입력합니다. 준비된 항목부터 작성하고, 나중에 이어서 채울 수 있습니다.</p>
          </div>
        </div>
        <div class="landing-process-grid">
          ${LANDING_PROCESS_CARDS.map(function (card) {
            return `
              <article class="card landing-info-card landing-process-card">
                <h2 class="landing-card-title">${escapeHtml(card.title)}</h2>
                <p class="landing-card-body">${escapeHtml(card.body)}</p>
              </article>
            `;
          }).join('')}
        </div>
      </section>

      <section class="landing-section stack-20" id="landing-before-after">
        <div class="section-mini-head">
          <div>
            <h1>같은 경력도 정리 방식에 따라 다르게 읽힙니다</h1>
          </div>
        </div>
        <div class="landing-compare-grid">
          <article class="soft-card section-card landing-compare-card">
            <h2 class="landing-card-title">입력 전</h2>
            <ul class="landing-list muted">
              ${LANDING_HARD_TO_READ_ITEMS.map(function (item) {
                return `<li>${escapeHtml(item)}</li>`;
              }).join('')}
            </ul>
          </article>
          <article class="card section-card landing-compare-card">
            <h2 class="landing-card-title">입력 후</h2>
            <ul class="landing-list positive">
              ${LANDING_EASY_TO_READ_ITEMS.map(function (item) {
                return `<li>${escapeHtml(item)}</li>`;
              }).join('')}
            </ul>
          </article>
        </div>
        <div class="landing-footer-copy landing-compare-emphasis">좋은 경력이 ‘있는 것’과 좋은 경력이 ‘읽히는 것’은 다릅니다.</div>
      </section>

      <section class="landing-section stack-20">
        <div class="section-mini-head">
          <div>
            <h1>CV 입력이 아니라, 선생님 홈페이지의 초안을 만드는 과정입니다</h1>
            <p>지금 입력한 학력, 수련, 경력, 학회 활동, 병원 정보는 추후 무료 AI 최적화 홈페이지 제작의 기본 원고로 활용됩니다.</p>
            <p>먼저 입력한 선생님부터 홈페이지 제작 대상에 우선 반영됩니다.</p>
          </div>
        </div>
        <div class="card section-card landing-homepage-panel">
          <div class="landing-homepage-copy">
            <div>
              <h2 class="landing-card-title">초기 입력 의료진 우선 혜택</h2>
              <p class="landing-card-body">프로필을 먼저 완성한 선생님부터 AI 최적화 무료 홈페이지 제작 안내를 받을 수 있습니다.</p>
            </div>
            <div class="landing-homepage-actions">
              <ul class="landing-list closing">
                ${LANDING_CLOSING_POINTS.map(function (item) {
                  return `<li>${escapeHtml(item)}</li>`;
                }).join('')}
              </ul>
              <button class="btn btn-primary" type="button" onclick="startIntakeFromLanding()">무료 홈페이지 받을 프로필 만들기</button>
            </div>
          </div>
        </div>
      </section>

      <section class="landing-section stack-20">
        <div class="section-mini-head">
          <div>
            <h1>입력은 정해진 순서대로, 작성은 가능한 만큼만</h1>
            <p>한 번에 모든 항목을 완성하지 않아도 됩니다. 준비된 정보부터 입력하고, 같은 본인 확인 정보로 다시 들어와 이어서 작성할 수 있습니다.</p>
          </div>
        </div>
        <div class="landing-step-grid">
          ${LANDING_NEXT_STEP_ITEMS.map(function (item, index) {
            return `
              <article class="card landing-step-card">
                <div class="landing-step-index">${escapeHtml(String(index + 1))}</div>
                <div class="landing-step-label">${escapeHtml(item)}</div>
              </article>
            `;
          }).join('')}
        </div>
      </section>

      <section class="landing-section stack-20 landing-closing-section">
        <div class="hero-panel landing-final-panel">
          <div class="landing-final-copy">
            <h2 class="landing-final-title">선생님의 경력을 AI가 읽을 수 있는 상태로 바꿔두세요</h2>
            <p class="landing-final-body">흩어진 이력은 AI가 대신 정리해주지 않습니다. 지금 입력한 정보가 선생님의 의사 프로필이 되고, 무료 홈페이지 제작의 시작점이 됩니다.</p>
            <button class="btn btn-primary" type="button" onclick="startIntakeFromLanding()">무료 홈페이지 받을 프로필 만들기</button>
            <div class="micro-copy landing-helper-copy">초기 입력 의료진 우선 제작 · 제출 후 수정 가능</div>
          </div>
        </div>
      </section>
    </main>
  `;
}

function renderIdentityScreen() {
  const hasPrefill = !!(state.identityForm.name || state.identityForm.phone || state.identityForm.licenseNumber);
  return `
    <main class="page-shell identity fade-up">
      <section class="hero-panel dark">
        <div class="eyebrow dark">doctor intake</div>
        <h1 class="hero-title">선생님의 정보를 입력해주시면, 차후 닥스밋 AI가 환자에게 보여줄 정보를 학습합니다.</h1>
        <div class="hero-body">AI는 이미지보다 규격화된 정보를 더 잘 이해합니다. 작성해주신 순서대로 AI가 학습합니다.</div>
      </section>

      <section class="card identity-form-card stack-20">
        <div>
          <div class="card-title">본인 확인</div>
          <div class="card-body">이전에 입력한 정보가 있으면 이어서 작성할 수 있습니다.</div>
        </div>

        ${hasPrefill ? `<div class="micro-copy emphasis-copy">최근 이 기기에서 사용한 본인 확인 정보를 불러왔습니다. 필요하면 수정해 주세요.</div>` : ''}

        <div class="field-grid">
          <label class="field-row">
            <span class="field-label">이름</span>
            <input id="identity-name" class="input" type="text" value="${escapeAttr(state.identityForm.name)}" placeholder="예: 김도현" autocomplete="name">
          </label>

          <div class="field-row two-up">
            <label class="field-row">
              <span class="field-label">휴대폰 번호</span>
              <input id="identity-phone" class="input" type="tel" value="${escapeAttr(state.identityForm.phone)}" placeholder="예: 010-1234-5678" autocomplete="tel" inputmode="numeric" oninput="handlePhoneInput(this)">
            </label>

            <label class="field-row">
              <span class="field-label">의사 면허번호</span>
              <input id="identity-license" class="input" type="tel" value="${escapeAttr(state.identityForm.licenseNumber)}" placeholder="예: 123456" autocomplete="off" inputmode="numeric" oninput="this.value=this.value.replace(/[^0-9]/g, '')">
            </label>
          </div>
        </div>

        ${state.identityError ? `<div class="error-text">${escapeHtml(state.identityError)}</div>` : ''}

        ${state.identityBusy ? `<div class="micro-copy identity-loading-copy"><span class="inline-loader" aria-hidden="true"></span>입력된 정보를 확인하고 기존 작성 내역을 불러오고 있습니다.</div>` : ''}

        <div class="button-row">
          <button class="btn btn-primary btn-block" onclick="handleIdentitySubmit()" ${state.identityBusy ? 'disabled' : ''}>
            ${state.identityBusy ? '<span class="btn-inline-loader"><span class="inline-loader inline-loader-on-dark" aria-hidden="true"></span><span>불러오는 중…</span></span>' : '이어서 시작하기'}
          </button>
        </div>
      </section>
    </main>
  `;
}

function renderStepper() {
  return `
    <section id="flow-stepper" class="stepper-wrap ${state.viewport.stepperHidden ? 'is-hidden' : ''}">
      <div class="step-strip">
        ${FLOW_STEPS.map(function (step, index) {
          const isCurrent = step.key === state.currentStepKey;
          const currentIndex = FLOW_STEPS.findIndex(function (entry) {
            return entry.key === state.currentStepKey;
          });
          const statusClass = index < currentIndex ? 'done' : isCurrent ? 'active' : '';
          return `
            <button class="step-chip ${statusClass}" type="button" onclick="goToStep('${step.key}')">
              <span>${escapeHtml(`${index + 1}/${FLOW_STEPS.length}${step.label}`)}</span>
            </button>
          `;
        }).join('')}
      </div>
    </section>
  `;
}

function startIntakeFromLanding() {
  state.currentStepKey = 'identity';
  state.identityError = '';
  state.notice = null;
  renderApp();
  scrollViewportTop(false);
  window.requestAnimationFrame(function () {
    const nameInput = document.getElementById('identity-name');
    if (nameInput) {
      nameInput.focus();
    }
  });
}

function renderNoticeBanner() {
  return `
    <div class="notice-banner notice-${escapeAttr(state.notice.type)}">
      <div>${escapeHtml(state.notice.message)}</div>
    </div>
  `;
}

function renderEducationStep() {
  return `
    <section class="stack-20">
      <div class="section-mini-head">
        <div>
          <h1>학력</h1>
          <p>학사, 석사, 박사 정보를 필요한 만큼 입력해 주세요.</p>
        </div>
      </div>

      <div class="education-group-list">
        ${EDUCATION_SLOTS.map(function (slotType) {
          return renderEducationSlotGroup(slotType);
        }).join('')}
      </div>
    </section>
  `;
}

function renderEducationSlotGroup(slotType) {
  const items = getEducationItemsBySlot(slotType);
  return `
    <div class="education-slot-group">
      <div class="education-group-head">
        <div>
          <div class="education-slot-title">${escapeHtml(slotType)}</div>
          <div class="micro-copy">${escapeHtml(slotType)} 학위를 여러 개 입력할 수 있습니다.</div>
        </div>
        <button class="btn btn-secondary education-add-button" type="button" onclick="openEducationSlot('${slotType}')">+ 추가하기</button>
      </div>
      ${items.length ? `
        <div class="education-slot-grid">
          ${items.map(function (item, index) {
            const actualIndex = ensureArray(state.draft.education).findIndex(function (entry) {
              return entry.id === item.id;
            });
            const years = formatPeriod(item.startYear, item.graduationYear);
            return `
              <div class="item-card education-slot-card">
                <div class="item-card-head">
                  <div>
                    <div class="item-card-title">${escapeHtml(item.institution || slotType)}</div>
                    ${item.department ? `<div class="item-card-subtitle">${escapeHtml(item.department)}</div>` : ''}
                    ${years ? `<div class="item-card-period">${escapeHtml(years)}</div>` : ''}
                  </div>
                  <div class="item-actions">
                    <button class="action-button primary" type="button" onclick="openEducationEntry('${slotType}', ${actualIndex})">수정하기</button>
                    <button class="action-button" type="button" onclick="deleteItem('education', ${actualIndex})">삭제</button>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      ` : `
        <div class="empty-card">
          <strong>${escapeHtml(slotType)} 정보가 비어 있습니다</strong>
          <div>필요한 경우 여러 학교 또는 과정을 같은 학위 안에서 나눠 입력할 수 있습니다.</div>
        </div>
      `}
    </div>
  `;
}

function renderRepeatableSectionStep(sectionKey) {
  const meta = SECTION_META[sectionKey];
  const items = ensureArray(state.draft[sectionKey]);

  return `
    <section class="stack-20">
      <div class="section-mini-head">
        <div>
          <h1>${escapeHtml(meta.title)}</h1>
          <p>${escapeHtml(meta.description)}</p>
        </div>
        <button class="btn btn-secondary" type="button" onclick="openEditor('${sectionKey}', -1)">+ ${escapeHtml(meta.addLabel)}</button>
      </div>

      ${items.length ? `
        <div class="repeat-list">
          ${items.map(function (item, index) {
            return renderItemCard(sectionKey, item, index);
          }).join('')}
        </div>
      ` : `
        <div class="empty-card">
          <strong>${escapeHtml(meta.emptyTitle)}</strong>
          <div>${escapeHtml(meta.emptyBody)}</div>
        </div>
      `}
    </section>
  `;
}

function renderClinicStep() {
  const clinicInfo = Object.assign(createEmptyClinicInfo(), state.draft.clinicInfo || {});

  return `
    <section class="stack-20">
      <div class="section-mini-head">
        <div>
          <h1>병원 정보</h1>
          <p>환자에게 보여줄 실제 병원 정보만 간단하고 정확하게 입력해 주세요.</p>
        </div>
      </div>

      <div class="card section-card stack-16">
        <div class="card-title">기본 정보</div>
        <div class="field-grid">
          <label class="field-row">
            <span class="field-label">병원 / 의원명</span>
            <input id="clinicName" class="input" type="text" value="${escapeAttr(clinicInfo.clinicName)}" placeholder="예: 닥스밋의원">
          </label>
          <label class="field-row">
            <span class="field-label">대표 전화번호</span>
            <input id="clinicPhone" class="input" type="tel" value="${escapeAttr(clinicInfo.phone)}" placeholder="예: 02-1234-5678" inputmode="numeric" oninput="handlePhoneInput(this)">
          </label>
        </div>
      </div>

      <div class="card section-card stack-16">
        <div class="card-title">주소</div>
        <div class="field-grid">
          <div class="field-row address-search-row">
            <label class="field-row">
              <span class="field-label">우편번호</span>
              <input id="clinicPostcode" class="input" type="text" value="${escapeAttr(clinicInfo.postcode)}" placeholder="우편번호" readonly>
            </label>
            <button class="btn btn-secondary address-search-button" type="button" onclick="openAddressLookup()">주소 검색</button>
          </div>
          <label class="field-row">
            <span class="field-label">기본 주소</span>
            <input id="clinicAddress" class="input" type="text" value="${escapeAttr(clinicInfo.address)}" placeholder="주소 검색 버튼으로 입력" readonly>
          </label>
          <label class="field-row">
            <span class="field-label">상세 주소</span>
            <input id="clinicAddressDetail" class="input" type="text" value="${escapeAttr(clinicInfo.addressDetail)}" placeholder="예: 5층 501호">
          </label>
        </div>
      </div>

      <div class="card section-card stack-16">
        <div class="section-inline-head">
          <div>
            <div class="card-title">진료 시간</div>
            <div class="card-body">요일별로 여러 줄을 나눠서 입력할 수 있습니다.</div>
          </div>
          <button class="btn btn-secondary" type="button" onclick="addClinicScheduleRow()">+ 시간 추가</button>
        </div>

        <div class="schedule-list">
          ${ensureArray(clinicInfo.schedules).length ? ensureArray(clinicInfo.schedules).map(function (item, index) {
            return renderScheduleRow(item, index);
          }).join('') : `
            <div class="empty-card small-empty">
              <strong>아직 입력된 진료 시간이 없습니다</strong>
              <div>예: 월-금 09:00-18:00, 토요일 09:00-13:00</div>
            </div>
          `}
        </div>

        <label class="field-row">
          <span class="field-label">휴진 안내</span>
          <input id="clinicClosedDays" class="input" type="text" value="${escapeAttr(clinicInfo.closedDays)}" placeholder="예: 일요일, 공휴일">
        </label>
      </div>

      <div class="card section-card stack-16">
        <div class="card-title">부가 정보</div>
        <div class="field-grid">
          <label class="field-row">
            <span class="field-label">주차 안내</span>
            <input id="clinicParking" class="input" type="text" value="${escapeAttr(clinicInfo.parking)}" placeholder="예: 주변 공영주차장 이용, 주차정보는 환자 민감정보입니다. 상세히 입력해주시면 좋습니다">
          </label>
        </div>
      </div>
    </section>
  `;
}

function renderScheduleRow(item, index) {
  return `
    <div class="soft-card schedule-row-card" data-schedule-row="${index}">
      <div class="schedule-row-head">
        <strong>진료 시간 ${index + 1}</strong>
        <button class="action-button" type="button" onclick="removeClinicScheduleRow(${index})">삭제</button>
      </div>
      <input type="hidden" id="schedule-id-${index}" value="${escapeAttr(item.id)}">
      <div class="field-grid">
        <label class="field-row">
          <span class="field-label">요일 / 구간</span>
          <input id="schedule-days-${index}" class="input" type="text" value="${escapeAttr(item.days)}" placeholder="예: 월-금, 토요일">
        </label>
        <div class="field-row two-up">
          <label class="field-row">
            <span class="field-label">시작 시간</span>
            <input id="schedule-open-${index}" class="input" type="time" value="${escapeAttr(item.openTime)}">
          </label>
          <label class="field-row">
            <span class="field-label">종료 시간</span>
            <input id="schedule-close-${index}" class="input" type="time" value="${escapeAttr(item.closeTime)}">
          </label>
        </div>
        <label class="field-row">
          <span class="field-label">비고</span>
          <input id="schedule-note-${index}" class="input" type="text" value="${escapeAttr(item.note)}" placeholder="예: 점심시간 13:00-14:00">
        </label>
      </div>
    </div>
  `;
}

function renderSummaryStep() {
  ensureSummaryInsights();
  const completion = computeCompletion(state.draft);
  const insights = state.summaryInsights.data;
  const averageCompletion = insights ? Number(insights.averageCompletion || 0) : 0;
  const delta = insights ? Number(insights.deltaFromAverage || 0) : 0;
  const deltaClass = delta >= 0 ? 'positive' : 'negative';
  const deltaSuffix = delta >= 0 ? '더 작성했어요.' : '덜 작성했어요.';
  const myTone = delta >= 0 ? 'blue' : 'red';

  return `
    <section class="summary-stage">
      ${insights && insights.rank && insights.totalDoctors && Number(insights.totalDoctors) <= 1000 ? `
        <div class="summary-rank-banner">
          현재 ${escapeHtml(String(insights.rank || 0))}번째로 프로필을 작성했어요. AI 적용시 보다 빠른 학습이 예상됩니다
        </div>
      ` : ''}

      <div class="summary-hero">
        <div class="eyebrow dark">final check</div>
        <h1 class="hero-title">프로필 검토가 거의 끝났습니다</h1>
        <div class="hero-body">입력한 내용을 한 번 더 확인해 주세요. 제출 후에도 같은 이름, 휴대폰 번호, 면허번호로 다시 들어오면 수정할 수 있습니다.</div>
      </div>

      <div class="summary-compare">
        <div class="summary-ring-card">
          <div class="ring-wrap comparison">
            ${renderComparisonRing(averageCompletion, 'green', '평균 입력 완성도')}
          </div>
        </div>
        <div class="summary-ring-card">
          <div class="ring-wrap comparison">
            ${renderComparisonRing(completion, myTone, '내 입력 완성도')}
          </div>
        </div>
      </div>

      <div class="summary-comparison-copy">
        ${insights
          ? `모든 의사 평균보다 <span class="summary-delta ${deltaClass}">${escapeHtml(String(Math.abs(delta)))}%</span> ${escapeHtml(deltaSuffix)}`
          : state.summaryInsights.loading
            ? '모든 의사 평균과 비교를 계산하고 있습니다.'
            : '모든 의사 평균을 불러오는 중입니다.'}
        ${insights ? `<div class="summary-helper-copy">현재 평균 입력 완성도는 ${escapeHtml(String(averageCompletion))}%입니다.</div>` : ''}
        ${state.summaryInsights.error ? `<div class="summary-helper-copy">${escapeHtml(state.summaryInsights.error)}</div>` : ''}
      </div>

      <div class="summary-list compact">
        ${renderSummaryRow('education', ensureArray(state.draft.education).length + '건')}
        ${renderSummaryRow('society', ensureArray(state.draft.society).length + '건')}
        ${renderSummaryRow('qualification', ensureArray(state.draft.qualification).length + '건')}
        ${renderSummaryRow('training', ensureArray(state.draft.training).length + '건')}
        ${renderSummaryRow('career', ensureArray(state.draft.career).length + '건')}
        ${renderSummaryRow('other', ensureArray(state.draft.other).length + '건')}
        ${renderSummaryRow('clinic', isClinicInfoComplete(state.draft.clinicInfo) ? '입력 완료' : '추가 확인 필요')}
      </div>
    </section>
  `;
}

function renderSummaryStatCard(label, value, small) {
  return `
    <div class="summary-card">
      <div class="summary-card-label">${escapeHtml(label)}</div>
      <div class="summary-card-value${small ? ' small' : ''}">${escapeHtml(value)}</div>
    </div>
  `;
}

function renderSummaryRow(sectionKey, text) {
  const label =
    sectionKey === 'education'
      ? '학력'
      : sectionKey === 'clinic'
        ? '병원 정보'
        : SECTION_META[sectionKey].label;
  return `
    <div class="summary-row">
      <div>
        <strong>${escapeHtml(label)}</strong>
        <span>${escapeHtml(text)}</span>
      </div>
      <button class="action-button primary" type="button" onclick="goToStep('${sectionKey}')">수정</button>
    </div>
  `;
}

function renderComparisonRing(percent, tone, caption) {
  const radius = 62;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  return `
    <svg width="164" height="164" viewBox="0 0 164 164" aria-hidden="true" class="comparison-ring comparison-ring-${escapeAttr(tone)}">
      <circle cx="82" cy="82" r="${radius}" fill="none" stroke="rgba(29,29,31,0.08)" stroke-width="9"></circle>
      <circle
        cx="82"
        cy="82"
        r="${radius}"
        fill="none"
        class="comparison-ring-progress"
        stroke-width="9"
        stroke-linecap="round"
        stroke-dasharray="${circumference}"
        stroke-dashoffset="${circumference}"
        style="--ring-circumference:${circumference};--ring-offset:${offset};"
        transform="rotate(-90 82 82)">
      </circle>
    </svg>
    <div class="ring-content comparison">
      <div>
        <div class="ring-value">${escapeHtml(String(percent))}%</div>
        <div class="ring-caption">${escapeHtml(caption)}</div>
      </div>
    </div>
  `;
}

function renderBottomBar() {
  const isSummary = state.currentStepKey === 'summary';
  const isFirstFlowStep = state.currentStepKey === FLOW_STEPS[0].key;
  const primaryLabel = isSummary
    ? state.submitBusy
      ? '제출 중…'
      : state.draft.status === 'submitted'
        ? '수정 내용 다시 제출'
        : '제출 완료하기'
    : '다음 단계';

  return `
    <div class="bottom-bar">
      <div class="bottom-bar-inner">
        <button class="btn btn-secondary" type="button" onclick="goBack()" ${isFirstFlowStep || state.submitBusy ? 'disabled' : ''}>이전</button>
        <button class="btn btn-primary" type="button" onclick="goNext()" ${state.submitBusy ? 'disabled' : ''}>${primaryLabel}</button>
      </div>
    </div>
  `;
}

function renderEditorModal() {
  const sectionKey = state.editor.sectionKey;
  const item = state.editor.item || createEmptyItem(sectionKey, state.editor.slotType);
  const title = getEditorTitle(sectionKey, item);

  return `
    <div class="modal modal-editor modal-editor-${escapeAttr(sectionKey)}" onclick="handleModalBackdrop(event)">
      <div class="modal-card editor-sheet editor-sheet-${escapeAttr(sectionKey)}" onclick="stopOverlayEvent(event)">
        <div class="modal-head">
          <div class="modal-title">${escapeHtml(title)}</div>
        </div>
        <div class="modal-body">
          ${renderEditorFields(sectionKey, item)}
          ${state.editor.error ? `<div class="error-text">${escapeHtml(state.editor.error)}</div>` : ''}
        </div>
        <div class="modal-foot">
          <div class="modal-actions">
            <button class="btn btn-secondary" type="button" style="flex:1;" onclick="closeEditor()">닫기</button>
            <button class="btn btn-primary" type="button" style="flex:1;" onclick="saveEditorItem()">저장하기</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderConfirmDialog() {
  return `
    <div class="modal modal-confirm" onclick="closeConfirmDialog()">
      <div class="modal-card confirm-card" onclick="stopOverlayEvent(event)">
        <div class="modal-head">
          <div class="modal-title">${escapeHtml(state.confirmDialog.title || '확인')}</div>
        </div>
        <div class="modal-body">
          <div class="card-body">${escapeHtml(state.confirmDialog.message || '')}</div>
        </div>
        <div class="modal-foot">
          <div class="modal-actions">
            <button class="btn btn-secondary" type="button" style="flex:1;" onclick="closeConfirmDialog()">취소</button>
            <button class="btn ${state.confirmDialog.tone === 'danger' ? 'btn-danger' : 'btn-primary'}" type="button" style="flex:1;" onclick="confirmDialogProceed()">${escapeHtml(state.confirmDialog.confirmLabel || '확인')}</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderEditorFields(sectionKey, item) {
  if (sectionKey === 'education') {
    return `
      ${renderInputField({
        id: 'editor-institution',
        label: '학교명 / 기관명',
        value: item.institution,
        required: true,
        placeholder: '예: 서울대학교 의과대학',
      })}
      ${renderInputField({
        id: 'editor-department',
        label: '학과 / 전공',
        value: item.department,
        placeholder: '예: 의학과',
      })}
      ${renderInputField({
        id: 'editor-degree',
        label: '학위',
        value: item.degree,
        placeholder: '예: 학사, 석사, 박사',
      })}
      <div class="field-row two-up">
        ${renderSelectField({
          id: 'editor-startYear',
          label: '입학년도',
          value: item.startYear,
          options: buildYearOptions({ minYear: 1930, anchorYear: 1980 }),
          onchange: "handleEditorFieldChange('startYear', this.value)",
        })}
        ${renderSelectField({
          id: 'editor-graduationYear',
          label: '졸업년도',
          value: item.graduationYear,
          options: buildYearOptions({ minYear: 1930, anchorYear: 1980 }),
          onchange: "handleEditorFieldChange('graduationYear', this.value)",
        })}
      </div>
    `;
  }

  if (sectionKey === 'society') {
    return `
      ${renderInputField({
        id: 'editor-societyName',
        label: '학회명(공식 명칭)',
        value: item.societyName,
        required: true,
        placeholder: '학회명을 검색해 선택해 주세요',
        list: 'society-catalog-list',
      })}
      <datalist id="society-catalog-list">
        ${getSocietyCatalog().map(function (name) {
          return `<option value="${escapeAttr(name)}"></option>`;
        }).join('')}
      </datalist>
      <div class="micro-copy">대한의사협회 평점부과 학회 기준으로 검색해 선택해 주세요.</div>
      <div class="field-row two-up">
        ${renderInputField({
          id: 'editor-title',
          label: '역할 / 직책(선택)',
          value: item.title,
          placeholder: '예: 회장, 이사, 학술위원장',
        })}
        ${renderInputField({
          id: 'editor-memberStatus',
          label: '회원 구분(선택)',
          value: item.memberStatus,
          placeholder: '예: 정회원, 평생회원',
        })}
      </div>
      ${renderInputField({
        id: 'editor-subOrganization',
        label: '소속 분과 / 위원회(선택)',
        value: item.subOrganization,
        placeholder: '예: 갑상선연구회, 보험위원회',
      })}
      ${renderCheckboxField({
        id: 'editor-isCurrent',
        label: '현재 활동 중',
        checked: !!item.isCurrent,
      })}
      <div class="field-row two-up">
        ${renderSelectField({
          id: 'editor-startYear',
          label: '시작년도',
          value: item.startYear,
          options: buildYearOptions(),
        })}
        ${renderSelectField({
          id: 'editor-endYear',
          label: '종료년도',
          value: item.endYear,
          options: buildYearOptions(),
        })}
      </div>
      <div class="micro-copy">종료년도를 비워두면 현재 활동으로 저장됩니다. 역할이 바뀌었다면 항목을 나눠 입력해 주세요.</div>
      ${renderTextAreaField({
        id: 'editor-notes',
        label: '메모(선택)',
        value: item.notes,
        placeholder: '예: 춘계학술대회 좌장',
      })}
    `;
  }

  if (sectionKey === 'qualification') {
    const credentialType = normalizeLicenseCredentialType(item.credentialType, item);
    const isSpecialist = normalizeYesNoValue(item.isSpecialist || '아니오');
    const specialtySelectValue = getSpecialtySelectValue(item);
    return `
      ${renderSelectField({
        id: 'editor-credentialType',
        label: '구분',
        value: credentialType,
        options: QUALIFICATION_TYPES,
        required: true,
        onchange: "handleEditorFieldChange('credentialType', this.value)",
      })}
      ${renderInputField({
        id: 'editor-credentialNumber',
        label: '면허번호',
        value: item.credentialNumber || state.draft.identity.licenseNumber,
        placeholder: '숫자로 입력해 주세요',
        type: 'tel',
        inputmode: 'numeric',
        oninput: "this.value=this.value.replace(/[^0-9]/g, '')",
      })}
      ${renderSelectField({
        id: 'editor-licenseAcquiredYear',
        label: '면허 취득년도',
        value: item.licenseAcquiredYear,
        options: buildYearOptions({ minYear: 1930, anchorYear: 1980 }),
      })}
      ${renderSegmentField('editor-isSpecialist', '전문의 여부', SPECIALIST_OPTIONS, isSpecialist, "handleEditorFieldChange('isSpecialist', value)")}
      ${isSpecialist === '예' ? renderExpandableBlock(
        true,
        `
          <div class="soft-card branch-card">
          ${renderSelectField({
            id: 'editor-specialtySelect',
            label: '전문분과',
            value: specialtySelectValue,
            options: SPECIALTY_OPTIONS.concat([SPECIALTY_OTHER_VALUE]),
            onchange: "handleEditorFieldChange('specialtySelect', this.value)",
          })}
          ${specialtySelectValue === SPECIALTY_OTHER_VALUE ? renderInputField({
            id: 'editor-specialtyOther',
            label: '목록에 없음',
            value: item.specialtyOther || (!SPECIALTY_OPTIONS.includes(item.specialty || '') ? item.specialty || '' : ''),
            placeholder: '전문분과를 직접 입력해 주세요',
          }) : ''}
          ${renderInputField({
            id: 'editor-specialistNumber',
            label: '전문의번호',
            value: item.specialistNumber,
            placeholder: '숫자로 입력해 주세요',
            type: 'tel',
            inputmode: 'numeric',
            oninput: "this.value=this.value.replace(/[^0-9]/g, '')",
          })}
          ${renderSelectField({
            id: 'editor-specialistAcquiredYear',
            label: '취득년도',
            value: item.specialistAcquiredYear,
            options: buildYearOptions({ minYear: 1930, anchorYear: 1980 }),
          })}
          ${renderInputField({
            id: 'editor-issuingOrganization',
            label: '인증기관',
            value: item.issuingOrganization,
            placeholder: '예: 대한가정의학회',
          })}
          </div>
        `
      ) : ''}
    `;
  }

  if (sectionKey === 'training') {
    return `
      ${renderInputField({
        id: 'editor-institution',
        label: '기관명',
        value: item.institution,
        required: true,
        placeholder: '예: 서울아산병원',
      })}
      ${renderSelectField({
        id: 'editor-trainingType',
        label: '수련 구분',
        value: item.trainingType,
        options: TRAINING_TYPES,
        required: true,
        onchange: "handleEditorFieldChange('trainingType', this.value)",
      })}
      ${item.trainingType !== '인턴' ? renderInputField({
        id: 'editor-department',
        label: '진료과',
        value: item.department,
        placeholder: '예: 정형외과',
      }) : ''}
      ${renderSelectField({
        id: 'editor-status',
        label: '상태',
        value: item.status,
        options: TRAINING_STATUS_OPTIONS,
      })}
      <div class="field-row two-up">
        ${renderSelectField({
          id: 'editor-startYear',
          label: '시작년도',
          value: item.startYear,
          options: buildYearOptions(),
        })}
        ${renderSelectField({
          id: 'editor-endYear',
          label: '종료년도',
          value: item.endYear,
          options: buildYearOptions(),
        })}
      </div>
    `;
  }

  if (sectionKey === 'career') {
    return `
      ${renderInputField({
        id: 'editor-institution',
        label: '기관명',
        value: item.institution,
        required: true,
        placeholder: '예: 닥스밋의원',
      })}
      ${renderInputField({
        id: 'editor-department',
        label: '진료과 / 부서',
        value: item.department,
        placeholder: '예: 정형외과',
      })}
      ${renderInputField({
        id: 'editor-position',
        label: '직책',
        value: item.position,
        required: true,
        placeholder: '예: 원장',
      })}
      <div class="field-row two-up">
        ${renderSelectField({
          id: 'editor-startYear',
          label: '시작년도',
          value: item.startYear,
          options: buildYearOptions(),
        })}
        ${renderSelectField({
          id: 'editor-endYear',
          label: '종료년도',
          value: item.endYear,
          options: buildYearOptions(),
        })}
      </div>
      ${renderCheckboxField({
        id: 'editor-ongoing',
        label: '현재 재직 중',
        checked: !!item.ongoing,
      })}
      ${renderTextAreaField({
        id: 'editor-notes',
        label: '메모',
        value: item.notes,
        placeholder: '선택 입력',
      })}
    `;
  }

  return `
    ${renderSelectField({
      id: 'editor-subtype',
      label: '활동 유형',
      value: item.subtype,
      options: OTHER_ACTIVITY_TYPES,
      required: true,
    })}
    ${renderTextAreaField({
      id: 'editor-content',
      label: '내용',
      value: item.content,
      required: true,
      placeholder: '예: 대한정형외과학회 춘계학술대회 강연',
    })}
    ${renderSelectField({
      id: 'editor-year',
      label: '연도',
      value: item.year,
      options: buildYearOptions(),
    })}
    ${renderTextAreaField({
      id: 'editor-notes',
      label: '메모',
      value: item.notes,
      placeholder: '선택 입력',
    })}
  `;
}

function renderInputField(options) {
  return `
    <label class="field-row">
      <span class="field-label">${escapeHtml(options.label)}${options.required ? ' *' : ''}</span>
      <input
        id="${escapeAttr(options.id)}"
        class="input"
        type="${escapeAttr(options.type || 'text')}"
        value="${escapeAttr(options.value || '')}"
        placeholder="${escapeAttr(options.placeholder || '')}"
        ${options.list ? `list="${escapeAttr(options.list)}"` : ''}
        ${options.inputmode ? `inputmode="${escapeAttr(options.inputmode)}"` : ''}
        ${options.readonly ? 'readonly' : ''}
        ${options.oninput ? `oninput="${escapeAttr(options.oninput)}"` : ''}
        ${options.onchange ? `onchange="${escapeAttr(options.onchange)}"` : ''}>
    </label>
  `;
}

function renderTextAreaField(options) {
  return `
    <label class="field-row">
      <span class="field-label">${escapeHtml(options.label)}${options.required ? ' *' : ''}</span>
      <textarea id="${escapeAttr(options.id)}" class="textarea" placeholder="${escapeAttr(options.placeholder || '')}">${escapeHtml(options.value || '')}</textarea>
    </label>
  `;
}

function renderSelectField(options) {
  const isYearSelect = isFlatYearOptions(options.options);
  const yearAnchorValue = String(options.anchorValue || 1980);
  const selectAttrs = [
    options.onchange ? `onchange="handleSelectFieldChange(this); ${escapeAttr(options.onchange)}"` : 'onchange="handleSelectFieldChange(this)"',
    isYearSelect ? `data-year-anchor="${escapeAttr(yearAnchorValue)}"` : '',
    isYearSelect ? 'onpointerdown="primeYearSelectAnchor(this)"' : '',
    isYearSelect ? 'onfocus="primeYearSelectAnchor(this)"' : '',
  ].filter(Boolean).join(' ');
  return `
    <label class="field-row">
      <span class="field-label">${escapeHtml(options.label)}${options.required ? ' *' : ''}</span>
      <select id="${escapeAttr(options.id)}" class="select" ${selectAttrs}>
        <option value="">선택</option>
        ${renderSelectOptions(options.options, options.value)}
      </select>
    </label>
  `;
}

function renderSelectOptions(options, currentValue) {
  return options.map(function (option) {
    if (option && typeof option === 'object' && option.options) {
      return `
        <optgroup label="${escapeAttr(option.label)}">
          ${option.options.map(function (groupOption) {
            return `<option value="${escapeAttr(groupOption)}" ${groupOption === currentValue ? 'selected' : ''}>${escapeHtml(groupOption)}</option>`;
          }).join('')}
        </optgroup>
      `;
    }
    const optionLabel = option === SPECIALTY_OTHER_VALUE ? '목록에 없음' : option;
    return `<option value="${escapeAttr(option)}" ${option === currentValue ? 'selected' : ''}>${escapeHtml(optionLabel)}</option>`;
  }).join('');
}

function renderExpandableBlock(isOpen, content) {
  return `
    <div class="expand-block ${isOpen ? 'open fade-up' : ''}">
      <div class="expand-block-inner">
        ${content}
      </div>
    </div>
  `;
}

function renderCheckboxField(options) {
  return `
    <label class="checkbox-row">
      <input id="${escapeAttr(options.id)}" type="checkbox" ${options.checked ? 'checked' : ''}>
      <span>${escapeHtml(options.label)}</span>
    </label>
  `;
}

function renderSegmentField(id, label, options, currentValue, handler) {
  return `
    <div class="field-row">
      <span class="field-label">${escapeHtml(label)}</span>
      <div class="segment-group">
        ${options.map(function (option) {
          return `
            <button
              class="segment-button ${option === currentValue ? 'active' : ''}"
              type="button"
              onclick="${escapeAttr(handler.replace('value', "'" + option + "'"))}">
              ${escapeHtml(option)}
            </button>
          `;
        }).join('')}
      </div>
      <input id="${escapeAttr(id)}" type="hidden" value="${escapeAttr(currentValue)}">
    </div>
  `;
}

function renderItemCard(sectionKey, item, index) {
  return `
    <div class="item-card">
      <div class="item-card-head">
        <div>
          <div class="item-card-title">${escapeHtml(getItemTitle(sectionKey, item))}</div>
          ${getItemSubtitle(sectionKey, item) ? `<div class="item-card-subtitle">${escapeHtml(getItemSubtitle(sectionKey, item))}</div>` : ''}
          ${getItemPeriod(sectionKey, item) ? `<div class="item-card-period">${escapeHtml(getItemPeriod(sectionKey, item))}</div>` : ''}
        </div>
        <div class="item-actions">
          <button class="action-button primary" type="button" onclick="openEditor('${sectionKey}', ${index})">수정</button>
          <button class="action-button" type="button" onclick="deleteItem('${sectionKey}', ${index})">삭제</button>
        </div>
      </div>
      ${getItemNotes(sectionKey, item) ? `<div class="item-card-notes">${escapeHtml(getItemNotes(sectionKey, item))}</div>` : ''}
    </div>
  `;
}

function getEditorTitle(sectionKey, item) {
  if (sectionKey === 'education') {
    return (item.slotType || '학력') + ' 입력';
  }
  const meta = SECTION_META[sectionKey];
  return state.editor.index > -1 ? `${meta.label} 수정` : `${meta.label} 추가`;
}

function getItemTitle(sectionKey, item) {
  if (sectionKey === 'education') {
    return item.institution || item.slotType || '학력';
  }
  if (sectionKey === 'society') {
    return item.societyName || '학회';
  }
  if (sectionKey === 'qualification') {
    if (item.isSpecialist === '예' && getQualificationSpecialty(item)) {
      return getQualificationSpecialty(item);
    }
    return item.credentialType || '자격';
  }
  if (sectionKey === 'training') {
    return item.institution || '수련';
  }
  if (sectionKey === 'career') {
    return item.institution || '경력';
  }
  return item.content || '기타 활동';
}

function getItemSubtitle(sectionKey, item) {
  if (sectionKey === 'education') {
    return [item.slotType, item.department].filter(Boolean).join(' · ');
  }
  if (sectionKey === 'society') {
    return [item.title, item.memberStatus, item.subOrganization].filter(Boolean).join(' · ');
  }
  if (sectionKey === 'qualification') {
    const parts = [];
    if (item.credentialNumber) {
      parts.push('면허번호 ' + item.credentialNumber);
    }
    if (item.licenseAcquiredYear) {
      parts.push('면허 취득년도 ' + item.licenseAcquiredYear);
    }
    parts.push('전문의 여부 ' + (item.isSpecialist || '아니오'));
    if (item.isSpecialist === '예' && getQualificationSpecialty(item)) {
      parts.push(getQualificationSpecialty(item));
    }
    if (item.isSpecialist === '예' && item.specialistNumber) {
      parts.push('전문의번호 ' + item.specialistNumber);
    }
    if (item.isSpecialist === '예' && item.specialistAcquiredYear) {
      parts.push('취득년도 ' + item.specialistAcquiredYear);
    }
    if (item.isSpecialist === '예' && item.issuingOrganization) {
      parts.push(item.issuingOrganization);
    }
    return parts.join(' · ');
  }
  if (sectionKey === 'training') {
    return [item.trainingType, item.department, item.status].filter(Boolean).join(' · ');
  }
  if (sectionKey === 'career') {
    return [item.department, item.position].filter(Boolean).join(' · ');
  }
  return [item.subtype].filter(Boolean).join(' · ');
}

function getItemPeriod(sectionKey, item) {
  if (sectionKey === 'education') {
    return formatPeriod(item.startYear, item.graduationYear);
  }
  if (sectionKey === 'society') {
    return formatPeriod(item.startYear, item.endYear, !item.endYear && !!item.startYear);
  }
  if (sectionKey === 'qualification') {
    if (item.isSpecialist === '예' && item.specialistAcquiredYear) {
      return `${item.specialistAcquiredYear} 취득`;
    }
    return item.licenseAcquiredYear ? `${item.licenseAcquiredYear} 취득` : '';
  }
  if (sectionKey === 'training') {
    return formatPeriod(item.startYear, item.endYear, item.status === '재직' && !item.endYear);
  }
  if (sectionKey === 'career') {
    return item.ongoing ? `${item.startYear || '연도 미입력'} - 현재` : formatPeriod(item.startYear, item.endYear);
  }
  if (sectionKey === 'other') {
    return item.year || '';
  }
  return '';
}

function getItemNotes(sectionKey, item) {
  return item.notes || '';
}

function getFlowStepMeta(stepKey) {
  return FLOW_STEPS.find(function (step) {
    return step.key === stepKey;
  }) || FLOW_STEPS[0];
}

function buildYearOptions(config) {
  const options = config || {};
  const currentYear = options.maxYear || 2030;
  const minYear = options.minYear || 1930;
  const years = [];

  for (let year = minYear; year <= currentYear; year += 1) {
    years.push(String(year));
  }

  return years;
}

function isFlatYearOptions(options) {
  return Array.isArray(options) && options.length > 1 && options[0] === '1930' && options[options.length - 1] === '2030';
}

function primeYearSelectAnchor(element) {
  if (!element || element.value) {
    return;
  }
  const anchorValue = element.dataset.yearAnchor || '1980';
  element.value = anchorValue;
}

function handleSelectFieldChange(element) {
  if (!element) {
    return;
  }
}

function syncUiAfterRender() {
  const hasOverlay = !!(state.editor.open || state.confirmDialog.open);
  document.documentElement.classList.toggle('modal-open', hasOverlay);
  document.body.classList.toggle('modal-open', hasOverlay);
  applyStepperVisibility();
  restoreEditorViewport();
}

function handleViewportResize() {
  state.viewport.width = window.innerWidth;
  if (state.viewport.width > 767) {
    state.viewport.stepperHidden = false;
  }
  applyStepperVisibility();
}

function handleWindowScroll() {
  const currentY = window.scrollY || 0;
  const delta = currentY - state.viewport.lastScrollY;
  state.viewport.lastScrollY = currentY;
  if (!isMobileViewport() || state.currentStepKey === 'identity' || state.editor.open || state.confirmDialog.open) {
    if (state.viewport.stepperHidden) {
      state.viewport.stepperHidden = false;
      applyStepperVisibility();
    }
    return;
  }
  if (currentY < 24 || delta < -10) {
    if (state.viewport.stepperHidden) {
      state.viewport.stepperHidden = false;
      applyStepperVisibility();
    }
    return;
  }
  if (delta > 10 && !state.viewport.stepperHidden) {
    state.viewport.stepperHidden = true;
    applyStepperVisibility();
  }
}

function applyStepperVisibility() {
  const stepper = document.getElementById('flow-stepper');
  if (!stepper) {
    return;
  }
  const shouldHide = !!(state.viewport.stepperHidden && isMobileViewport() && !state.editor.open && !state.confirmDialog.open);
  stepper.classList.toggle('is-hidden', shouldHide);
}

function isMobileViewport() {
  return (state.viewport.width || window.innerWidth || 1440) <= 767;
}

function restoreEditorViewport() {
  if (!state.editor.open) {
    return;
  }
  const shouldResetScroll = !!(state.editor.meta && state.editor.meta.resetScroll);
  const focusFieldId = state.editor.meta && state.editor.meta.focusFieldId ? state.editor.meta.focusFieldId : '';
  if (!shouldResetScroll && !focusFieldId) {
    return;
  }
  window.requestAnimationFrame(function () {
    const modal = document.querySelector('.editor-sheet');
    if (modal && shouldResetScroll) {
      modal.scrollTop = 0;
    }
    if (focusFieldId) {
      const focusField = document.getElementById(focusFieldId);
      if (focusField && typeof focusField.scrollIntoView === 'function') {
        focusField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    state.editor.meta = Object.assign({}, state.editor.meta || {}, {
      resetScroll: false,
      focusFieldId: '',
    });
  });
}

function getSocietyCatalog() {
  return state.bootstrap && Array.isArray(state.bootstrap.societyCatalog) ? state.bootstrap.societyCatalog : [];
}

function getEducationItemBySlot(slotType) {
  return ensureArray(state.draft.education).find(function (item) {
    return normalizeEducationSlot(item.slotType || item.degree) === slotType;
  }) || null;
}

function getEducationItemsBySlot(slotType) {
  return ensureArray(state.draft.education).filter(function (item) {
    return normalizeEducationSlot(item.slotType || item.degree) === slotType;
  });
}

function getEducationDisplayItemBySlot(slotType, items) {
  const slotItems = ensureArray(items).filter(function (item) {
    return normalizeEducationSlot(item.slotType || item.degree) === slotType;
  });
  if (!slotItems.length) {
    return null;
  }
  return slotItems
    .slice()
    .sort(function (a, b) {
      return getSortScore('education', b) - getSortScore('education', a);
    })[0];
}

function shouldAutoEducationGraduation(index, item) {
  const slotType = normalizeEducationSlot(item && (item.slotType || item.degree));
  if (slotType !== '학사') {
    return false;
  }
  const startYear = normalizeYearValue(item && item.startYear);
  const graduationYear = normalizeYearValue(item && item.graduationYear);
  if (index < 0 || !graduationYear) {
    return true;
  }
  return !!(startYear && graduationYear === deriveEducationGraduationYear(startYear, slotType));
}

function deriveEducationGraduationYear(startYear, slotType) {
  const normalizedStartYear = normalizeYearValue(startYear);
  if (!normalizedStartYear) {
    return '';
  }
  if (normalizeEducationSlot(slotType) !== '학사') {
    return '';
  }
  return String(parseInt(normalizedStartYear, 10) + 7);
}

function getSummaryInsightsKey() {
  return JSON.stringify({
    draftId: state.draft.draftId,
    status: state.draft.status,
    submittedAt: state.draft.submittedAt,
    updatedAt: state.draft.updatedAt,
    completion: computeCompletion(state.draft),
    counts: {
      education: ensureArray(state.draft.education).length,
      society: ensureArray(state.draft.society).length,
      qualification: ensureArray(state.draft.qualification).length,
      training: ensureArray(state.draft.training).length,
      career: ensureArray(state.draft.career).length,
      other: ensureArray(state.draft.other).length,
      clinicName: (state.draft.clinicInfo && state.draft.clinicInfo.clinicName) || '',
      clinicPhone: (state.draft.clinicInfo && state.draft.clinicInfo.phone) || '',
      clinicAddress: (state.draft.clinicInfo && state.draft.clinicInfo.address) || '',
    },
  });
}

function ensureSummaryInsights() {
  if (state.currentStepKey !== 'summary' || !state.draft.draftId) {
    return;
  }

  const cacheKey = getSummaryInsightsKey();
  if (state.summaryInsights.loading && state.summaryInsights.cacheKey === cacheKey) {
    return;
  }
  if (state.summaryInsights.data && state.summaryInsights.cacheKey === cacheKey) {
    return;
  }

  state.summaryInsights.loading = true;
  state.summaryInsights.cacheKey = cacheKey;
  state.summaryInsights.error = '';

  callServer('getSummaryInsights', {
    draft: state.draft,
  })
    .then(function (response) {
      if (state.summaryInsights.cacheKey !== cacheKey) {
        return;
      }
      state.summaryInsights.loading = false;
      state.summaryInsights.data = response || null;
      state.summaryInsights.error = '';
      renderApp();
    })
    .catch(function (error) {
      if (state.summaryInsights.cacheKey !== cacheKey) {
        return;
      }
      state.summaryInsights.loading = false;
      state.summaryInsights.data = null;
      state.summaryInsights.error = error.message || '요약 통계를 불러오지 못했습니다.';
      renderApp();
    });
}

function handlePhoneInput(input) {
  if (!input) {
    return;
  }
  input.value = formatPhoneDisplay(input.value);
}

function readValue(id) {
  const node = document.getElementById(id);
  return node ? String(node.value || '').trim() : '';
}

function syncTransientUiToState() {
  syncCurrentStepFromDom();
  syncEditorFromDom();
}

function syncCurrentStepFromDom() {
  if (state.currentStepKey === 'identity') {
    state.identityForm = readIdentityForm();
    return;
  }

  if (state.currentStepKey === 'clinic') {
    state.draft.clinicInfo = readClinicForm();
  }
}

function syncEditorFromDom() {
  if (!state.editor.open) {
    return;
  }

  try {
    state.editor.item = readEditorFormValues();
  } catch (error) {
    // Ignore partial DOM reads while modal is changing.
  }
}

function readIdentityForm() {
  return {
    name: readValue('identity-name'),
    phone: formatPhoneDisplay(normalizePhone(readValue('identity-phone'))),
    licenseNumber: readValue('identity-license'),
  };
}

function readClinicForm() {
  const schedules = ensureArray((state.draft.clinicInfo || {}).schedules).map(function (item, index) {
    return {
      id: readValue(`schedule-id-${index}`) || item.id || createClientId(),
      days: readValue(`schedule-days-${index}`),
      openTime: readValue(`schedule-open-${index}`),
      closeTime: readValue(`schedule-close-${index}`),
      note: readValue(`schedule-note-${index}`),
    };
  }).filter(function (item) {
    return !!(item.days || item.openTime || item.closeTime || item.note);
  });

  const address = readValue('clinicAddress');
  const addressDetail = readValue('clinicAddressDetail');

  return normalizeClinicInfoClient({
    clinicName: readValue('clinicName'),
    postcode: readValue('clinicPostcode'),
    address: address,
    addressDetail: addressDetail,
    fullAddress: [address, addressDetail].filter(Boolean).join(' '),
    phone: formatPhoneDisplay(normalizePhone(readValue('clinicPhone'))),
    closedDays: readValue('clinicClosedDays'),
    parking: readValue('clinicParking'),
    schedules: schedules,
  });
}

async function handleIdentitySubmit() {
  if (state.identityBusy) {
    return;
  }

  state.identityForm = readIdentityForm();
  const validationError = validateIdentity(state.identityForm);
  if (validationError) {
    state.identityError = validationError;
    renderApp();
    return;
  }

  state.identityError = '';
  state.notice = null;
  saveLastIdentity(state.identityForm);
  state.identityBusy = true;
  renderApp();

  try {
    const cached = readCachedDraft(state.identityForm);
    const response = await callServer('resumeOrCreateDraft', {
      name: state.identityForm.name,
      phone: state.identityForm.phone,
      licenseNumber: state.identityForm.licenseNumber,
      localCacheUpdatedAt: cached && cached.updatedAt ? cached.updatedAt : '',
    });

    hydrateDraft(response.draft);
    state.currentStepKey = response.resumeStepKey || 'education';
    state.localOnly = false;
    state.notice = null;
    cacheCurrentDraft('resume');
  } catch (error) {
    const cached = readCachedDraft(state.identityForm);
    if (cached && cached.draft && cached.draft.draftId) {
      hydrateDraft(cached.draft);
      state.currentStepKey =
        cached.currentStepKey ||
        ((cached.draft.meta && cached.draft.meta.resumeStepKey) || 'education');
      state.localOnly = true;
      state.notice = {
        type: 'warning',
        code: 'resume-local',
        message: '네트워크 문제로 이 기기에 저장된 초안을 불러왔습니다. 연결이 복구되면 다시 서버에 저장해 주세요.',
      };
    } else {
      state.identityError = error.message || '초안을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.';
    }
  } finally {
    state.identityBusy = false;
    renderApp();
  }
}

function validateIdentity(identity) {
  if (!identity.name) {
    return '이름을 입력해 주세요.';
  }
  if (!normalizePhone(identity.phone)) {
    return '휴대폰 번호를 입력해 주세요.';
  }
  if (!identity.licenseNumber) {
    return '의사 면허번호를 입력해 주세요.';
  }
  return '';
}

function hydrateDraft(serverDraft) {
  const nextDraft = Object.assign(createDraftSkeleton(), clone(serverDraft || {}));
  nextDraft.identity = Object.assign(createEmptyIdentity(), nextDraft.identity || {});
  nextDraft.education = ensureArray(nextDraft.education)
    .map(normalizeEducationItem)
    .filter(function (item) {
      return !!(item.institution || item.department || item.degree || item.startYear || item.graduationYear);
    })
    .sort(function (a, b) {
      return EDUCATION_SLOTS.indexOf(a.slotType) - EDUCATION_SLOTS.indexOf(b.slotType);
    });
  nextDraft.society = ensureArray(nextDraft.society).map(normalizeSocietyItem).filter(hasMeaningfulSocietyItem);
  nextDraft.qualification = ensureArray(nextDraft.qualification).map(normalizeQualificationItem).filter(hasMeaningfulQualificationItem);
  nextDraft.training = ensureArray(nextDraft.training).map(normalizeTrainingItem).filter(hasMeaningfulTrainingItem);
  nextDraft.career = ensureArray(nextDraft.career).map(normalizeCareerItem).filter(hasMeaningfulCareerItem);
  nextDraft.other = ensureArray(nextDraft.other).map(normalizeOtherItem).filter(hasMeaningfulOtherItem);
  nextDraft.clinicInfo = normalizeClinicInfoClient(nextDraft.clinicInfo);
  nextDraft.meta = Object.assign({ resumeStepKey: 'education' }, nextDraft.meta || {});
  state.draft = nextDraft;
  state.identityForm = Object.assign(createEmptyIdentity(), nextDraft.identity);
}

function normalizeEducationItem(item) {
  const slotType = normalizeEducationSlot(item.slotType || item.degree);
  const graduationYear = normalizeYearValue(item.graduationYear || item.endYear);
  return {
    id: item.id || createClientId(),
    slotType: slotType,
    institution: item.institution || '',
    department: item.department || '',
    degree: item.degree || slotType,
    startYear: normalizeYearValue(item.startYear),
    graduationYear: graduationYear,
    endYear: graduationYear,
    notes: item.notes || '',
  };
}

function normalizeSocietyItem(item) {
  const startYear = normalizeYearValue(item.startYear);
  const endYear = normalizeYearValue(item.endYear);
  const title = item.title || item.role || '';
  const isCurrent = !!item.isCurrent || (!!startYear && !endYear);
  return {
    id: item.id || createClientId(),
    societyName: item.societyName || '',
    startYear: startYear,
    endYear: isCurrent ? '' : endYear,
    title: title,
    role: title,
    memberStatus: item.memberStatus || '',
    subOrganization: item.subOrganization || '',
    isCurrent: isCurrent,
    notes: item.notes || '',
  };
}

function normalizeQualificationItem(item) {
  const rawCredentialType = normalizeCredentialType(item.credentialType || inferCredentialType(item));
  const credentialType = normalizeLicenseCredentialType(rawCredentialType, item);
  const isSpecialist = normalizeYesNoValue(item.isSpecialist || (isForcedSpecialistType(rawCredentialType) ? '예' : '아니오'));
  const specialtyValue = item.specialty || '';
  const inferredLegacyName = inferCredentialName(item, rawCredentialType);
  const specialty = SPECIALTY_OPTIONS.indexOf(specialtyValue) > -1
    ? specialtyValue
    : credentialType === '치과의사면허' && !item.specialtyOther
      ? '치과'
      : '';
  const specialtyOther =
    item.specialtyOther ||
    (SPECIALTY_OPTIONS.indexOf(specialtyValue) === -1 ? specialtyValue : '') ||
    (isSpecialist === '예' && !specialty ? inferredLegacyName : '');
  const licenseAcquiredYear = normalizeYearValue(
    item.licenseAcquiredYear || (isLicenseCredentialType(rawCredentialType) ? item.acquiredYear : '')
  );
  const specialistAcquiredYear = normalizeYearValue(
    item.specialistAcquiredYear || (isSpecialist === '예' && !isLicenseCredentialType(rawCredentialType) ? item.acquiredYear : '')
  );
  return {
    id: item.id || createClientId(),
    credentialType: credentialType,
    specialty: specialty,
    specialtyOther: specialtyOther,
    credentialName: '',
    credentialNumber: item.credentialNumber || item.licenseNumber || (isLicenseCredentialType(credentialType) ? (item.specialistNumber || '') : ''),
    isSpecialist: isSpecialist,
    specialistNumber: item.specialistNumber || item.certificateNote || '',
    licenseAcquiredYear: licenseAcquiredYear,
    specialistAcquiredYear: specialistAcquiredYear,
    acquiredYear: specialistAcquiredYear || licenseAcquiredYear,
    issuingOrganization: item.issuingOrganization || '',
    title: item.title || credentialType,
    notes: item.notes || '',
  };
}

function normalizeTrainingItem(item) {
  const trainingType = normalizeTrainingType(item.trainingType || item.role);
  return {
    id: item.id || createClientId(),
    institution: item.institution || '',
    department: trainingType === '인턴' ? '' : (item.department || ''),
    trainingType: trainingType,
    status: item.status || '수료',
    startYear: normalizeYearValue(item.startYear),
    endYear: normalizeYearValue(item.endYear),
    notes: item.notes || '',
  };
}

function normalizeCareerItem(item) {
  return {
    id: item.id || createClientId(),
    institution: item.institution || '',
    department: item.department || '',
    position: item.position || '',
    startYear: normalizeYearValue(item.startYear),
    endYear: normalizeYearValue(item.endYear),
    ongoing: !!item.ongoing,
    notes: item.notes || '',
  };
}

function normalizeOtherItem(item) {
  return {
    id: item.id || createClientId(),
    subtype: item.subtype || '',
    content: item.content || '',
    year: normalizeYearValue(item.year),
    notes: item.notes || '',
  };
}

function normalizeClinicInfoClient(clinicInfo) {
  const data = Object.assign(createEmptyClinicInfo(), clinicInfo || {});
  const schedules = ensureArray(data.schedules || data.scheduleItems)
    .map(function (item) {
      return {
        id: item.id || createClientId(),
        days: item.days || '',
        openTime: item.openTime || '',
        closeTime: item.closeTime || '',
        note: item.note || '',
      };
    })
    .filter(function (item) {
      return !!(item.days || item.openTime || item.closeTime || item.note);
    });

  return {
    clinicName: data.clinicName || '',
    postcode: data.postcode || '',
    address: data.address || '',
    addressDetail: data.addressDetail || '',
    fullAddress: data.fullAddress || [data.address || '', data.addressDetail || ''].filter(Boolean).join(' '),
    phone: formatPhoneDisplay(normalizePhone(data.phone || '')),
    openingHours: data.openingHours || buildOpeningHoursSummary(schedules),
    closedDays: data.closedDays || '',
    parking: data.parking || '',
    schedules: schedules.length ? schedules : [createEmptyScheduleItem()],
  };
}

function hasMeaningfulSocietyItem(item) {
  return !!(item.societyName || item.startYear || item.endYear || item.title || item.memberStatus || item.subOrganization || item.notes);
}

function hasMeaningfulQualificationItem(item) {
  return !!(
    item.credentialType ||
    item.specialty ||
    item.specialtyOther ||
    item.credentialName ||
    item.credentialNumber ||
    item.isSpecialist ||
    item.specialistNumber ||
    item.licenseAcquiredYear ||
    item.specialistAcquiredYear ||
    item.issuingOrganization
  );
}

function hasMeaningfulTrainingItem(item) {
  return !!(item.institution || item.trainingType || item.department || item.startYear || item.endYear || item.status);
}

function hasMeaningfulCareerItem(item) {
  return !!(item.institution || item.position || item.department || item.startYear || item.endYear || item.ongoing || item.notes);
}

function hasMeaningfulOtherItem(item) {
  return !!(item.subtype || item.content || item.year || item.notes);
}

function createClientId() {
  return `client-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function openEducationSlot(slotType) {
  openEditor('education', -1, slotType);
}

function openEducationEntry(slotType, index) {
  openEditor('education', index, slotType);
}

function openEditor(sectionKey, index, slotType) {
  syncCurrentStepFromDom();
  const items = ensureArray(state.draft[sectionKey]);
  const editorItem = index > -1 ? clone(items[index]) : createEmptyItem(sectionKey, slotType);
  state.editor = {
    open: true,
    sectionKey: sectionKey,
    index: index,
    slotType: slotType || '',
    item: editorItem,
    meta: {
      autoEducationGraduation:
        sectionKey === 'education'
          ? shouldAutoEducationGraduation(index, editorItem)
          : false,
      resetScroll: true,
      focusFieldId: '',
    },
    error: '',
  };
  renderApp();
}

function closeEditor() {
  state.editor = {
    open: false,
    sectionKey: '',
    index: -1,
    slotType: '',
    item: null,
    meta: {},
    error: '',
  };
  renderApp();
}

function createEmptyItem(sectionKey, slotType) {
  if (sectionKey === 'education') {
    return normalizeEducationItem({
      slotType: slotType || '학사',
      degree: slotType || '학사',
    });
  }
  if (sectionKey === 'society') {
    return normalizeSocietyItem({});
  }
  if (sectionKey === 'qualification') {
    return normalizeQualificationItem({
      credentialType: '의사면허',
      credentialNumber: state.draft.identity.licenseNumber,
      isSpecialist: '아니오',
    });
  }
  if (sectionKey === 'training') {
    return normalizeTrainingItem({
      trainingType: '인턴',
      status: '수료',
    });
  }
  if (sectionKey === 'career') {
    return normalizeCareerItem({});
  }
  return normalizeOtherItem({});
}

function handleEditorFieldChange(fieldKey, value) {
  syncEditorFromDom();
  if (!state.editor.item) {
    return;
  }
  state.editor.item[fieldKey] = value;

  if (state.editor.sectionKey === 'education') {
    if (fieldKey === 'startYear') {
      const currentGraduationYear = state.editor.item.graduationYear;
      if (state.editor.meta.autoEducationGraduation || !currentGraduationYear) {
        const nextGraduationYear = deriveEducationGraduationYear(
          value,
          state.editor.item.slotType || state.editor.slotType
        );
        state.editor.item.graduationYear = nextGraduationYear;
        state.editor.item.endYear = nextGraduationYear;
      }
    }
    if (fieldKey === 'graduationYear') {
      state.editor.meta.autoEducationGraduation = false;
      state.editor.item.endYear = value;
    }
  }

  if (state.editor.sectionKey === 'qualification') {
    if (fieldKey === 'credentialType') {
      state.editor.item.title = value;
      state.editor.item.credentialNumber = state.editor.item.credentialNumber || state.draft.identity.licenseNumber;
      state.editor.item.credentialName = '';
      state.editor.meta.resetScroll = true;
      state.editor.meta.focusFieldId = 'editor-credentialNumber';
      if (value === '치과의사면허' && !state.editor.item.specialty && !state.editor.item.specialtyOther) {
        state.editor.item.specialty = '치과';
      }
      if (state.editor.item.isSpecialist !== '예') {
        state.editor.item.specialistNumber = '';
        state.editor.item.specialty = value === '치과의사면허' ? '치과' : '';
        state.editor.item.specialtyOther = '';
        state.editor.item.issuingOrganization = '';
        state.editor.item.specialistAcquiredYear = '';
      }
    }
    if (fieldKey === 'isSpecialist') {
      const specialistField = document.getElementById('editor-isSpecialist');
      if (specialistField) {
        specialistField.value = value;
      }
      state.editor.meta.resetScroll = true;
      state.editor.meta.focusFieldId = value === '예' ? 'editor-specialtySelect' : 'editor-isSpecialist';
      if (value !== '예') {
        state.editor.item.specialistNumber = '';
        state.editor.item.specialty = '';
        state.editor.item.specialtyOther = '';
        state.editor.item.issuingOrganization = '';
        state.editor.item.specialistAcquiredYear = '';
      }
    }
    if (fieldKey === 'specialtySelect') {
      if (value === SPECIALTY_OTHER_VALUE) {
        state.editor.item.specialty = '';
      } else {
        state.editor.item.specialty = value;
        state.editor.item.specialtyOther = '';
      }
    }
  }

  if (state.editor.sectionKey === 'training' && fieldKey === 'trainingType' && value === '인턴') {
    state.editor.item.department = '';
  }

  renderApp();
}

function stopOverlayEvent(event) {
  if (event && typeof event.stopPropagation === 'function') {
    event.stopPropagation();
  }
}

function handleModalBackdrop(event) {
  if (event.target && event.target.classList.contains('modal')) {
    closeEditor();
  }
}

function readEditorFormValues() {
  const sectionKey = state.editor.sectionKey;
  const base = Object.assign({}, state.editor.item || createEmptyItem(sectionKey, state.editor.slotType));

  if (sectionKey === 'education') {
    return normalizeEducationItem(Object.assign(base, {
      slotType: base.slotType || state.editor.slotType || '학사',
      institution: readValue('editor-institution'),
      department: readValue('editor-department'),
      degree: readValue('editor-degree') || base.slotType || state.editor.slotType || '학사',
      startYear: readValue('editor-startYear'),
      graduationYear: readValue('editor-graduationYear'),
    }));
  }

  if (sectionKey === 'society') {
    const isCurrent = !!(document.getElementById('editor-isCurrent') && document.getElementById('editor-isCurrent').checked);
    return normalizeSocietyItem(Object.assign(base, {
      societyName: readValue('editor-societyName'),
      startYear: readValue('editor-startYear'),
      endYear: isCurrent ? '' : readValue('editor-endYear'),
      title: readValue('editor-title'),
      memberStatus: readValue('editor-memberStatus'),
      subOrganization: readValue('editor-subOrganization'),
      isCurrent: isCurrent,
      notes: readValue('editor-notes'),
    }));
  }

  if (sectionKey === 'qualification') {
    return normalizeQualificationItem(Object.assign(base, {
      credentialType: readValue('editor-credentialType') || base.credentialType,
      specialty:
        readValue('editor-specialtySelect') === SPECIALTY_OTHER_VALUE
          ? readValue('editor-specialtyOther')
          : readValue('editor-specialtySelect'),
      specialtyOther:
        readValue('editor-specialtySelect') === SPECIALTY_OTHER_VALUE
          ? readValue('editor-specialtyOther')
          : '',
      credentialName: '',
      credentialNumber: readValue('editor-credentialNumber'),
      isSpecialist: readValue('editor-isSpecialist') || base.isSpecialist,
      specialistNumber: readValue('editor-specialistNumber'),
      licenseAcquiredYear: readValue('editor-licenseAcquiredYear'),
      specialistAcquiredYear: readValue('editor-specialistAcquiredYear'),
      issuingOrganization: readValue('editor-issuingOrganization'),
    }));
  }

  if (sectionKey === 'training') {
    return normalizeTrainingItem(Object.assign(base, {
      institution: readValue('editor-institution'),
      trainingType: readValue('editor-trainingType') || base.trainingType,
      department: readValue('editor-department'),
      status: readValue('editor-status') || base.status,
      startYear: readValue('editor-startYear'),
      endYear: readValue('editor-endYear'),
    }));
  }

  if (sectionKey === 'career') {
    return normalizeCareerItem(Object.assign(base, {
      institution: readValue('editor-institution'),
      department: readValue('editor-department'),
      position: readValue('editor-position'),
      startYear: readValue('editor-startYear'),
      endYear: readValue('editor-endYear'),
      ongoing: !!(document.getElementById('editor-ongoing') && document.getElementById('editor-ongoing').checked),
      notes: readValue('editor-notes'),
    }));
  }

  return normalizeOtherItem(Object.assign(base, {
    subtype: readValue('editor-subtype'),
    content: readValue('editor-content'),
    year: readValue('editor-year'),
    notes: readValue('editor-notes'),
  }));
}

function validateEditorItem(sectionKey, item) {
  if (sectionKey === 'education' && !item.institution) {
    return '학교명 또는 기관명을 입력해 주세요.';
  }
  if (sectionKey === 'society') {
    if (!item.societyName) {
      return '학회명을 입력해 주세요.';
    }
    if (getSocietyCatalog().indexOf(item.societyName) === -1) {
      return '학회명은 제공된 목록 안에서 선택해 주세요.';
    }
    if (item.startYear && item.endYear && Number(item.startYear) > Number(item.endYear)) {
      return '종료년도는 시작년도보다 같거나 이후여야 합니다.';
    }
  }
  if (sectionKey === 'qualification') {
    if (!item.credentialType) {
      return '구분을 선택해 주세요.';
    }
    if (!item.credentialNumber) {
      return '면허번호를 입력해 주세요.';
    }
    if (item.specialty && SPECIALTY_OPTIONS.indexOf(item.specialty) === -1 && !item.specialtyOther) {
      return '전문분과는 제공된 목록 안에서 선택해 주세요.';
    }
  }
  if (sectionKey === 'training') {
    if (!item.institution) {
      return '기관명을 입력해 주세요.';
    }
    if (!item.trainingType) {
      return '수련 구분을 선택해 주세요.';
    }
  }
  if (sectionKey === 'career' && (!item.institution || !item.position)) {
    return '기관명과 직책을 입력해 주세요.';
  }
  if (sectionKey === 'other' && (!item.subtype || !item.content)) {
    return '활동 유형과 내용을 입력해 주세요.';
  }
  return '';
}

function saveEditorItem() {
  const sectionKey = state.editor.sectionKey;
  const item = readEditorFormValues();
  const validationError = validateEditorItem(sectionKey, item);
  if (validationError) {
    state.editor.item = item;
    state.editor.error = validationError;
    renderApp();
    return;
  }

  let items = ensureArray(state.draft[sectionKey]).slice();
  if (sectionKey === 'education') {
    const slotType = normalizeEducationSlot(item.slotType || state.editor.slotType);
    item.slotType = slotType;
    item.degree = item.degree || slotType;
    if (state.editor.index > -1) {
      items[state.editor.index] = item;
    } else {
      items.unshift(item);
    }
  } else if (state.editor.index > -1) {
    items[state.editor.index] = item;
  } else {
    items.unshift(item);
  }

  state.draft[sectionKey] = sortSectionItems(sectionKey, items);
  state.draft.lastCompletedStep = sectionKey;
  state.draft.meta = Object.assign({}, state.draft.meta || {}, { resumeStepKey: sectionKey });
  cacheCurrentDraft('item-save');
  closeEditorWithoutRender();
  renderApp();
  queueDraftSave({
    stepKey: sectionKey,
    resumeStepKey: sectionKey,
    actionSource: 'item_save',
    draftSnapshot: clone(state.draft),
  });
}

function closeEditorWithoutRender() {
  state.editor = {
    open: false,
    sectionKey: '',
    index: -1,
    slotType: '',
    item: null,
    meta: {},
    error: '',
  };
}

function deleteItem(sectionKey, index) {
  openConfirmDialog({
    title: '항목 삭제',
    message: '이 항목을 삭제할까요? 삭제 후에는 현재 초안과 최신 시트 데이터에서 제외됩니다.',
    confirmLabel: '삭제',
    tone: 'danger',
    onConfirm: function () {
      const items = ensureArray(state.draft[sectionKey]).slice();
      items.splice(index, 1);
      state.draft[sectionKey] = items;
      state.draft.lastCompletedStep = sectionKey;
      state.draft.meta = Object.assign({}, state.draft.meta || {}, { resumeStepKey: sectionKey });
      cacheCurrentDraft('item-delete');
      renderApp();
      queueDraftSave({
        stepKey: sectionKey,
        resumeStepKey: sectionKey,
        actionSource: 'item_delete',
        draftSnapshot: clone(state.draft),
      });
    },
  });
}

function sortSectionItems(sectionKey, items) {
  const copied = items.slice();
  if (sectionKey === 'education') {
    return copied.sort(function (a, b) {
      const slotGap =
        EDUCATION_SLOTS.indexOf(normalizeEducationSlot(a.slotType || a.degree)) -
        EDUCATION_SLOTS.indexOf(normalizeEducationSlot(b.slotType || b.degree));
      if (slotGap !== 0) {
        return slotGap;
      }
      return getSortScore('education', b) - getSortScore('education', a);
    });
  }
  return copied.sort(function (a, b) {
    return getSortScore(sectionKey, b) - getSortScore(sectionKey, a);
  });
}

function getSortScore(sectionKey, item) {
  if (sectionKey === 'education') {
    const values = [item.graduationYear, item.startYear];
    const firstEducationYear = values.find(function (value) {
      return /^\d{4}$/.test(String(value || ''));
    });
    return firstEducationYear ? parseInt(firstEducationYear, 10) : 0;
  }
  if (sectionKey === 'career' && item.ongoing) {
    return 999999;
  }
  const values = [
    item.endYear,
    item.graduationYear,
    item.acquiredYear,
    item.year,
    item.startYear,
  ];
  const firstNumber = values.find(function (value) {
    return /^\d{4}$/.test(String(value || ''));
  });
  return firstNumber ? parseInt(firstNumber, 10) : 0;
}

function addClinicScheduleRow() {
  syncCurrentStepFromDom();
  state.draft.clinicInfo.schedules = ensureArray(state.draft.clinicInfo.schedules).concat([createEmptyScheduleItem()]);
  renderApp();
}

function removeClinicScheduleRow(index) {
  syncCurrentStepFromDom();
  const schedules = ensureArray(state.draft.clinicInfo.schedules).slice();
  schedules.splice(index, 1);
  state.draft.clinicInfo.schedules = schedules.length ? schedules : [createEmptyScheduleItem()];
  state.draft.lastCompletedStep = 'clinic';
  state.draft.meta = Object.assign({}, state.draft.meta || {}, { resumeStepKey: 'clinic' });
  cacheCurrentDraft('schedule-delete');
  renderApp();
  queueDraftSave({
    stepKey: 'clinic',
    resumeStepKey: state.currentStepKey === 'summary' ? 'summary' : 'clinic',
    actionSource: 'schedule_delete',
    draftSnapshot: clone(state.draft),
  });
}

function openAddressLookup() {
  if (!(window.daum && daum.Postcode)) {
    state.notice = {
      type: 'warning',
      code: 'postcode-missing',
      message: '주소 검색 스크립트를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.',
    };
    syncTransientUiToState();
    renderApp();
    return;
  }

  new daum.Postcode({
    oncomplete: function (data) {
      const roadAddress = data.roadAddress || data.jibunAddress || '';
      const postcode = data.zonecode || '';
      const postcodeInput = document.getElementById('clinicPostcode');
      const addressInput = document.getElementById('clinicAddress');
      const detailInput = document.getElementById('clinicAddressDetail');

      if (postcodeInput) {
        postcodeInput.value = postcode;
      }
      if (addressInput) {
        addressInput.value = roadAddress;
      }
      if (detailInput) {
        detailInput.focus();
      }

      state.draft.clinicInfo = readClinicForm();
      cacheCurrentDraft('address-picked');
    },
  }).open();
}

async function goNext() {
  if (state.submitBusy) {
    return;
  }

  if (state.currentStepKey === 'summary') {
    await submitCurrentDraft();
    return;
  }

  const nextStepKey = getNextStepKey(state.currentStepKey);
  if (!nextStepKey) {
    return;
  }

  navigateToStep(nextStepKey);
}

function goBack() {
  if (state.submitBusy) {
    return;
  }

  const previousStepKey = getPreviousStepKey(state.currentStepKey);
  if (!previousStepKey) {
    return;
  }

  navigateToStep(previousStepKey);
}

function goToStep(targetStepKey) {
  if (state.submitBusy || targetStepKey === state.currentStepKey) {
    return;
  }
  navigateToStep(targetStepKey);
}

function navigateToStep(targetStepKey) {
  if (state.editor.open) {
    openConfirmDialog({
      title: '작성 중인 항목이 있습니다',
      message: '작성 중인 항목은 저장 전까지 반영되지 않습니다. 저장하지 않고 이동할까요?',
      confirmLabel: '이동',
      onConfirm: function () {
        closeEditorWithoutRender();
        proceedNavigateToStep(targetStepKey);
      },
    });
    return;
  }

  proceedNavigateToStep(targetStepKey);
}

function proceedNavigateToStep(targetStepKey) {
  if (state.currentStepKey !== 'summary') {
    syncCurrentStepFromDom();
    state.draft.lastCompletedStep = state.currentStepKey;
    state.draft.meta = Object.assign({}, state.draft.meta || {}, { resumeStepKey: targetStepKey });
    const snapshot = clone(state.draft);
    cacheDraftSnapshot(snapshot, targetStepKey, 'navigate');
    state.currentStepKey = targetStepKey;
    renderApp();
    if (targetStepKey === 'summary') {
      scrollViewportTop(true);
    }
    queueDraftSave({
      stepKey: snapshot.lastCompletedStep,
      resumeStepKey: targetStepKey,
      actionSource: 'navigate',
      draftSnapshot: snapshot,
    });
    return;
  }

  state.currentStepKey = targetStepKey;
  renderApp();
  if (targetStepKey === 'summary') {
    scrollViewportTop(true);
  }
}

function scrollViewportTop(smooth) {
  if (typeof window === 'undefined' || typeof window.scrollTo !== 'function') {
    return;
  }
  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto',
  });
}

function queueDraftSave(options) {
  const snapshot = clone(options.draftSnapshot || state.draft);
  if (!snapshot.draftId) {
    state.localOnly = true;
    state.notice = {
      type: 'warning',
      code: 'save-failed',
      message: '네트워크 오류로 현재 내용이 이 기기에 임시 저장되었습니다. 연결이 복구되면 다시 저장해 주세요.',
    };
    cacheDraftSnapshot(snapshot, options.resumeStepKey || state.currentStepKey, 'local-fallback');
    renderApp();
    return Promise.resolve(false);
  }

  state.pendingSaves += 1;
  const request = {
    draftId: snapshot.draftId,
    stepKey: options.stepKey,
    resumeStepKey: options.resumeStepKey,
    actionSource: options.actionSource,
    draft: snapshot,
  };

  backgroundSaveChain = backgroundSaveChain
    .catch(function () {
      return false;
    })
    .then(function () {
      return callServer('saveDraftStep', request)
        .then(function (response) {
          applySaveResponse(response);
          return true;
        })
        .catch(function () {
          syncTransientUiToState();
          state.localOnly = true;
          state.notice = {
            type: 'warning',
            code: 'save-failed',
            message: '네트워크 오류로 현재 내용이 이 기기에 임시 저장되었습니다. 연결이 복구되면 다시 저장해 주세요.',
          };
          cacheCurrentDraft('local-fallback');
          renderApp();
          return false;
        })
        .finally(function () {
          state.pendingSaves = Math.max(0, state.pendingSaves - 1);
        });
    });

  return backgroundSaveChain;
}

function applySaveResponse(response) {
  if (!response || !response.draft) {
    return;
  }
  const shouldRefresh = !!(state.notice && state.notice.code === 'save-failed');
  state.draft.draftId = response.draft.draftId || state.draft.draftId;
  state.draft.doctorKey = response.draft.doctorKey || state.draft.doctorKey;
  state.draft.status = response.draft.status || state.draft.status;
  state.draft.updatedAt = response.draft.updatedAt || response.savedAt || state.draft.updatedAt;
  state.draft.submittedAt = response.draft.submittedAt || state.draft.submittedAt;
  state.draft.lastCompletedStep = response.draft.lastCompletedStep || state.draft.lastCompletedStep;
  state.draft.meta = Object.assign({}, state.draft.meta || {}, response.draft.meta || {}, {
    resumeStepKey: response.resumeStepKey || ((state.draft.meta || {}).resumeStepKey || state.currentStepKey),
  });
  state.localOnly = false;
  if (state.notice && state.notice.code === 'save-failed') {
    state.notice = null;
  }
  cacheCurrentDraft('server-save');
  if (shouldRefresh) {
    syncTransientUiToState();
    renderApp();
  }
}

async function submitCurrentDraft() {
  if (state.submitBusy) {
    return;
  }

  syncCurrentStepFromDom();
  cacheCurrentDraft('before-submit');
  state.submitBusy = true;
  renderApp();

  try {
    const response = await callServer('submitDraft', {
      draftId: state.draft.draftId,
      draft: state.draft,
    });

    hydrateDraft(response.draft);
    state.currentStepKey = 'summary';
    state.localOnly = false;
    state.notice = {
      type: 'success',
      code: 'submit-success',
      message: '제출이 완료되었습니다. 6월 말 AI 최적화 홈페이지가 나올 때, 한번 더 확인하세요!',
    };
    cacheCurrentDraft('submitted');
  } catch (error) {
    state.localOnly = true;
    state.notice = {
      type: 'error',
      code: 'submit-failed',
      message: '제출에 실패했습니다. 네트워크를 확인한 뒤 다시 제출해 주세요. 현재 내용은 이 기기에 임시 저장했습니다.',
    };
    cacheCurrentDraft('submit-failed');
  } finally {
    state.submitBusy = false;
    renderApp();
  }
}

function getNextStepKey(stepKey) {
  const index = FLOW_STEPS.findIndex(function (step) {
    return step.key === stepKey;
  });
  if (index === -1 || index === FLOW_STEPS.length - 1) {
    return '';
  }
  return FLOW_STEPS[index + 1].key;
}

function getPreviousStepKey(stepKey) {
  const index = FLOW_STEPS.findIndex(function (step) {
    return step.key === stepKey;
  });
  if (index <= 0) {
    return '';
  }
  return FLOW_STEPS[index - 1].key;
}

function computeCompletion(draft) {
  const parts = [
    { weight: 1.2, ratio: getIdentityRatio(draft.identity) },
    { weight: 1.0, ratio: getEducationRatio(draft.education) },
    { weight: 1.0, ratio: getRepeatableRatio('society', draft.society) },
    { weight: 1.0, ratio: getRepeatableRatio('qualification', draft.qualification) },
    { weight: 1.0, ratio: getRepeatableRatio('training', draft.training) },
    { weight: 1.0, ratio: getRepeatableRatio('career', draft.career) },
    { weight: 0.8, ratio: getRepeatableRatio('other', draft.other) },
    { weight: 1.2, ratio: getClinicRatio(draft.clinicInfo) },
  ];

  const totalWeight = parts.reduce(function (sum, part) {
    return sum + part.weight;
  }, 0);
  const weighted = parts.reduce(function (sum, part) {
    return sum + part.weight * part.ratio;
  }, 0);
  return Math.round((weighted / totalWeight) * 100);
}

function getIdentityRatio(identity) {
  const fields = [identity && identity.name, identity && identity.phone, identity && identity.licenseNumber];
  return filledRatio(fields);
}

function getEducationRatio(items) {
  const slots = EDUCATION_SLOTS.map(function (slotType) {
    return getEducationDisplayItemBySlot(slotType, items);
  });
  const ratios = slots.map(function (item) {
    if (!item) {
      return 0;
    }
    return filledRatio([item.institution, item.department, item.startYear, item.graduationYear]);
  });
  return ratios.reduce(function (sum, value) {
    return sum + value;
  }, 0) / ratios.length;
}

function getRepeatableRatio(sectionKey, items) {
  const list = ensureArray(items);
  if (!list.length) {
    return 0;
  }

  const ratios = list.map(function (item) {
    if (sectionKey === 'society') {
      return filledRatio([item.societyName, item.title || item.startYear || item.endYear]);
    }
    if (sectionKey === 'qualification') {
      return filledRatio([
        item.credentialType,
        item.credentialNumber,
        item.licenseAcquiredYear || 'ok',
        item.isSpecialist,
        item.isSpecialist === '예' ? getQualificationSpecialty(item) : 'ok',
        item.isSpecialist === '예' ? item.specialistNumber : 'ok',
        item.isSpecialist === '예' ? item.specialistAcquiredYear : 'ok',
        item.isSpecialist === '예' ? item.issuingOrganization : 'ok',
      ]);
    }
    if (sectionKey === 'training') {
      return filledRatio([item.institution, item.trainingType, item.status, item.startYear || item.endYear]);
    }
    if (sectionKey === 'career') {
      return filledRatio([item.institution, item.position, item.department || item.startYear, item.ongoing ? '현재' : item.endYear]);
    }
    return filledRatio([item.subtype, item.content, item.year || item.notes]);
  });

  return Math.min(1, ratios.reduce(function (sum, ratio) {
    return sum + ratio;
  }, 0) / ratios.length);
}

function getClinicRatio(clinicInfo) {
  const info = normalizeClinicInfoClient(clinicInfo || {});
  return filledRatio([
    info.clinicName,
    info.address,
    info.phone,
    hasMeaningfulScheduleRows(info.schedules) ? 'schedules' : '',
    info.parking,
    info.closedDays,
  ]);
}

function hasMeaningfulScheduleRows(schedules) {
  return ensureArray(schedules).some(function (item) {
    return !!(item.days || item.openTime || item.closeTime || item.note);
  });
}

function filledRatio(values) {
  const total = values.length;
  const filled = values.filter(function (value) {
    return !!value;
  }).length;
  return total ? filled / total : 0;
}

function isClinicInfoComplete(clinicInfo) {
  const info = normalizeClinicInfoClient(clinicInfo || {});
  return !!(info.clinicName && info.address && info.phone);
}

function formatPeriod(startYear, endYear, treatOpenAsCurrent) {
  if (!startYear && !endYear) {
    return '';
  }
  if (startYear && endYear) {
    return `${startYear} - ${endYear}`;
  }
  if (startYear) {
    return treatOpenAsCurrent ? `${startYear} - 현재` : `${startYear} -`;
  }
  return `- ${endYear}`;
}

function buildOpeningHoursSummary(schedules) {
  return ensureArray(schedules).map(function (item) {
    if (item.openTime && item.closeTime) {
      return `${item.days} ${item.openTime}-${item.closeTime}`;
    }
    if (item.note) {
      return `${item.days} ${item.note}`;
    }
    return item.days;
  }).filter(Boolean).join(', ');
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeStringArray(value) {
  if (Array.isArray(value)) {
    return value.map(function (item) {
      return String(item || '').trim();
    }).filter(Boolean);
  }
  if (typeof value === 'string') {
    return value.split(',').map(function (item) {
      return item.trim();
    }).filter(Boolean);
  }
  return [];
}

function normalizePhone(value) {
  return String(value || '').replace(/\D/g, '');
}

function formatPhoneDisplay(digits) {
  const clean = normalizePhone(digits);
  if (!clean) {
    return '';
  }
  if (clean.length === 11) {
    return clean.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }
  if (clean.length === 10 && clean.indexOf('02') === 0) {
    return clean.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
  }
  if (clean.length === 10) {
    return clean.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }
  if (clean.length === 9 && clean.indexOf('02') === 0) {
    return clean.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
  }
  return clean;
}

function normalizeEducationSlot(value) {
  const clean = String(value || '').trim();
  if (clean === '학사' || clean === '석사' || clean === '박사') {
    return clean;
  }
  if (clean.indexOf('박') > -1) {
    return '박사';
  }
  if (clean.indexOf('석') > -1) {
    return '석사';
  }
  return '학사';
}

function inferCredentialType(item) {
  const explicit = String(item.credentialType || '').trim();
  if (explicit) {
    return normalizeCredentialType(explicit);
  }
  const title = String(item.title || '').trim();
  if (title.indexOf('치과') > -1 && title.indexOf('면허') > -1) {
    return '치과의사면허';
  }
  if (title.indexOf('분과') > -1) {
    return '분과전문의';
  }
  if (title.indexOf('면허') > -1) {
    return '의사면허';
  }
  if (title.indexOf('전문의') > -1) {
    return '전문의';
  }
  return '기타 자격';
}

function normalizeCredentialType(value) {
  const clean = String(value || '').trim();
  if (!clean) {
    return '';
  }
  if (QUALIFICATION_TYPES.indexOf(clean) > -1) {
    return clean;
  }
  if (clean.indexOf('치과') > -1 && clean.indexOf('면허') > -1) {
    return '치과의사면허';
  }
  if (clean.indexOf('분과') > -1) {
    return '분과전문의';
  }
  if (clean.indexOf('면허') > -1) {
    return '의사면허';
  }
  if (clean.indexOf('전문의') > -1) {
    return '전문의';
  }
  return '기타 자격';
}

function inferCredentialName(item, credentialType) {
  const explicit = String(item.credentialName || item.detailTitle || item.subspecialty || '').trim();
  if (explicit) {
    return explicit;
  }
  const title = String(item.title || '').trim();
  if (!title) {
    return '';
  }
  if (QUALIFICATION_TYPES.indexOf(normalizeCredentialType(title)) > -1) {
    return '';
  }
  return title;
}

function isForcedSpecialistType(credentialType) {
  return credentialType === '전문의' || credentialType === '분과전문의';
}

function isLicenseCredentialType(credentialType) {
  return credentialType === '의사면허' || credentialType === '치과의사면허';
}

function getCredentialNameLabel(credentialType) {
  return credentialType === '분과전문의' ? '세부 자격명' : '자격명';
}

function getCredentialNamePlaceholder(credentialType) {
  return credentialType === '분과전문의' ? '예: 척추, 소화기, 대장항문' : '예: 분과전문의, 인증의, 세부 자격';
}

function getCredentialNumberLabel(credentialType) {
  return credentialType === '치과의사면허' ? '치과의사면허번호' : '의사면허번호';
}

function getSpecialistNumberLabel(credentialType) {
  return '전문의번호';
}

function getAcquiredYearLabel(credentialType) {
  if (credentialType === '의사면허') {
    return '의사면허 취득년도';
  }
  if (credentialType === '치과의사면허') {
    return '치과의사면허 취득년도';
  }
  return '취득년도';
}

function requiresSpecialistNumber(credentialType, isSpecialist) {
  return credentialType === '전문의' || credentialType === '분과전문의' || isSpecialist === '예';
}

function usesCredentialNameField(credentialType) {
  return credentialType === '분과전문의' || credentialType === '기타 자격';
}

function normalizeLicenseCredentialType(value, item) {
  const clean = normalizeCredentialType(value);
  if (clean === '치과의사면허') {
    return '치과의사면허';
  }
  if (clean === '의사면허') {
    return '의사면허';
  }
  const specialty = String((item && item.specialty) || '').trim();
  const specialtyOther = String((item && item.specialtyOther) || '').trim();
  const title = String((item && item.title) || '').trim();
  if (specialty.indexOf('치과') > -1 || specialtyOther.indexOf('치과') > -1 || title.indexOf('치과') > -1) {
    return '치과의사면허';
  }
  return '의사면허';
}

function getSpecialtySelectValue(item) {
  const specialty = String((item && item.specialty) || '').trim();
  const specialtyOther = String((item && item.specialtyOther) || '').trim();
  if (SPECIALTY_OPTIONS.indexOf(specialty) > -1) {
    return specialty;
  }
  if (specialtyOther || specialty) {
    return SPECIALTY_OTHER_VALUE;
  }
  return '';
}

function getQualificationSpecialty(item) {
  return String((item && item.specialty) || (item && item.specialtyOther) || '').trim();
}

function openConfirmDialog(config) {
  state.confirmDialog = {
    open: true,
    title: config.title || '확인',
    message: config.message || '',
    confirmLabel: config.confirmLabel || '확인',
    tone: config.tone || 'default',
    onConfirm: typeof config.onConfirm === 'function' ? config.onConfirm : null,
  };
  renderApp();
}

function closeConfirmDialog() {
  state.confirmDialog = {
    open: false,
    title: '',
    message: '',
    confirmLabel: '확인',
    tone: 'default',
    onConfirm: null,
  };
  renderApp();
}

function closeConfirmDialogWithoutRender() {
  state.confirmDialog = {
    open: false,
    title: '',
    message: '',
    confirmLabel: '확인',
    tone: 'default',
    onConfirm: null,
  };
}

function confirmDialogProceed() {
  const onConfirm = state.confirmDialog.onConfirm;
  closeConfirmDialogWithoutRender();
  if (typeof onConfirm === 'function') {
    onConfirm();
    return;
  }
  renderApp();
}

function normalizeTrainingType(value) {
  const clean = String(value || '').trim();
  if (TRAINING_TYPES.indexOf(clean) > -1) {
    return clean;
  }
  if (clean.indexOf('인턴') > -1) {
    return '인턴';
  }
  if (clean.indexOf('전임') > -1 || clean.toLowerCase().indexOf('fellow') > -1) {
    return '전임의';
  }
  if (clean.indexOf('레지던트') > -1 || clean.indexOf('전공의') > -1 || clean.toLowerCase().indexOf('resident') > -1) {
    return '전공의';
  }
  return clean || '인턴';
}

function normalizeYesNoValue(value) {
  const clean = String(value || '').trim().toLowerCase();
  if (clean === '예' || clean === 'yes' || clean === 'y' || clean === 'true') {
    return '예';
  }
  return '아니오';
}

function normalizeYearValue(value) {
  const clean = String(value || '').trim();
  return /^\d{4}$/.test(clean) ? clean : '';
}

function loadLastIdentity() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LAST_IDENTITY);
    if (!raw) {
      return createEmptyIdentity();
    }
    const parsed = JSON.parse(raw);
    return {
      name: parsed.name || '',
      phone: parsed.phone || '',
      licenseNumber: parsed.licenseNumber || '',
    };
  } catch (error) {
    return createEmptyIdentity();
  }
}

function saveLastIdentity(identity) {
  localStorage.setItem(STORAGE_KEYS.LAST_IDENTITY, JSON.stringify(identity));
}

function getCacheKey(identity) {
  const normalized = [
    String(identity.name || '').replace(/\s+/g, '').toLowerCase(),
    normalizePhone(identity.phone),
    String(identity.licenseNumber || '').replace(/[^0-9a-zA-Z]/g, '').toUpperCase(),
  ].join('|');
  return STORAGE_KEYS.CACHE_PREFIX + normalized;
}

function cacheCurrentDraft(reason) {
  cacheDraftSnapshot(state.draft, state.currentStepKey, reason);
}

function cacheDraftSnapshot(draft, currentStepKey, reason) {
  if (!draft.identity || !draft.identity.name) {
    return;
  }

  const payload = {
    updatedAt: new Date().toISOString(),
    currentStepKey: currentStepKey,
    reason: reason,
    draft: draft,
  };
  localStorage.setItem(getCacheKey(draft.identity), JSON.stringify(payload));
}

function readCachedDraft(identity) {
  try {
    const raw = localStorage.getItem(getCacheKey(identity));
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
}

function handleBeforeUnload() {
  if (!state.draft.draftId) {
    return;
  }
  syncTransientUiToState();
  cacheCurrentDraft('beforeunload');
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function formatDateTime(isoString) {
  if (!isoString) {
    return '기록 없음';
  }

  try {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  } catch (error) {
    return isoString;
  }
}

function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttr(value) {
  return escapeHtml(value);
}

window.handlePhoneInput = handlePhoneInput;
window.startIntakeFromLanding = startIntakeFromLanding;
window.handleIdentitySubmit = handleIdentitySubmit;
window.goNext = goNext;
window.goBack = goBack;
window.goToStep = goToStep;
window.openEditor = openEditor;
window.closeEditor = closeEditor;
window.saveEditorItem = saveEditorItem;
window.deleteItem = deleteItem;
window.handleModalBackdrop = handleModalBackdrop;
window.openEducationSlot = openEducationSlot;
window.handleEditorFieldChange = handleEditorFieldChange;
window.stopOverlayEvent = stopOverlayEvent;
window.addClinicScheduleRow = addClinicScheduleRow;
window.removeClinicScheduleRow = removeClinicScheduleRow;
window.openAddressLookup = openAddressLookup;
window.__E2E__ = {
  snapshot: function () {
    return {
      currentStepKey: state.currentStepKey,
      notice: clone(state.notice),
      draft: clone(state.draft),
    };
  },
  applyPersonaDraft: async function (payload, options) {
    const stepOrder = ['education', 'society', 'qualification', 'training', 'career', 'other', 'clinic'];
    const stopAfter = options && options.stopAfter ? options.stopAfter : '';
    for (const stepKey of stepOrder) {
      if (stepKey === 'clinic') {
        state.draft.clinicInfo = normalizeClinicInfoClient(payload.clinicInfo || {});
      } else {
        const list = ensureArray(payload[stepKey]);
        const normalized = list.map(function (item) {
          if (stepKey === 'education') return normalizeEducationItem(item);
          if (stepKey === 'society') return normalizeSocietyItem(item);
          if (stepKey === 'qualification') return normalizeQualificationItem(item);
          if (stepKey === 'training') return normalizeTrainingItem(item);
          if (stepKey === 'career') return normalizeCareerItem(item);
          return normalizeOtherItem(item);
        });
        state.draft[stepKey] = sortSectionItems(stepKey, normalized);
      }

      state.currentStepKey = stepKey;
      state.draft.lastCompletedStep = stepKey;
      state.draft.meta = Object.assign({}, state.draft.meta || {}, {
        resumeStepKey: getNextStepKey(stepKey) || 'summary',
      });
      cacheCurrentDraft(`e2e-${stepKey}`);
      renderApp();
      await queueDraftSave({
        stepKey: stepKey,
        resumeStepKey: getNextStepKey(stepKey) || 'summary',
        actionSource: 'e2e_matrix',
        draftSnapshot: clone(state.draft),
      });
      if (stopAfter && stopAfter === stepKey) {
        break;
      }
    }
    return window.__E2E__.snapshot();
  },
  submit: async function () {
    state.currentStepKey = 'summary';
    renderApp();
    await submitCurrentDraft();
    return window.__E2E__.snapshot();
  },
};
