# Handoff: 설렘 (Seollem) · AI 매칭 소개팅 앱

## Overview
"설렘"은 AI가 사용자의 외모와 스펙을 분석해 매력 점수를 산출하고, 호환도 기반으로 매칭해주는 모바일 우선 프리미엄 소개팅 웹앱입니다.

다른 소개팅 앱과의 **핵심 차별점은 AI 분석을 시각 언어로 전면에 노출**하는 것입니다 — 얼굴 랜드마크 와이어프레임, AI 추론 노트, 호환도 레이더, 라이브 상태 칩, 토큰 스트림 — 이 5가지 장치가 모든 화면에 일관되게 등장합니다.

타겟은 20–30대 한국 싱글, 모바일 우선.

## About the Design Files
이 번들의 HTML 파일들은 **디자인 레퍼런스**입니다 — 의도된 외형과 동작을 보여주는 프로토타입이지, 그대로 복사해 프로덕션에 넣을 코드가 아닙니다.

**개발자의 임무는 이 디자인을 타겟 코드베이스의 환경(React / Vue / Next.js / Swift / Flutter 등)에서 그곳의 기존 패턴과 라이브러리로 재구현하는 것**입니다. 코드베이스가 아직 없다면, 모바일 우선 웹앱이므로 **Next.js (App Router) + Tailwind CSS + Framer Motion** 조합을 권장합니다.

## Fidelity
**High-fidelity (hifi).** 컬러, 타이포그래피, 간격, 인터랙션이 최종 사양 수준으로 정의되어 있습니다. 개발자는 이 문서의 토큰 값을 그대로 코드베이스에 옮기고, UI를 픽셀 수준으로 재현하면 됩니다.

---

## 브랜드

### 이름
- **설렘 (Seollem)** — 첫 만남의 떨림. 한국어 고유 정서.
- 영문 마크: `SEOLLEM`
- 글로벌 보조 카피용: `Seollem`

### 로고
두 개의 원이 겹쳐 만드는 베지카(vesica) 형태가 "만남의 교집합"을, 가운데 작은 스파크가 "AI가 발견한 매력 포인트"를 의미합니다.

v2(최종) 단계에서는 **PulseMark** — 단일 S-curve + dot — 으로 미니멀화되었습니다. SVG 100×100 viewBox:

```svg
<svg viewBox="0 0 100 100" fill="none">
  <path d="M22 64 Q28 38 50 38 Q72 38 72 56 Q72 70 56 70 Q44 70 38 80"
        stroke="currentColor" stroke-width="7" stroke-linecap="round" fill="none"/>
  <circle cx="78" cy="30" r="6" fill="var(--coral)"/>
</svg>
```

### 톤앤매너 키워드
1. **설레는** (Fluttering) — 심장이 살짝 빨라지는 톤. 과장 X.
2. **세련된** (Refined) — 존댓말 기반, 줄임말/이모지 최소화.
3. **명료한** (Clear) — 점수·등급·매칭률은 한 줄로. 추측 없음.
4. **따뜻한** (Warm) — 판단하지 않는다. 결과를 알릴 때도 한 줄의 환대.
5. **자신감 있는** (Confident) — 잘 보이려 애쓰지 않는다. 사실을 차분히.

### Voice DO / DON'T
| ✓ DO | ✗ DON'T |
|---|---|
| "오늘의 매력은 87점. 상위 12% 입니다." | "와우! 무려 87점이나 받으셨어요!! 🎉🎉" |
| "사진을 한 장 올려주세요. 30초 안에 끝나요." | "지금 바로 시작! 너의 외모를 평가해줄게 😉" |
| "매칭되었어요. 24시간 안에 첫 메시지를 보내보세요." | "대박 매칭! 어서 톡 보내세요!!" |

---

## Design Tokens

