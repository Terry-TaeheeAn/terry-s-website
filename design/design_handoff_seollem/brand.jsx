/* brand.jsx — brand identity artboards */

// ---------- AURA logomark ----------
const AuraMark = ({ size = 72, color = '#FF5A78', color2 = '#FFB07A' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <defs>
      <linearGradient id="auraG" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={color2} />
        <stop offset="1" stopColor={color} />
      </linearGradient>
    </defs>
    {/* Two overlapping circles = vesica piscis = encounter/match */}
    <circle cx="38" cy="50" r="28" stroke="url(#auraG)" strokeWidth="3" />
    <circle cx="62" cy="50" r="28" stroke="url(#auraG)" strokeWidth="3" />
    {/* center spark */}
    <path d="M50 38 L52 48 L62 50 L52 52 L50 62 L48 52 L38 50 L48 48 Z" fill="url(#auraG)" />
  </svg>
);

// ---------- 1) Name proposals ----------
const NameCard = ({ rec, name, hangul, tagline, meaning, fontTreat }) => (
  <div style={{
    background:'#fff', borderRadius:18, padding:'22px 22px 22px', border: rec?'1.5px solid var(--coral)':'1px solid var(--line)',
    position:'relative', minHeight:220, display:'flex', flexDirection:'column', gap:10,
    boxShadow: rec ? '0 8px 24px rgba(255,90,120,.10)' : 'none'
  }}>
    <div style={{display:'flex',alignItems:'flex-start',gap:10,minHeight:22}}>
      <div className="doc-eyebrow" style={{flex:1, lineHeight:1.4}}>{meaning}</div>
      {rec && <span style={{background:'var(--coral)',color:'#fff',padding:'5px 10px',borderRadius:999,fontSize:10,fontWeight:700,letterSpacing:'.06em',whiteSpace:'nowrap',flexShrink:0}}>RECOMMENDED</span>}
    </div>
    <div style={{display:'flex',flexDirection:'column',gap:4,marginTop:4}}>
      <div style={fontTreat}>{name}</div>
      <div style={{fontSize:15,color:'var(--plum-2)',fontWeight:500,fontFamily:'var(--mono)',letterSpacing:'.04em'}}>{hangul}</div>
    </div>
    <div className="doc-body" style={{marginTop:'auto'}}>{tagline}</div>
  </div>
);

const BrandNames = () => (
  <div style={{padding:32, display:'flex', flexDirection:'column', gap:20, fontFamily:'Pretendard'}}>
    <div>
      <div className="doc-eyebrow">01 · Name proposals</div>
      <div className="doc-h" style={{marginTop:8}}>이름 후보 3</div>
      <div className="doc-body" style={{marginTop:8, maxWidth:520}}>
        프리미엄 + AI + 따뜻한 설렘. 한국 사용자에게 부담 없고 영문 표기도 자연스러운 후보로 좁혔습니다.
      </div>
    </div>
    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:14}}>
      <NameCard
        rec
        name="설렘"
        hangul="Seollem"
        meaning="첫 만남의 떨림 · 한국어 고유 정서"
        tagline="가장 한국적인 감정 단어. AI 분석의 차가움을 따뜻하게 중화하고, 타겟 정서와 즉시 통합니다."
        fontTreat={{fontFamily:'Pretendard', fontWeight:800, fontSize:64, lineHeight:.9, letterSpacing:'-.06em', color:'var(--plum)'}}
      />
      <NameCard
        name="AURA"
        hangul="오라"
        meaning="매력의 분위기 · 고유의 빛"
        tagline="글로벌 가독성과 프리미엄 톤. 다만 한국어 정서적 후킹은 다소 약합니다."
        fontTreat={{fontFamily:'var(--serif)', fontStyle:'italic', fontSize:60, lineHeight:.9, letterSpacing:'-.02em', color:'var(--plum)'}}
      />
      <NameCard
        name="LUMI"
        hangul="루미"
        meaning="빛 · 매력을 비추다"
        tagline="가볍고 모던. AI · 점수 메타포와 어울리나 비슷한 글로벌 브랜드가 다수 존재."
        fontTreat={{fontFamily:'var(--serif)', fontStyle:'italic', fontSize:60, lineHeight:.9, letterSpacing:'-.02em', color:'var(--plum)'}}
      />
    </div>
  </div>
);

