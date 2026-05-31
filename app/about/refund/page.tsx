import type { Metadata } from "next"

import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "환불·정기결제 정책 | DOXTALK",
  description:
    "DOXTALK 의사 프로필·홈페이지 정기 결제 서비스의 정기결제 이용 조건, 해지 및 환불 정책을 안내합니다.",
}

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-foreground">환불·정기결제 정책</h1>

      <article className="mt-6 space-y-6 text-sm leading-relaxed text-foreground">
        <p>
          닥스밋(이하 &quot;회사&quot;)이 운영하는 DOXTALK(닥스밋 의사 프로필)은 의사 프로필, 학력,
          수련, 자격, 경력, 병원 정보 등을 입력하고 구조화된 CV 및 의료진 홈페이지 형태로 정리할 수
          있는 온라인 디지털 서비스입니다. 본 환불·정기결제 정책(이하 &quot;본 정책&quot;)은
          DOXTALK에서 제공하는{" "}
          <strong>의사 프로필·홈페이지 정기 결제 유료 서비스</strong>에 한하여 정기결제 이용 조건,
          결제 취소, 청약철회, 해지 및 환불 기준을 안내합니다. 결제 화면의 &quot;환불·정기결제
          정책&quot; 동의는 본 정책에 대한 동의를 의미합니다. 인테리어 업체 안내, 무료 상담
          신청 등 별도 무료 메뉴는 본 정책 적용 대상이 아닙니다. 본 정책에 명시되지 않은 사항은
          관련 법령 및 DOXMEET 이용약관에 따르며, 이용자에게 불리한 변경은 사전 고지 후
          적용합니다.
        </p>

        <section>
          <h2 className="text-lg font-semibold text-foreground">1. 서비스 제공 방식</h2>
          <p className="mt-2">
            유료 서비스는 결제 화면에 안내된 금액(월 10,000원(부가세 포함))으로 등록된 카드에서
            매월 자동 결제되는 정기 결제(구독) 방식이며, 현재 결제 수단은 신용·체크카드(카드
            정기결제)만 지원합니다.
          </p>
          <p className="mt-2">
            이용 절차는 대략 다음과 같습니다. CV 입력·확인 → 정기 결제(카드 등록 및 첫 결제) →
            결제 성공 시 CV 제출 및 의료진 홈페이지 제공. 이미 제출한 내용을 수정·재제출하는
            경우에는 별도 결제 없이 제출할 수 있습니다.
          </p>
          <p className="mt-2">
            각 회차의 이용 기간은 해당 회차 결제가 완료된 시점부터 다음 회차 정기 결제가
            시도되기 전까지입니다. 이용자는 이름·휴대폰 번호·면허번호 등으로 서비스를
            이용하며, 별도 로그인 회원 계정 없이 결제·제출·홈페이지 이용이 가능합니다.
          </p>
          <p className="mt-2">
            별도 해지하지 않는 한 정기 결제는 매월 자동으로 갱신·청구되며, 해지 방법은
            아래 &quot;정기 결제 해지&quot; 항목을 참고해 주세요.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">2. 정기 결제 금액·주기·결제 수단</h2>
          <p className="mt-2">
            정기 결제 금액은 월 10,000원(부가세 포함)이며, 결제 주기는 월 단위입니다.
            카드 명세서 등에는 &quot;닥스밋 의사 프로필 정기 결제&quot; 등으로 표시될 수
            있습니다. 회사는 관련 법령을 준수하는 범위에서 요금을 변경할 수 있으며, 변경
            절차는 아래 &quot;정기 결제 요금 및 정책 변경&quot; 항목을 참고해 주세요.
          </p>
          <p className="mt-2">
            결제 수단은 신용·체크카드(카드 정기결제)만 지원하며, 결제대행사는
            토스페이먼츠(주)입니다. 카드 등록·자동 결제 처리를 위해 결제대행사가 제공하는
            빌링키(정기 결제용 결제 수단 식별 정보)가 발급·저장될 수 있으며, 카드번호 등
            민감한 결제 정보는 회사가 직접 저장하지 않고 결제대행사·카드사 시스템에서
            처리됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">3. 카드 등록 및 자동 결제 동의</h2>
          <p className="mt-2">
            이용자는 결제 화면에서 본 정책 및 개인정보 수집·이용(DOXMEET
            개인정보처리방침)에 동의한 뒤 카드 등록(빌링 인증)을 진행합니다. 카드 등록 시
            등록한 카드로 매월 정기 결제 금액이 자동 청구·결제되는 것에 동의한 것으로
            간주합니다.
          </p>
          <p className="mt-2">
            결제 완료와 동시에 CV 제출·의료진 홈페이지 제공 등 디지털 콘텐츠 이용이
            시작되는 것에 동의한 것으로 보며, 이는 청약철회 제한 사유 안내와 연결됩니다.
          </p>
          <p className="mt-2">
            첫 결제는 카드 등록·인증이 완료된 시점에 함께 이루어질 수 있습니다. 이후 회차는
            최초 결제일(또는 결제대행사·회사가 안내하는 기준일)을 기준으로 매월 동일한
            주기로 자동 결제됩니다. 결제 시점·영수증 등 세부 사항은 카드사·결제대행사
            정책에 따릅니다.
          </p>
          <p className="mt-2">
            이용자는 정기 결제 등록 전 결제 금액, 결제 주기, 해지 방법, 환불 기준 등 본
            정책의 내용을 확인해야 하며, 동의하지 않을 경우 카드 등록 및 정기 결제를
            진행하지 않아야 합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">4. 유료 서비스 이용 기준</h2>
          <p className="mt-2">
            결제 전 CV 입력·임시 저장·미리보기 등은 무료로 이용할 수 있습니다. 본 정책에서
            &quot;유료 서비스 이용&quot;이란 해당 회차의 결제가 성공한 이후 아래에 해당하는
            행위를 말합니다.
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>CV 최종 제출(최초 제출 또는 수정 후 재제출)이 완료된 경우</li>
            <li>제출 정보가 반영된 의료진 홈페이지가 생성·제공된 경우</li>
            <li>홈페이지 URL 공유·복사 등 유료로 제공되는 기능을 사용한 경우</li>
            <li>그 밖에 결제 화면 또는 이용 안내에서 유료로 명시된 기능을 사용한 경우</li>
          </ul>
          <p className="mt-2">
            결제 성공 후 자동 제출 등 회사 시스템에 의해 제출·홈페이지 제공이 진행된 경우에도
            해당 회차의 유료 서비스 이용이 시작된 것으로 봅니다. 결제는 되었으나 제출·홈페이지
            제공이 기술적 오류 등으로 이루어지지 않은 경우에는 고객센터로 문의해 주시면
            환불·재제공 여부를 확인하여 안내드립니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">5. 정기 결제 해지</h2>
          <p className="mt-2">
            이용자는 언제든지 고객센터로 정기 결제 해지를 신청할 수 있습니다. 해지 접수가
            확인되면 다음 회차부터 자동 결제가 중단되도록 조치합니다. 이미 결제·승인된 해당
            회차는 유료 서비스 이용이 가능하며, 해지만으로 이미 결제된 회차의 전액 환불이
            보장되지는 않습니다.
          </p>
          <p className="mt-2">
            다음 회차 결제를 막기 위해서는 해당 회차 결제 예정일 전에 해지 신청이 접수·
            확인되어야 합니다. 결제 예정일 직전·당일 접수 등으로 차회 결제가 이미 진행된
            경우, 해당 회차는 정상 이용·환불 기준에 따릅니다.
          </p>
          <p className="mt-2">
            해지 후에도 이미 제공된 해당 회차의 홈페이지·제출 정보 등은 회사 정책·관련
            법령에 따라 일정 기간 유지되거나 삭제될 수 있으며, 재이용 시 정기 결제 등록 및
            결제 절차를 다시 진행해야 할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">6. 결제 실패·재시도·결제 수단 변경</h2>
          <p className="mt-2">
            카드 한도 초과, 유효기간 만료, 분실·정지 등으로 정기 결제가 실패할 수 있습니다.
            결제 실패 시 결제대행사·회사 정책에 따라 재시도·안내가 이루어질 수 있으며, 재시도
            후에도 결제가 완료되지 않으면 해당 회차 유료 서비스 제공이 제한·중단될 수
            있습니다.
          </p>
          <p className="mt-2">
            결제 수단(카드) 변경·재등록은 고객센터(이메일·전화) 문의로 접수합니다. 새 카드
            등록 시 기존 빌링키는 해지·대체될 수 있으며, 변경 완료 전까지 차회 결제가
            실패할 수 있습니다.
          </p>
          <p className="mt-2">
            중복 결제·중복 카드 등록 등으로 동일 회차에 이중 과금이 확인되면 중복분 환불
            또는 정기 결제 정리를 안내합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">7. 청약철회(7일) 및 디지털 콘텐츠</h2>
          <p className="mt-2">
            이용자는 「전자상거래 등에서의 소비자보호에 관한 법률」 등 관련 법령이 정한 바에 따라
            해당 결제일로부터 7일 이내 청약철회(결제 취소·환불)를 요청할 수 있습니다.
          </p>
          <p className="mt-2">
            다만, 결제 시 본 정책(정기 결제·서비스 제공)에 동의하고 결제 직후 CV 제출·홈페이지
            제공 등 디지털 콘텐츠 제공이 개시되는 서비스 특성상, 유료 서비스 이용이 시작된
            이후에는 관련 법령이 허용하는 범위에서 청약철회가 제한될 수 있습니다. 이용자는
            결제 화면의 환불·정기결제 정책 동의를 통해 위 내용을 확인할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">8. 결제 취소·환불·해지 신청</h2>
          <p className="mt-2">
            결제 취소, 환불, 정기 결제 해지는 고객센터(이메일·전화)로 접수합니다. 회원 계정이
            없으므로 신원 확인을 위해 아래 정보를 함께 알려 주시기 바랍니다.
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>성명, 휴대폰 번호, 면허번호(또는 제출 시 사용한 정보)</li>
            <li>결제일, 결제 금액, 결제 수단(카드 뒷자리 4자리 등 확인 가능한 범위)</li>
            <li>환불·해지 사유 및 요청 내용(전액/부분, 해당 회차 명시)</li>
          </ul>
          <ul className="mt-4 list-disc space-y-1 pl-5">
            <li>고객센터 이메일: leesy@doxmeet.com</li>
            <li>고객센터 전화번호: 070-7834-8371</li>
            <li>운영시간: 평일 09:00 ~ 18:00 (주말·공휴일 제외)</li>
          </ul>
          <p className="mt-2">
            회사는 접수 후 영업일 기준 3~7일 이내(사안에 따라 연장될 수 있음) 환불·해지 가능
            여부를 검토하여 이메일·전화 등으로 결과를 안내합니다. 환불이 불가한 경우 그 사유를
            함께 통지합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">9. 전액 환불이 가능한 경우</h2>
          <p className="mt-2">다음의 경우 해당 결제 건에 대해 전액 환불이 가능합니다.</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            <li>
              해당 결제일로부터 7일 이내이며, 유료 서비스 이용이 전혀 없었던
              경우(결제만 되고 제출·홈페이지 제공이 확인되지 않은 경우 등)
            </li>
            <li>중복 결제·중복 카드 등록 등으로 동일 회차에 이중 과금이 확인된 경우</li>
            <li>시스템 오류·오결제 등 회사 또는 결제대행사 확인 결과 과금 오류가 인정된 경우</li>
            <li>회사의 귀책사유로 해당 회차의 서비스 제공이 불가능한 경우</li>
            <li>결제 화면·안내와 실제 제공된 서비스가 명백히 다른 경우</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">10. 환불이 제한되는 경우</h2>
          <p className="mt-2">다음의 경우 환불이 제한되거나 어려울 수 있습니다.</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            <li>해당 회차의 유료 서비스 이용이 시작된 경우</li>
            <li>해당 결제일로부터 7일이 경과한 뒤 단순 변심만으로 환불을 요청한 경우</li>
            <li>이용자의 귀책사유(허위 정보 제공, 약관 위반 등)로 이용이 제한된 경우</li>
            <li>이벤트·프로모션·할인 등 별도 환불 조건이 사전에 고지된 경우</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">11. 부분 환불 기준</h2>
          <p className="mt-2">
            월 단위 정기 결제의 해당 회차에서 유료 이용이 시작된 이후에는 원칙적으로 전액
            환불이 제한됩니다. 다만 회사 귀책의 장애·미제공, 결제 후 제출·홈페이지 제공 실패
            등 사유가 확인되면 이용 일수·장애 시간·미제공 범위를 고려하여 부분 환불 또는
            해당 회차 이용 연장을 제공할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">12. 환불 처리 방법 및 기간</h2>
          <p className="mt-2">
            환불은 원칙적으로 결제 수단과 동일한 방법(카드 승인 취소·환불)으로 처리합니다.
            결제대행사는 토스페이먼츠(주)를 사용하며, 카드사·결제대행사 정책에 따라 실제 환불
            반영까지 수일이 소요될 수 있습니다.
          </p>
          <p className="mt-2">
            카드 승인 취소가 불가능한 특별한 사유가 있는 경우에 한하여 환불 계좌 정보를
            요청할 수 있습니다. 환불 승인 후 회사는 결제대행사 절차를 지체 없이 진행하며,
            원칙적으로 승인일로부터 3영업일 이내 처리를 목표로 합니다(카드사·결제대행사
            사정에 따라 달라질 수 있음). 완료 여부는 이용자가 카드사·결제 내역으로 확인할
            수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">13. 서비스 장애에 따른 환불</h2>
          <p className="mt-2">
            회사 귀책으로 해당 회차의 유료 서비스를 정상 이용하지 못한 경우, 장애 내용·기간·
            이용 내역을 확인한 후 환불, 해당 회차 이용 연장 또는 이에 준하는 조치를 제공할 수
            있습니다.
          </p>
          <p className="mt-2">다음은 장애 환불 대상에서 제외될 수 있습니다.</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            <li>이용자의 네트워크, 기기, 브라우저, 팝업 차단 등 환경 문제</li>
            <li>사전 고지된 정기·긴급 점검</li>
            <li>천재지변, 통신·외부 호스팅·결제망 장애 등 회사가 합리적으로 통제하기 어려운 사유</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">14. 표시·광고와 다른 제공</h2>
          <p className="mt-2">
            표시·광고·결제 화면 안내와 실제 제공이 명백히 다른 경우 이용자는 관련 법령에 따라
            환불 등을 요청할 수 있으며, 회사는 사실 확인 후 법령에 따라 처리합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">15. 정기 결제 요금 및 정책 변경</h2>
          <p className="mt-2">
            회사는 관련 법령을 위반하지 않는 범위에서 정기 결제 요금 및 본 정책을 변경할 수
            있습니다. 요금 인상 등 이용자에게 불리한 변경은 시행일 7일 전까지 서비스 화면,
            결제 화면, 본 페이지, 고객센터 등을 통해 사전에 안내합니다. 변경 시행일 이후
            결제·이용분부터 변경된 요금·정책이 적용되며, 변경에 동의하지 않는 이용자는
            변경 시행 전 정기 결제를 해지할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">16. 문의처</h2>
          <p className="mt-2">
            정기 결제, 환불, 결제 취소, 해지 문의는 아래로 접수해 주세요.
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>상호명: 닥스밋 (DOXMEET)</li>
            <li>서비스명: DOXTALK (닥스밋 의사 프로필)</li>
            <li>대표자: 홍진우</li>
            <li>사업자등록번호: 385-88-02455</li>
            <li>주소: 인천광역시 연수구 컨벤시아대로80, 401동 1004호(송도동, 인천송도힐스테이트)</li>
            <li>이메일: leesy@doxmeet.com</li>
            <li>전화번호: 070-7834-8371</li>
          </ul>
        </section>

        <p className="text-muted-foreground">본 환불·정기결제 정책은 시행일로부터 적용됩니다.</p>
        <p className="text-muted-foreground">시행일: 2026년 5월 30일</p>
        <p className="text-muted-foreground">최종 개정일: 2026년 5월 31일</p>
      </article>
      </main>
      <SiteFooter />
    </div>
  )
}