### Colors
```css
:root {
  /* Primary */
  --coral:      #FF5A78;  /* oklch(69% .20 18)  — CTA, 강조, 점수 */
  --coral-deep: #E03B5E;  /* CTA pressed */
  --peach:      #FFB07A;  /* oklch(81% .13 55) — 그라데이션, 따뜻함 */

  /* Premium / accents */
  --aubergine:  #6B2E4E;  /* oklch(35% .09 350) — 다크 표면, 프리미엄 */
  --gold:       #C9A36B;  /* oklch(72% .09 78)  — 등급 S/A, 배지 */
  --ok:         #3FB984;  /* oklch(70% .14 160) — 호환도, 확인 */

  /* Ink & surface */
  --plum:       #1A0F18;  /* 본문 텍스트 (v2 다크 표면용), 거의 검정 */
  --plum-2:     #4A3540;  /* 보조 텍스트 */
  --cream:      #FFF8F5;  /* v1 기본 배경 */
  --bg:         #F7F3EE;  /* v2 기본 배경 (살짝 더 차분한 오프화이트) */
  --sand:       #EDDFD2;  /* 서브 표면, 비활성 칩 */
  --sand-2:     #E0D0C0;  /* divider, progress bar 트랙 */

  /* Lines */
  --line:    rgba(45,31,42,.08);
  --line-2:  rgba(45,31,42,.14);
}
```

### Signature gradient
```css
background: linear-gradient(135deg, #FFB07A 0%, #FF5A78 60%, #E03B5E 100%);
```

### Typography
| Role | Family | Weight | Notes |
|---|---|---|---|
| **Display** (영문/숫자/큰 헤드라인) | **Bricolage Grotesque** | 500–800 | letter-spacing -.04 ~ -.07em |
| **Korean UI/Display** | **Pretendard** | 400/500/600/700/800 | letter-spacing -.02 ~ -.07em |
| **Romance moment** | **Instrument Serif** | 400 (italic) | top X% · "flutter" 같은 감정 강조 한 줄만 |
| **Mono / AI / data** | **JetBrains Mono** | 400/500 | AI 토큰, 좌표값, 시간 |

**Loading**:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css" />
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

### Type scale (mobile / 390 base)
| Token | Size | Use |
|---|---|---|
| display-xl | 72–96px | 매칭 모달 모먼트 |
| display-lg | 54–60px | 홈 헤드라인, 큰 점수 |
| display-md | 32–38px | 화면 제목 |
| score-xl   | 132–160px | 외모/종합 점수 메인 숫자 |
| h1 | 26–30px | 섹션 제목 |
| body-lg | 16px | 본문 강조 |
| body | 14px | 본문 |
| body-sm | 13px | 캡션, AI Note 본문 |
| caption | 11–12px | 라벨, 메타 |
| eyebrow | 10–11px | uppercase, letter-spacing .18–.22em |
| tabular | (variant) | 모든 숫자 표시는 `font-variant-numeric: tabular-nums` |

### Spacing
4px 베이스 그리드. 화면 좌우 패딩 기본 **24px**, 컴팩트 영역은 16–20px.

### Border Radius
| Token | Value | Use |
|---|---|---|
| r-sm | 8px | 칩 내부 |
| r | 14px | 카드 기본 |
| r-md | 18px | 카드 elevated, 입력 |
| r-lg | 22px | 매칭 카드 (큰 카드) |
| r-xl | 24px | 매칭 카드 full-bleed |
| r-pill | 999px | 모든 pill / 토글 / 펄스 칩 |

### Shadows
```css
--shadow-card: 0 1px 2px rgba(45,31,42,.04), 0 8px 24px rgba(45,31,42,.06);
--shadow-lift: 0 8px 24px rgba(255,90,120,.18), 0 2px 6px rgba(45,31,42,.06);
--shadow-modal: 0 12px 40px rgba(45,31,42,.18);
--shadow-card-big: 0 20px 60px rgba(0,0,0,.4); /* 다크 모드 풀스크린 카드 */
```

---

## AI Design Language (5 devices · 매우 중요)

이 다섯 가지 시각 장치를 모든 화면에 **일관되게** 적용해야 다른 매칭 앱과의 차별화가 살아납니다.

### 1. Face Wire (얼굴 와이어프레임 오버레이)
모든 사진 위에 AI가 인식한 얼굴 랜드마크를 점/선/좌표 라벨로 시각화. 21개 점.