// ---------- 2) Logo ----------
const BrandLogo = () => (
  <div style={{padding:32, fontFamily:'Pretendard', display:'flex', flexDirection:'column', gap:20}}>
    <div>
      <div className="doc-eyebrow">02 · Logomark</div>
      <div className="doc-h" style={{marginTop:8}}>로고 컨셉</div>
      <div className="doc-body" style={{marginTop:8, maxWidth:560}}>
        두 개의 원이 겹쳐 만드는 베지카(vesica) 형태 = <b>만남의 교집합</b>. 가운데 작은 스파크는 AI가 발견한 매력 포인트. 한글 워드마크는 <b>Pretendard 800</b>에 -6% 자간으로 단단하게, 영문 보조는 Instrument Serif Italic으로 부드럽게.
      </div>
    </div>

    {/* primary mark on cream */}
    <div style={{display:'grid', gridTemplateColumns:'1.2fr 1fr 1fr', gap:14}}>
      <div style={{background:'var(--cream)', borderRadius:18, padding:'30px 28px', border:'1px solid var(--line)', display:'flex', alignItems:'center', gap:20}}>
        <AuraMark size={88} />
        <div>
          <div style={{fontFamily:'Pretendard', fontWeight:800, fontSize:64, lineHeight:.95, letterSpacing:'-.06em', color:'var(--plum)'}}>설렘</div>
          <div style={{fontFamily:'var(--serif)', fontStyle:'italic', fontSize:22, color:'var(--coral)', marginTop:2, lineHeight:1}}>Seollem</div>
          <div style={{fontFamily:'var(--mono)', fontSize:10, letterSpacing:'.18em', color:'#9a8674', marginTop:6}}>AI · MATCH · KOREA</div>
        </div>
      </div>
      <div style={{background:'var(--plum)', borderRadius:18, padding:'30px 28px', display:'flex', alignItems:'center', gap:18, color:'#fff'}}>
        <AuraMark size={64} color="#FFB07A" color2="#FF8FA8" />
        <div>
          <div style={{fontFamily:'Pretendard', fontWeight:800, fontSize:46, lineHeight:.95, letterSpacing:'-.06em', color:'#fff'}}>설렘</div>
          <div style={{fontFamily:'var(--serif)', fontStyle:'italic', fontSize:18, color:'var(--peach)', marginTop:2, lineHeight:1}}>Seollem</div>
          <div style={{fontFamily:'var(--mono)', fontSize:10, letterSpacing:'.18em', opacity:.6, marginTop:6}}>DARK / NIGHT</div>
        </div>
      </div>
      <div style={{background:'linear-gradient(135deg,#FF6B8A,#FFB07A)', borderRadius:18, padding:'30px 28px', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:8}}>
        <AuraMark size={56} color="#fff" color2="#fff" />
        <div style={{fontFamily:'Pretendard', fontWeight:800, fontSize:34, lineHeight:.95, letterSpacing:'-.06em', color:'#fff'}}>설렘</div>
        <div style={{fontFamily:'var(--mono)', fontSize:10, letterSpacing:'.18em', color:'#fff', opacity:.9}}>APP ICON</div>
      </div>
    </div>

    {/* type spec */}
    <div style={{background:'#fff', borderRadius:18, padding:24, border:'1px solid var(--line)'}}>
      <div className="doc-eyebrow" style={{marginBottom:14}}>Typography</div>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:24}}>
        <div>
          <div style={{fontFamily:'Pretendard', fontWeight:800, fontSize:60, lineHeight:1, color:'var(--plum)', letterSpacing:'-.06em'}}>설렘</div>
          <div className="doc-eyebrow" style={{marginTop:10}}>Pretendard · 800</div>
          <div className="doc-body">한글 워드마크 · 헤드라인 · 강조</div>
        </div>
        <div>
          <div style={{fontFamily:'var(--serif)', fontStyle:'italic', fontSize:56, lineHeight:1, color:'var(--coral)'}}>Aa 87</div>
          <div className="doc-eyebrow" style={{marginTop:10}}>Instrument Serif · Italic</div>
          <div className="doc-body">점수 · 영문 보조 · 모먼트</div>
        </div>
        <div>
          <div style={{fontFamily:'Pretendard', fontWeight:500, fontSize:32, color:'var(--plum)', letterSpacing:'-.02em', lineHeight:1.1}}>가나다 Aa<br/>본문 텍스트</div>
          <div className="doc-eyebrow" style={{marginTop:10}}>Pretendard · 400 / 500 / 600 / 700</div>
          <div className="doc-body">UI · 본문 · 버튼 · 라벨</div>
        </div>
      </div>
    </div>
  </div>
);

