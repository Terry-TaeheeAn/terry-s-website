/* app.jsx — DesignCanvas composition (v2 unified) */

const App = () => (
  <DesignCanvas>
    <DCSection id="brand" title="설렘 · Brand Identity" subtitle="이름 결정 · 로고 · 컬러 · 톤 · AI 디자인 언어">
      <DCArtboard id="b-name"    label="01 · Name"      width={1180} height={420}><BrandNames/></DCArtboard>
      <DCArtboard id="b-logo"    label="02 · Logo"      width={1180} height={520}><BrandLogo/></DCArtboard>
      <DCArtboard id="b-palette" label="03 · Palette"   width={1180} height={620}><BrandPalette/></DCArtboard>
      <DCArtboard id="b-voice"   label="04 · Voice"     width={1180} height={560}><BrandVoice/></DCArtboard>
      <DCArtboard id="b-ai"      label="05 · AI Design Language" width={1180} height={900}><V2_Brand/></DCArtboard>
    </DCSection>

    <DCSection id="flow-1" title="Flow 1 · 첫 30초 (온보딩)" subtitle="홈 → AI 분석 → 외모 점수 · 한 호흡에 결과를 본다">
      <DCArtboard id="s-home" label="01 · Home (live AI)"    width={390} height={844}><V2_Home/></DCArtboard>
      <DCArtboard id="s-ana"  label="02 · Analyzing (live)"  width={390} height={844}><V2_Analyzing/></DCArtboard>
      <DCArtboard id="s-score" label="03 · Look Score + wire" width={390} height={844}><V2_Score/></DCArtboard>
      <DCPostIt x={1280} y={140}>
        ▶ 실제 모션 프로토타입은
        "onboarding.html" 에서 재생됩니다.
        디자인 캔버스 좌상단 다른 탭에서 열어보세요.
      </DCPostIt>
    </DCSection>

    <DCSection id="flow-2" title="Flow 2 · 스펙 입력 → 종합" subtitle="매력 점수 부스트 · 등록 CTA">
      <DCArtboard id="s-spec" label="04 · Spec Input · 2/5"  width={390} height={844}><V2_Spec/></DCArtboard>
      <DCArtboard id="s-total" label="05 · Total Grade"      width={390} height={844}><V2_Total/></DCArtboard>
    </DCSection>

    <DCSection id="flow-3" title="Flow 3 · 매칭" subtitle="좌우 드래그 가능 · WHY 버튼 → AI 추론 시트">
      <DCArtboard id="s-swipe" label="06 · Swipe (drag · tap WHY)" width={390} height={844}><V2_Swipe/></DCArtboard>
      <DCArtboard id="s-why"   label="07 · Why this match"   width={390} height={844}><V2_WhyMatch/></DCArtboard>
      <DCArtboard id="s-match" label="08 · Matched"          width={390} height={844}><V2_Match/></DCArtboard>
    </DCSection>

    <DCSection id="flow-4" title="Flow 4 · 매칭 이후" subtitle="목록 · 채팅 · 내 프로필">
      <DCArtboard id="s-list"  label="09 · Match List"   width={390} height={844}><V2_MatchList/></DCArtboard>
      <DCArtboard id="s-chat"  label="10 · Chat + AI suggest" width={390} height={844}><V2_Chat/></DCArtboard>
      <DCArtboard id="s-prof"  label="11 · My Profile"   width={390} height={844}><V2_Profile/></DCArtboard>
    </DCSection>

    <DCSection id="sys" title="Component System" subtitle="버튼 · 입력 · 카드 · 점수 · 진행 · 토스트 · 모달">
      <DCArtboard id="c-btn"  label="Buttons"   width={1180} height={520}><ButtonSpecs/></DCArtboard>
      <DCArtboard id="c-in"   label="Inputs"    width={1180} height={520}><InputSpecs/></DCArtboard>
      <DCArtboard id="c-surf" label="Surfaces"  width={1180} height={760}><SurfaceSpecs/></DCArtboard>
    </DCSection>

    <DCSection id="motion" title="Motion & Icons" subtitle="모션 사양 · 24px 커스텀 아이콘 세트">
      <DCArtboard id="m"  label="Motion" width={1180} height={620}><MotionSpecs/></DCArtboard>
      <DCArtboard id="ic" label="Icons"  width={1180} height={560}><IconSet/></DCArtboard>
    </DCSection>

    <DCPostIt x={40} y={40}>
      설렘 · AI Match Design System
      11 screens · 5 AI devices · 1 onboarding prototype
      매칭 카드는 좌우로 드래그 / WHY 탭 →
    </DCPostIt>
    <DCPostIt x={40} y={220}>
      ▶ Onboarding prototype:
      파일트리에서 onboarding.html 열기
      (Stage 컨트롤로 30초 플로우 재생)
    </DCPostIt>
  </DesignCanvas>
);

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