- 색: 점은 `#fff`, 페이스 컨투어는 `var(--coral)` 또는 `var(--peach)`, dashed `stroke-dasharray: 2 3`
- 점 크기: 반지름 2.5, 외곽 ring 반지름 5 (`opacity .35`)
- 좌표 라벨 (BROW, JAW.R 등): JetBrains Mono 6–9px, letter-spacing .1em
- `mix-blend-mode: screen` 로 사진 위 자연스럽게 합성
- 분석 화면에서는 점들이 0.4–2초에 걸쳐 점진적으로 그려짐

### 2. AI Note (추론 노트)
"AI가 본 것"을 사람 목소리로 한 줄 전달하는 작은 카드.

```jsx
<div class="ai-note">
  <div class="ai-note-tag">
    <span class="pulse-dot"/> AI · NOTED
  </div>
  <div class="ai-note-body">
    "Strong jaw line and balanced brow. The smile asymmetry is your charm."
  </div>
</div>
```

- 배경: `#fff` (light) / `rgba(255,255,255,.08)` (dark)
- 라벨(`AI · NOTED`, `AI · OPENER`, `AI · TOP REASON`): Bricolage 600 / 10px / letter-spacing .22em / `#9a8674`
- 본문: **Instrument Serif Italic 16px**, line-height 1.4
- 영문/한글 혼용 OK. 핵심 강조는 italic 영문 한 문장.

### 3. Radar (호환도 레이더)
6축 (외모 · 성향 · 호환도 · 거리 · 취향 · 시간대) 정규 헥사곤 폴리곤.

- 그리드 링 4단계 (0.25, 0.5, 0.75, 1.0)
- value polygon: `fill: var(--coral) / opacity .22`, `stroke: var(--coral) / width 1.5`
- 정점 dot: 반지름 3
- 라벨: JetBrains Mono 9px, letter-spacing 1
- 크기 variants: 64 (mini), 84 (inline), 200–230 (detail)

### 4. AI Live Chip (라이브 상태 칩)
"지금 무엇을 하는지" 펄스 인디케이터.

```css
.ai-chip {
  display: inline-flex; gap: 6px; align-items: center;
  padding: 4px 10px; border-radius: 999px;
  background: rgba(45,31,42,.06); /* dark: rgba(255,255,255,.10) */
  font-family: 'Bricolage Grotesque'; font-weight: 600;
  font-size: 10px; letter-spacing: .16em; text-transform: uppercase;
  backdrop-filter: blur(8px);
}
.ai-chip .dot { width: 6px; height: 6px; border-radius: 50%;
  background: var(--coral); animation: pulse 1.4s ease-in-out infinite; }
```

라벨 예시: `AI · LIVE`, `AI · ANALYZING`, `AI · MATCHING 14`, `AI · FIT 96`, `AI · NOTED`, `AI · REASONING`.

### 5. Token Stream (추론 토큰 스트림)
LLM 출력처럼 한 줄씩 나타나는 mono 텍스트.

- JetBrains Mono 11px / line-height 1.7
- 완료된 줄: opacity .55, 앞에 `✓` (var(--ok))
- 진행 중인 줄: opacity 1, 앞에 `▸` (var(--coral)) + 끝에 깜빡이는 캐럿 7×11px
- 대기 줄: opacity .25

---

## Screens (11)

각 화면의 정확한 마크업과 인터랙션 코드는 다음 파일에 있습니다. **꼭 읽고 그 구조를 따라가세요:**

- `v2.jsx` — 메인 6개 화면 (Home, Analyzing, Score, Swipe, WhyMatch, Match)
- `v2-extra.jsx` — 추가 5개 화면 (Spec, Total, MatchList, Chat, Profile)

### 모든 화면 공통
- 모바일 기준 **390×844** 디자인. 실제 빌드는 반응형. 좌우 패딩 24px (목록은 20px, 채팅은 14–16px).
- 상단에 status bar 46px (실서비스에서는 디바이스 status bar)
- 하단에 home indicator 5px × 134px width (탭바 있는 화면 제외)
- 모든 화면에 **AI Chip을 상단 1개 이상 노출**