// ---------- 3) Color palette ----------
const SWATCHES = [
  { token:'--coral',     name:'Primary Coral', hex:'#FF5A78', oklch:'oklch(69% .20 18)', role:'CTA · 강조 · 점수' },
  { token:'--peach',     name:'Peach',         hex:'#FFB07A', oklch:'oklch(81% .13 55)', role:'그라데이션 · 따뜻함' },
  { token:'--aubergine', name:'Aubergine',     hex:'#6B2E4E', oklch:'oklch(35% .09 350)', role:'프리미엄 · 다크 표면' },
  { token:'--gold',      name:'Gold',          hex:'#C9A36B', oklch:'oklch(72% .09 78)', role:'등급 S/A · 배지' },
  { token:'--ok',        name:'OK Green',      hex:'#3FB984', oklch:'oklch(70% .14 160)', role:'호환도 · 확인' },
  { token:'--plum',      name:'Plum Ink',      hex:'#2D1F2A', oklch:'oklch(20% .02 350)', role:'본문 텍스트' },
  { token:'--cream',     name:'Cream',         hex:'#FFF8F5', oklch:'oklch(98% .01 40)',  role:'기본 배경' },
  { token:'--sand',      name:'Sand',          hex:'#F5E8DE', oklch:'oklch(93% .02 50)',  role:'서브 표면 · 카드' },
];

const BrandPalette = () => (
  <div style={{padding:32, fontFamily:'Pretendard', display:'flex', flexDirection:'column', gap:20}}>
    <div>
      <div className="doc-eyebrow">03 · Palette</div>
      <div className="doc-h" style={{marginTop:8}}>컬러 시스템</div>
      <div className="doc-body" style={{marginTop:8, maxWidth:560}}>
        제공해주신 핑크/피치를 oklch 기반으로 다시 다듬어 동일한 lightness 라인에 정렬했습니다. 메인 2 + 보조 3 + 잉크/배경 2.
      </div>
    </div>
    <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:14}}>
      {SWATCHES.map(s => (
        <div className="swatch" key={s.token}>
          <div className="chip" style={{
            background:s.hex,
            color: ['--cream','--sand','--peach','--gold'].includes(s.token) ? 'var(--plum)' : '#fff'
          }}>{s.hex}</div>
          <div style={{display:'flex',flexDirection:'column',gap:3}}>
            <div style={{fontSize:13, fontWeight:600, color:'var(--plum)'}}>{s.name}</div>
            <div style={{fontSize:11, color:'#9a8674', fontFamily:'var(--mono)'}}>{s.token}</div>
            <div style={{fontSize:11, color:'#6a5a4a'}}>{s.role}</div>
          </div>
        </div>
      ))}
    </div>

    {/* gradient */}
    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
      <div style={{borderRadius:18, padding:'28px 24px', background:'linear-gradient(135deg,#FFB07A 0%, #FF5A78 60%, #E03B5E 100%)', color:'#fff'}}>
        <div style={{fontFamily:'var(--mono)', fontSize:11, letterSpacing:'.16em', opacity:.85}}>SIGNATURE GRADIENT</div>
        <div style={{fontFamily:'var(--serif)', fontStyle:'italic', fontSize:34, marginTop:8}}>Peach → Coral → Deep</div>
        <div style={{fontFamily:'var(--mono)', fontSize:10, marginTop:14, opacity:.85}}>linear-gradient(135deg, #FFB07A, #FF5A78, #E03B5E)</div>
      </div>
      <div style={{borderRadius:18, padding:'28px 24px', background:'var(--plum)', color:'#fff'}}>
        <div style={{fontFamily:'var(--mono)', fontSize:11, letterSpacing:'.16em', opacity:.7}}>DARK SURFACE</div>
        <div style={{fontFamily:'var(--serif)', fontStyle:'italic', fontSize:34, marginTop:8, color:'#FFB07A'}}>Match Moment</div>
        <div className="doc-body" style={{marginTop:14, color:'rgba(255,255,255,.65)'}}>매칭 성공 · 프리미엄 멤버십 · 야간 모드 표면</div>
      </div>
    </div>
  </div>
);