### 01 Home — 사진 업로드
- 상단: PulseMark 22px + `AI · LIVE` chip
- Eyebrow: `ISSUE · 24`, color coral
- 헤드라인 (Bricolage 700 / 54px): `AI가 본 / 당신의 매력, / 숫자로.` ("당신의 매력"은 Instrument Serif italic + coral)
- 토큰 스트림 카드: `오늘 들어온 2,418명 분석 완료 → 매칭 후보 14명 식별 → 당신을 기다리는 중...`
- 사진 티저 그리드: 큰 사진(Face Wire 오버레이 + `SCAN · 92%` 칩) + Plum 다크 카드(`TODAY 2,418 오늘 AI가 분석한 사람`)
- 하단 CTA: `사진 올리고 AI 분석 시작` (full-width, 60px, gradient, radius 20)
- 풋: `30 SEC · PRIVATE · AUTO DELETE` (mono caption)

**인터랙션**: 드래그앤드롭 + 탭 두 방식 모두 사진 업로드 트리거. JPG/PNG, 최대 10MB. 업로드 즉시 02 화면으로 전환.

### 02 Analyzing (LIVE) — AI 분석
- 다크 모드 `var(--plum) #1A0F18`
- 상단: 뒤로가기 + `AI · ANALYZING` chip + `22s` 카운터
- 단계 라벨: `STEP 3 / 5` (시간 진행에 따라 1→5)
- 헤드라인: `AI가 표정을 / 읽는 중...` (Bricolage 700 / 32px / "..." 부분은 Instrument Serif italic peach)
- 중앙 얼굴 카드: 280×340, Face Wire 점진 그려짐, 가로 스캔 라인이 1.6s 주기로 왕복, 4귀퉁이에 측정 라벨 페이드인 (BROW · 92.4 / EYE.R · 88.7 / JAW · 84.1 / SMILE · +.12)
- Token Stream 카드 (반투명 ghost)
- 하단 progress bar: 0–100%

**상태**: 5 stages with timestamps. 평균 28초. 사진은 분석 후 자동 삭제.

### 03 Score + wire — 외모 점수
- 상단: 뒤로가기 + `AI · RESULT` chip + 공유 버튼
- 좌측: 본인 사진 108×140 (Face Wire 오버레이) / 우측: `YOUR LOOK SCORE` eyebrow + `87` 큰 숫자 (Bricolage 700 / 132px / letter-spacing -.07em / tabular)
- 그 아래: `top 12%` (Instrument Serif italic coral) + `· A 등급` + 오른쪽 `신뢰 96%` AI Chip
- AI Note: `"Strong jaw line and balanced brow. The smile asymmetry is your charm — keep it."`
- 세 줄 breakdown (얼굴 비율 92 / 표정·분위기 85 / 스타일링 84) — 각각 라벨 + `top X%` 보조 + 큰 숫자
- CTA: `다음 · 스펙으로 매력 부스트`

### 04 Spec Input (2/5) — 스펙 입력
- 진행률 바 6px height, 현재 40% (2/5)
- 질문 라벨: `Q.02 · INCOME`
- 헤드라인 (Bricolage 700 / 36px): `연 소득은 / 어느 정도인가요?`
- 보조: "세전 기준. 매칭 시 정확한 숫자는 공개되지 않아요."
- **AI Live Calc 노트** (핵심): `"7천만원 선택 시, 매력점수 +4.2 예상. 같은 권역 매칭 후보 +18명."` → 선택지 변경 시 실시간 업데이트
- 6 options: `5천만원 미만 / 5,000–7,000만원 / 7,000–1억 / 1억–2억 / 2억 이상 / 비공개`
- 각 옵션 우측에 mono delta 표시 (+0.0 / +2.4 / +4.2 / +6.1 / +7.8 / +1.0)
- 선택됨: 1.5px coral border + `#FFF1EC` 안하고 그냥 `#fff` + 작은 shadow + coral radio dot
- CTA: `다음 질문 →`

**전체 5단계**: 소득 → 자산 → 학벌 → 직업 → 키. 각 단계마다 AI Live Calc 텍스트가 바뀜.