// ---------- 4) Tone & Voice ----------
const VOICE = [
  ['설레는',     'Fluttering', '심장 박동이 살짝 빨라지는 톤. 과장된 흥분은 피한다.'],
  ['세련된',     'Refined',    '존댓말 기반, 줄임말/이모지 최소화. 어른의 데이팅.'],
  ['명료한',     'Clear',      '점수·등급·매칭률 같은 숫자는 한 줄로. 추측 없음.'],
  ['따뜻한',     'Warm',       '판단하지 않는다. 결과를 알릴 때도 한 줄의 환대.'],
  ['자신감 있는','Confident',  '잘 보이려 애쓰지 않는다. 사실을 차분히 단언한다.'],
];

const COPY_DO_DONT = [
  { do_: '오늘의 매력은 87점. 상위 12% 입니다.', dont: '와우! 무려 87점이나 받으셨어요!! 🎉🎉' },
  { do_: '사진을 한 장 올려주세요. 30초 안에 끝나요.', dont: '지금 바로 시작! 너의 외모를 평가해줄게 😉' },
  { do_: '매칭되었어요. 24시간 안에 첫 메시지를 보내보세요.', dont: '대박 매칭! 어서 톡 보내세요!!' },
];

const BrandVoice = () => (
  <div style={{padding:32, fontFamily:'Pretendard', display:'flex', flexDirection:'column', gap:20}}>
    <div>
      <div className="doc-eyebrow">04 · Voice</div>
      <div className="doc-h" style={{marginTop:8}}>톤앤매너 키워드</div>
    </div>
    <div style={{display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:12}}>
      {VOICE.map(([ko, en, desc]) => (
        <div key={ko} style={{background:'#fff', border:'1px solid var(--line)', borderRadius:16, padding:18, display:'flex', flexDirection:'column', gap:8, minHeight:160}}>
          <div style={{fontFamily:'var(--serif)', fontStyle:'italic', fontSize:30, color:'var(--coral)', lineHeight:.9}}>{en}</div>
          <div style={{fontSize:16, fontWeight:700, color:'var(--plum)'}}>{ko}</div>
          <div style={{fontSize:12, color:'var(--plum-2)', lineHeight:1.5, marginTop:'auto'}}>{desc}</div>
        </div>
      ))}
    </div>

    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
      <div style={{background:'#fff', borderRadius:16, padding:20, border:'1px solid var(--line)'}}>
        <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:12}}>
          <span className="pill" style={{background:'rgba(63,185,132,.12)', color:'var(--ok)'}}>DO</span>
          <span style={{fontSize:12, color:'#9a8674'}}>이렇게 쓴다</span>
        </div>
        {COPY_DO_DONT.map((c,i)=>(
          <div key={i} style={{fontSize:14, color:'var(--plum)', padding:'10px 0', borderTop:i?'1px solid var(--line)':'none', lineHeight:1.5}}>{c.do_}</div>
        ))}
      </div>
      <div style={{background:'#fff', borderRadius:16, padding:20, border:'1px solid var(--line)'}}>
        <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:12}}>
          <span className="pill" style={{background:'rgba(224,59,94,.10)', color:'var(--coral-deep)'}}>DON'T</span>
          <span style={{fontSize:12, color:'#9a8674'}}>피한다</span>
        </div>
        {COPY_DO_DONT.map((c,i)=>(
          <div key={i} style={{fontSize:14, color:'var(--plum-2)', padding:'10px 0', borderTop:i?'1px solid var(--line)':'none', lineHeight:1.5, textDecoration:'line-through', textDecorationColor:'rgba(224,59,94,.4)'}}>{c.dont}</div>
        ))}
      </div>
    </div>
  </div>
);

Object.assign(window, { AuraMark, BrandNames, BrandLogo, BrandPalette, BrandVoice });