### 05 Total Grade — 종합 결과
- 거대 `A+` (Bricolage 700 / 160px, `+`는 Instrument Serif italic 80px verticalAlign super coral)
- 우측 상단: `top 8%` italic + `78,492 ÷ 6,279` mono
- 3개 점수 카드 (외모 87 top 12% / 매력 92 top 6% [Plum primary] / 종합 89 top 8%)
- AI Summary 노트: `"외모는 A, 매력은 S 직전. 7,000–1억 소득 + 전문직 가점으로 강남·송파 권역에서 강한 매치를 만들 수 있어요."`
- Profile Shape 카드: 미니 레이더 84px + `매력·외모 균형형` + 보조 텍스트
- CTA: `등록하고 AI 매칭 시작`

### 06 Swipe (drag) — 매칭 카드 ⚠️ 핵심 인터랙션
- 다크 모드
- 상단: story-bar 5조각 (2개 흰색, 3개 어둑) + PulseMark + `AI · 14 MATCHED` chip + ⋯
- 풀-블리드 사진 카드 (`flex: 1`, radius 24, shadow `0 20px 60px rgba(0,0,0,.4)`)
- 사진 위에 Face Wire 오버레이
- 좌상단: **미니 레이더 76px** (반투명 검정 패널)
- 우상단: 점수 칩 두 개 (`91 · S` 검정 backdrop / `AI · FIT 96` ok 그린)
- 하단 그라데이션 영역에:
  - `SEOUL · GANGNAM` eyebrow
  - `지윤, 27` (이름 Bricolage 700 46px / 나이 Instrument Serif italic peach)
  - `WHY · AI` 버튼 (탭 시 호환도 분해 시트 슬라이드업)
  - 메타 라인: `마케터 · 165cm · 5km`
  - AI Note italic: `"AI noted: you both rate calm weekends over loud nights."`
- 액션 버튼 row: ✕ (54px ghost) / **좋아요 큰 pill 흰색** / ✦ (super like)

**드래그 인터랙션**:
- 마우스/터치 down → move → up
- 카드 transform: `translateX(${x}px) rotate(${x * 0.06}deg)`
- 회전 계수 0.06
- LIKE/NOPE 오버레이: `opacity = clamp(Math.abs(x) / 80, 0, 1)`. LIKE는 italic 'yes' 좌상, NOPE는 'no' 우상. Instrument Serif italic 72px.
- 임계: `|x| > 90` → snap off (set x to ±600px, then reset to 0 after 280ms)
- 미만: 부드럽게 0으로 복귀 (`transition: transform .28s cubic-bezier(.2,.7,.3,1)`)

**WHY 시트**: 카드 위에 `rgba(0,0,0,.6) + backdrop-blur(6px)` 오버레이, 하단 시트 `border-radius: 22px 22px 0 0` + drag handle. 4개 호환 분해 (외모 / 취향 / 시간대 / 거리). 외부 탭하면 닫힘.

### 07 Why this match — AI 추론 디테일
- 헤드라인: `AI가 96점을 / 매긴 이유` ("96"은 Instrument Serif italic coral)
- 풀 사이즈 Radar 230px 중앙
- AI Note (TOP REASON): `"Same Saturday rhythm: cafés before noon, no late-night clubs. That's a rare 88-percentile overlap in Seoul."`
- 4 reason rows (각 row에 좌측 6×36 컬러 바 + 라벨/설명/큰 숫자): 외모 호환 92 / 생활 리듬 88 / 시간대 84 / 거리 96
- CTA: `지윤님에게 좋아요 보내기`

### 08 Matched (Match Moment)
- Light 배경 (`#F7F3EE`)
- 상단 `AI · MATCHED` chip
- 라벨: `FIT · 96`
- 거대 헤드라인: `AI가 이어준 / 오늘의 한 사람.` ("이어준"은 Instrument Serif italic)
- 2개 사진 그리드 (You / 지윤 · 27) — 각각 Face Wire + 점수 칩
- AI Opener Note: `"두 분 다 토요일 오전 카페를 좋아하시네요. 첫 메시지는 거기서 시작해보세요."`
- Primary CTA: `AI가 추천한 첫 메시지 보내기` + secondary: `매칭 이유 자세히 보기`

### 09 Match List — 매칭 목록
- Eyebrow: `AI · CURATED FOR YOU` + 제목 `받은 매칭`
- 탭: `받은 매칭 12` / `보낸 좋아요 8` / `대화 3` — 활성 탭은 coral underline + 칩 카운트 coral 배경
- **AI · TOP TODAY hero card**: 큰 가로 카드, 좌측 사진(Face Wire) + 우측 정보 (이름, 지역, AI Note "same Saturday rhythm", `FIT 96` + `S 등급` 칩) — 배경 plum
- 일반 row 리스트: 48×48 원형 사진(Face Wire) + 이름/나이/지역/`FIT XX`/AI Note italic 한 줄
- 하단 탭바: 홈 · 매칭 · 목록 · 프로필 (Bricolage uppercase 9px)

### 10 Chat + AI suggest — 채팅
- 상단: 뒤로가기 + 38px 아바타(Face Wire) + 이름/online + `AI · FIT 96` chip + ⋯
- 메시지 영역:
  - 시스템 안내(centered, italic): `"두 분 다 토요일 카페를 좋아하시네요."` with `AI · MATCHED 2일 전` 라벨
  - 상대 메시지 (좌, 흰 배경, radius 14 / 4 corner asymmetric)
  - 내 메시지 (우, plum 배경 흰 텍스트, radius 4 / 14 corner asymmetric)
  - **AI · SUGGESTS 카드** (핵심): 3개 답장 아이디어. 각 행에 `01/02/03` mono prefix + 짧은 한국어 제안. 첫 번째는 `#FFF1EC` 배경(추천), 나머지는 sand. 탭하면 입력창에 prefill.
- 하단 composer: + / 입력박스 / 보내기 (coral 원형 42px)

### 11 My Profile — 내 프로필
- 상단: `YOUR AI PROFILE` chip + 편집 아이콘
- Hero 사진 280px (Face Wire) + 우상단 `89 · A+` chip + 하단 그라디언트에 `나, 29` + 지역/직업/키
- 3개 점수 카드 row (외모 87 / 매력 92 / 종합 89)
- Profile Shape: 미니 레이더 + `매력·외모 균형형` + AI 코멘트
- 통계 row: `받은 매칭 12 / 보낸 좋아요 8 / 대화 중 3`

---

## Common Components

### Buttons
| Variant | Height | Radius | Background | Font |
|---|---|---|---|---|
| Primary CTA | 56–60px | 18–22px | gradient(180deg, #FF6B8A, #FF5A78, #F2486A) + shadow-lift | Bricolage 600 / 15–16px |
| Secondary | 50–52px | 16–18px | #fff + 1px var(--line-2) | Bricolage 500 / 14–15px |
| Pill action | 44px | 14px | solid coral | Bricolage 600 / 14px |
| Ghost / Text | auto | none | transparent | Pretendard 500 / 13–14px / coral or plum-2 |

**Primary states**:
- Default: `linear-gradient(180deg, #FF6B8A, #FF5A78, #F2486A)`
- Hover: `linear-gradient(180deg, #FF7A96, #FF6485, #F45577)`
- Pressed: `linear-gradient(180deg, #E84B6B, #D43559, #BD2A4D)`
- Disabled: `#F0E0D6` text `#A39286`, no shadow

### Input
- Default: 52px height, radius 14, 1px var(--line-2), padding `0 16px`, 15px Pretendard
- Focus: 1.5px var(--coral) border, bg `#FFF8F5`, glow `0 0 0 4px rgba(255,90,120,.12)`
- Error: 1.5px var(--coral-deep), error caption 11px

### Option Button (스펙 입력)
- Default: 54px, radius 14, 1px var(--line-2), bg `#fff`
- Selected: 1.5px var(--coral) border, weight 600, small shadow `0 2px 12px rgba(255,90,120,.10)` + coral radio dot

### Progress Bar
- height 6 (compact) / 8 (default), radius 999
- track `var(--sand-2)`, fill `linear-gradient(90deg, var(--peach), var(--coral))`

### Pills (이미 위 AI Chip 참고)
- 기본 padding `5px 10px` / radius 999 / Bricolage 600 / 10–12px / letter-spacing .06–.18em

### Toast
- Success: plum bg, white text, green dot leading
- Error: white bg with 1px coral-deep border, coral-deep text, ⚠ leading

### Modal (Sheet)
- bg `#fff`, radius 22, padding `18px 18px 16px`, shadow-modal
- 드래그 핸들: 36×4, `var(--sand-2)`, margin `0 auto 12px`

---

## Motion · Interactions

모든 전환은 차분하고 짧게. 무거운 spring 대신 부드러운 cubic-bezier.

| Token | Curve | Duration |
|---|---|---|
| standard | `cubic-bezier(.2,.7,.3,1)` | 220ms |
| celebrate | `cubic-bezier(.34,1.56,.64,1)` | 600ms |
| linear-progress | linear | 28s |

### Key animations
1. **점수 카운트업** — 0 → 87 over 1.2s. 가속 후 감속. 마지막 5점은 0.4s에 느리게. 살짝 scale 1.05 → 1.0.
2. **스와이프 물리** — 위 06 화면 사양 참조.
3. **화면 전환** — iOS push: 좌→우 슬라이드 320ms, 이전 화면은 평행이동 −30%. 모달은 sheet up 360ms + scrim 0 → .5.
4. **매칭 성공 이펙트** — 하트/스파클 18개가 0.6–1.8s 사이에 등장/확대/페이드. 두 아바타는 반대 방향에서 모여 100ms 겹침. **iOS/Android: haptic medium 트리거**.
5. **CTA 호흡** — 진입 600ms 시점에 shadow가 6 → 14 → 6으로 한 번 호흡. 반복 X.
6. **분석 로딩** — Face Wire 점들이 0.4–2s 사이 점진 그려짐. 스캔 라인 1.6s ease-in-out 왕복.
7. **AI Chip 펄스 도트** — 1.4s ease-in-out infinite (opacity .5 ↔ 1).

### 30초 온보딩 플로우 (`onboarding.html` 참고)
| 시간 | Scene |
|---|---|
| 0–2s | 로고 블룸 (다크 → PulseMark 그려지고 "설렘" 한글 페이드인) |
| 2–5s | Home/Upload 화면. 사진이 아래에서 튀어 들어오고 Face Wire 점진 그려짐 |
| 5–12s | AI Analyzing. Face Wire + 스캔라인 + 단계별 토큰 스트림 |
| 12–17s | 점수 카운트업 (0→87) + AI Note 슬라이드인 + 3개 stat row 스태거 |
| 17–22s | "AI · MATCHING" — concentric ring pulse + 14 카운트업 |
| 22–27s | 매칭 카드 슬라이드인 + 자동 좋아요 스와이프 |
| 27–30s | MATCHED 모먼트. flutter meets flutter. 두 아바타 충돌. 스파클 |

---

## Icons (커스텀 세트)
24×24 그리드, **1.6px stroke**, round join/cap. 외곽 선 + 채움 두 가지 변형. 사용된 아이콘 목록은 `system.jsx`의 `IconSet` 컴포넌트 참고. (heart / heart-fill / close / check / star / sparkle / upload / camera / profile / home / menu / list / match-sync / chat / verified / lock / analysis / trend / edit / shine / location / time / filter / arrow-right)

---

## State Management

### 글로벌
- `user.score` { 외모, 매력, 종합, grade, percentile, breakdown[] }
- `user.spec` { 소득, 자산, 학벌, 직업, 키 }
- `user.photo` { url, faceLandmarks[], confidence }
- `matches[]` { id, name, age, region, photo, scores, fit, aiNote }
- `chat[]` { matchId, messages[], aiSuggestions[] }

### 분석 단계 (02 Analyzing)
- 5 단계 enum: face_detect → ratio → expression → embedding → match_candidates
- 각 단계 confidence + duration. 평균 총 28s.

### 매칭 카드 (06)
- 로컬 state: `x` (드래그 offset), `dragging` (bool), `showWhy` (bool)
- 글로벌: `currentMatchIndex`, `seenMatches[]`, `likedMatches[]`

### 채팅 (10)
- `messages[]`, `aiSuggestions[]` (3개 매번 갱신), `composer.value`
- AI 추천 클릭 시 composer에 prefill, send 시 messages.push + AI suggest 재호출

---

## API/백엔드 가정 (개발자 참고)
- `POST /analyze` — multipart 사진 업로드, 응답: `{ score, breakdown, landmarks[], aiNotes[] }`
- `POST /spec` — body: `{ 소득, 자산, ... }`, 응답: `{ 매력점수, 종합점수, grade, percentile }`
- `GET /matches` — 응답: `[ { ...person, fit, aiNote, reasons[] } ]`
- `POST /like/:matchId` — 응답: `{ matched: bool, contact?, aiOpener? }`
- `GET /chat/:matchId/suggestions` — 응답: `[ {text}, {text}, {text} ]` (최근 메시지 컨텍스트 기반)

---

## Files in this bundle
| File | Purpose |
|---|---|
| `index.html` | 메인 디자인 캔버스 — 11개 화면 + 컴포넌트 + 시스템 문서 모두 한 페이지에. **개발자가 가장 먼저 열어볼 파일.** |
| `onboarding.html` | 30초 모션 프로토타입 (animations.jsx). 첫 사용자 경험 영상으로 재생. |
| `v2.jsx` | 6개 메인 화면 React 컴포넌트 (Home/Analyzing/Score/Swipe/WhyMatch/Match) + AI primitives (FaceWire, Radar, AINote, AIChip, TokenStream) |
| `v2-extra.jsx` | 5개 추가 화면 (Spec/Total/MatchList/Chat/Profile) |
| `brand.jsx` | 브랜드 아이덴티티 아트보드 (names/logo/palette/voice) |
| `system.jsx` | 컴포넌트 라이브러리 사양 (buttons/inputs/cards/motion/icons) |
| `screens.jsx` | Phone shell 헬퍼 (`Phone`, `TopBar`, `Chevron`, `Logo`) |
| `animations.jsx` | 타임라인 애니메이션 엔진 (Stage / Sprite / Easing). 온보딩 화면이 사용. |
| `app.jsx` | 디자인 캔버스 composition (어떤 화면이 어디 배치되는지) |
| `design-canvas.jsx` | 캔버스 셸 (pan/zoom/section). 디자인 도구. **프로덕션 코드 X.** |

---

## Implementation Notes / 권장 순서

1. **디자인 토큰 먼저** — colors / typography / spacing / radius / shadows를 코드베이스 토큰 시스템에 옮긴다.
2. **AI primitives 5개를 컴포넌트로** — `FaceWire`, `Radar`, `AINote`, `AIChip`, `TokenStream`을 재사용 컴포넌트로 만든다. 이게 디자인 정체성이다.
3. **공통 컴포넌트** — `Button`, `Input`, `OptionButton`, `Pill`, `Toast`, `Sheet` (모달).
4. **온보딩 플로우 (01→02→03→04→05)** — 첫 30초가 가장 중요. 모션 디테일 챙길 것.
5. **매칭 (06→07→08)** — 스와이프 인터랙션은 라이브러리(`framer-motion` 또는 `react-use-gesture`) 사용 권장. 직접 구현 시 `screens.jsx`의 `V2_Swipe`/`S6_SwipeCard` 코드 참고.
6. **포스트-매칭 (09→10→11)** — 목록/채팅/프로필.
7. **AI Note 카피라이팅** — 백엔드/AI 팀과 협의. 시드 카피는 위 화면 설명에 다 있음. 톤 일관성 유지가 핵심.

## 주의사항
- **이모지 금지** — 톤앤매너 위반. 예외: 위치 아이콘 대신 vector icon 사용.
- **숫자는 항상 tabular-nums** — `font-variant-numeric: tabular-nums`. 카운트업 시 점프 방지.
- **Face Wire는 placeholder 아님** — AI가 실제로 본 랜드마크 좌표를 받아서 그려야 한다. 좌표가 없으면 노출하지 말 것.
- **사진 자동 삭제** — UI에 약속한 그대로 백엔드 구현 필요.
