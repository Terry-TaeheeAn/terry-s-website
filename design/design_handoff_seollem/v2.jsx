/* v2.jsx — Editorial Match · AI-native */

// ===================================================================
// AI presence primitives
// ===================================================================

// Live "AI is doing X" status chip with pulsing dot
const AIChip = ({ children, dark, accent='var(--coral)' }) => (
  <span style={{
    display:'inline-flex', alignItems:'center', gap:6,
    padding:'4px 10px', borderRadius:999,
    background: dark ? 'rgba(255,255,255,.10)' : 'rgba(45,31,42,.06)',
    color: dark ? '#fff' : 'var(--plum)',
    fontFamily:'var(--display)', fontWeight:600, fontSize:10, letterSpacing:'.16em', textTransform:'uppercase',
    backdropFilter:'blur(8px)'
  }}>
    <span className="pulse" style={{width:6, height:6, borderRadius:'50%', background:accent}}/>
    {children}
  </span>
);

// Face landmark overlay — vector dots + soft connecting lines
const FaceWire = ({ color='#fff', accent='var(--coral)', size='100%' }) => {
  // landmark coords on a 200x260 face viewBox (eye/brow/nose/mouth/jaw)
  const pts = [
    [60,90],[80,86],[100,92],     // L brow
    [120,92],[140,86],[160,90],   // R brow
    [76,108],[92,108],            // L eye
    [128,108],[144,108],          // R eye
    [110,140],[100,158],[120,158],// nose
    [88,182],[110,184],[132,182], // mouth
    [76,200],[110,210],[144,200], // chin/jaw
    [55,140],[165,140],           // cheeks
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 200 260" fill="none" style={{position:'absolute', inset:0, mixBlendMode:'screen'}}>
      {/* face contour */}
      <path d="M50 110 Q50 60 100 50 Q150 60 150 110 Q150 180 130 210 Q110 230 100 232 Q90 230 70 210 Q50 180 50 110 Z"
        stroke={accent} strokeWidth=".8" strokeDasharray="2 3" opacity=".7"/>
      {/* connections */}
      <path d="M76 108 L92 108 M128 108 L144 108 M100 158 L120 158 M88 182 L132 182" stroke={color} strokeWidth=".6" opacity=".5"/>
      {/* dots */}
      {pts.map(([x,y],i)=>(
        <g key={i}>
          <circle cx={x} cy={y} r="2.5" fill={color} opacity=".9"/>
          <circle cx={x} cy={y} r="5" fill="none" stroke={color} strokeWidth=".5" opacity=".35"/>
        </g>
      ))}
      {/* anchor labels */}
      <text x="6" y="100" fill={accent} fontSize="6" fontFamily="JetBrains Mono" letterSpacing="1">L.BROW</text>
      <text x="6" y="160" fill={accent} fontSize="6" fontFamily="JetBrains Mono" letterSpacing="1">JAW.R</text>
      <text x="148" y="80" fill={accent} fontSize="6" fontFamily="JetBrains Mono" letterSpacing="1">+.92</text>
      <text x="148" y="200" fill={accent} fontSize="6" fontFamily="JetBrains Mono" letterSpacing="1">+.88</text>
    </svg>
  );
};

// Compatibility radar — 6 axes
const Radar = ({ values=[.92,.88,.96,.74,.81,.85], labels=['외모','성향','호환도','거리','취향','시간대'], size=200, dark }) => {
  const cx = size/2, cy = size/2, R = size*0.38;
  const N = values.length;
  const angle = i => (Math.PI*2*i)/N - Math.PI/2;
  const ax = (i, r=R) => cx + Math.cos(angle(i)) * r;
  const ay = (i, r=R) => cy + Math.sin(angle(i)) * r;
  const poly = values.map((v,i)=>`${ax(i, R*v)},${ay(i, R*v)}`).join(' ');
  const fg = dark ? '#fff' : 'var(--plum)';
  const accent = 'var(--coral)';
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* grid rings */}
      {[0.25,0.5,0.75,1].map(s=>(
        <polygon key={s}
          points={Array.from({length:N},(_,i)=>`${ax(i,R*s)},${ay(i,R*s)}`).join(' ')}
          fill="none" stroke={fg} strokeWidth=".5" opacity={dark?.18:.1}/>
      ))}
      {/* axes */}
      {Array.from({length:N},(_,i)=>(
        <line key={i} x1={cx} y1={cy} x2={ax(i)} y2={ay(i)} stroke={fg} strokeWidth=".5" opacity={dark?.2:.12}/>
      ))}
      {/* value polygon */}
      <polygon points={poly} fill={accent} fillOpacity=".22" stroke={accent} strokeWidth="1.5"/>
      {/* dots on vertices */}
      {values.map((v,i)=>(
        <circle key={i} cx={ax(i,R*v)} cy={ay(i,R*v)} r="3" fill={accent}/>
      ))}
      {/* labels */}
      {labels.map((l,i)=>(
        <text key={i}
          x={ax(i, R+14)} y={ay(i, R+14)}
          textAnchor="middle" dominantBaseline="middle"
          fill={fg} opacity={dark?.7:.55}
          fontFamily="JetBrains Mono" fontSize="9" letterSpacing="1"
        >{l}</text>
      ))}
    </svg>
  );
};

// AI reasoning bubble — italic "I noticed..." voice
const AINote = ({ children, tag='AI · NOTE', dark }) => (
  <div style={{
    background: dark ? 'rgba(255,255,255,.08)' : '#fff',
    border: dark ? '1px solid rgba(255,255,255,.14)' : '1px solid var(--line)',
    borderRadius:14, padding:'14px 16px',
    color: dark ? '#fff' : 'var(--plum)',
    position:'relative'
  }}>
    <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:8}}>
      <span className="pulse" style={{width:6, height:6, borderRadius:'50%', background:'var(--coral)'}}/>
      <span style={{fontFamily:'var(--display)', fontWeight:600, fontSize:10, letterSpacing:'.22em', color: dark?'rgba(255,255,255,.6)':'#9a8674'}}>{tag}</span>
    </div>
    <div style={{fontFamily:'var(--serif)', fontStyle:'italic', fontSize:16, lineHeight:1.4, color: dark?'#fff':'var(--plum)'}}>{children}</div>
  </div>
);

// Token-stream simulation (static markup, styled like streaming)
const TokenStream = ({ lines }) => (
  <div style={{fontFamily:'var(--mono)', fontSize:11, lineHeight:1.7, color:'var(--plum-2)'}}>
    {lines.map((l,i)=>(
      <div key={i} style={{opacity: i===lines.length-1 ? 1 : .55}}>
        <span style={{color:'var(--coral)'}}>{i===lines.length-1 ? '▸ ' : '· '}</span>{l}{i===lines.length-1 && <span className="pulse" style={{display:'inline-block', width:7, height:12, marginLeft:2, verticalAlign:'middle', background:'var(--coral)'}}/>}
      </div>
    ))}
  </div>
);

// ===================================================================
// v2 mark — minimal pulse curve (reused across v2)
// ===================================================================
const PulseMark = ({ size=72, color='var(--plum)', dot='var(--coral)' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path d="M22 64 Q28 38 50 38 Q72 38 72 56 Q72 70 56 70 Q44 70 38 80"
          stroke={color} strokeWidth="7" strokeLinecap="round" fill="none"/>
    <circle cx="78" cy="30" r="6" fill={dot}/>
  </svg>
);

// ===================================================================
// v2 BRAND (with AI thesis)
// ===================================================================
const V2_Brand = () => (
  <div style={{padding:32, fontFamily:'Pretendard', display:'flex', flexDirection:'column', gap:22}}>
    <div>
      <div style={{display:'flex', alignItems:'center', gap:10}}>
        <span style={{fontFamily:'var(--display)', fontWeight:500, fontSize:11, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--coral)'}}>v2 · Editorial Match · AI-native</span>
        <AIChip>AI · ACTIVE</AIChip>
      </div>
      <div style={{fontFamily:'var(--display)', fontWeight:700, fontSize:56, lineHeight:.95, letterSpacing:'-.04em', color:'var(--plum)', marginTop:12}}>
        AI가 <span style={{fontStyle:'italic', fontFamily:'var(--serif)', fontWeight:400}}>읽고</span>,<br/>
        AI가 <span style={{fontStyle:'italic', fontFamily:'var(--serif)', fontWeight:400}}>이어줍니다</span>.
      </div>
      <div className="doc-body" style={{marginTop:12, maxWidth:600}}>
        다른 앱은 사진 더미를 보여줍니다. 우리는 사진 위에 <b>AI가 본 것</b>을 보여줍니다 — 얼굴 랜드마크, 호환도 레이더, "왜 이 사람"인지 한 줄의 이유. 차별점은 그 자체로 디자인 언어가 됩니다.
      </div>
    </div>

    {/* 5 AI design devices */}
    <div style={{display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:12}}>
      {[
        {n:'01', t:'Face Wire',  d:'AI가 인식한 얼굴 랜드마크를 사진 위에 점/선으로 시각화. 분석/스코어 화면에 노출.', ic:<FaceWire size={56} color="var(--plum)" accent="var(--coral)"/>},
        {n:'02', t:'AI Note',    d:'"내가 본 건 이거예요"라는 italic 톤의 작은 카드. 점수·매칭 결과·왜 매칭 화면에.', ic:<div style={{fontFamily:'var(--serif)',fontStyle:'italic',fontSize:28,color:'var(--coral)'}}>“…”</div>},
        {n:'03', t:'Radar',      d:'6축 호환도 시각화. 카드/매칭 결과에 항상 나타남.', ic:<Radar size={64} values={[.9,.7,.95,.6,.8,.75]} labels={[' ',' ',' ',' ',' ',' ']}/>},
        {n:'04', t:'Live Chip',  d:'AI가 "지금 무엇을 하는지" 펄스 인디케이터로 상시 노출.', ic:<AIChip>AI · MATCHING</AIChip>},
        {n:'05', t:'Token Stream', d:'분석 중 AI 추론을 한 줄씩 실시간으로 흘려보냄. LLM 출력 톤.', ic:<TokenStream lines={['얼굴 비율 92','표정 +0.85','매력 후보 14']}/>},
      ].map(d=>(
        <div key={d.n} style={{background:'#fff', borderRadius:16, border:'1px solid var(--line)', padding:'16px 14px', display:'flex', flexDirection:'column', gap:10, minHeight:200}}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <span style={{fontFamily:'var(--display)', fontWeight:600, fontSize:10, letterSpacing:'.18em', color:'#9a8674'}}>{d.n}</span>
            <span style={{fontFamily:'var(--display)', fontWeight:600, fontSize:13, color:'var(--plum)'}}>{d.t}</span>
          </div>
          <div style={{height:80, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:10, background:'var(--cream)', position:'relative', overflow:'hidden'}}>{d.ic}</div>
          <div style={{fontSize:11, color:'var(--plum-2)', lineHeight:1.5}}>{d.d}</div>
        </div>
      ))}
    </div>

    {/* logomark lockups */}
    <div style={{display:'grid', gridTemplateColumns:'1.2fr 1fr 1fr', gap:14}}>
      <div style={{background:'#F7F3EE', borderRadius:18, padding:'28px', border:'1px solid var(--line)', display:'flex', alignItems:'center', gap:22}}>
        <PulseMark size={84}/>
        <div>
          <div style={{fontFamily:'Pretendard', fontWeight:800, fontSize:60, lineHeight:.95, letterSpacing:'-.07em', color:'var(--plum)'}}>설렘</div>
          <div style={{fontFamily:'var(--display)', fontWeight:500, fontSize:12, letterSpacing:'.22em', textTransform:'uppercase', color:'#9a8674', marginTop:6}}>SEOLLEM · AI MATCH</div>
        </div>
      </div>
      <div style={{background:'#1A0F18', borderRadius:18, padding:'28px', display:'flex', alignItems:'center', gap:18, color:'#fff', position:'relative', overflow:'hidden'}}>
        <PulseMark size={56} color="#FFB07A" dot="#FF6B8A"/>
        <div>
          <div style={{fontFamily:'Pretendard', fontWeight:800, fontSize:44, lineHeight:.95, letterSpacing:'-.07em'}}>설렘</div>
          <div style={{fontFamily:'var(--display)', fontWeight:500, fontSize:10, letterSpacing:'.22em', opacity:.5, marginTop:8}}>DARK</div>
        </div>
        <div style={{position:'absolute',top:14,right:14}}><AIChip dark>AI · ON</AIChip></div>
      </div>
      <div style={{background:'var(--coral)', borderRadius:18, padding:'28px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:10}}>
        <PulseMark size={50} color="#fff" dot="#1A0F18"/>
        <div style={{fontFamily:'Pretendard', fontWeight:800, fontSize:32, lineHeight:.95, letterSpacing:'-.07em', color:'#fff'}}>설렘</div>
        <div style={{fontFamily:'var(--display)', fontWeight:500, fontSize:10, letterSpacing:'.22em', color:'rgba(255,255,255,.7)'}}>APP ICON</div>
      </div>
    </div>
  </div>
);

// ===================================================================
// v2 SCREEN 1 — Home (with live AI status)
// ===================================================================
const V2_Home = () => (
  <Phone bg="#F7F3EE">
    <TopBar
      left={<PulseMark size={22}/>}
      title={<AIChip>AI · LIVE</AIChip>}
      right={<button className="btn-ghost" style={{padding:'6px 10px',fontSize:11,fontFamily:'var(--display)',fontWeight:500,letterSpacing:'.14em',textTransform:'uppercase',color:'var(--plum-2)'}}>LOG IN</button>}
    />

    <div style={{padding:'24px 24px 0'}}>
      <div style={{fontFamily:'var(--display)', fontWeight:500, fontSize:11, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--coral)'}}>ISSUE · 24</div>
      <h1 style={{fontFamily:'var(--display)', fontWeight:700, fontSize:54, lineHeight:.95, letterSpacing:'-.04em', color:'var(--plum)', margin:'12px 0 0'}}>
        AI가 본<br/>
        <span style={{fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:400, color:'var(--coral)'}}>당신의 매력</span>,<br/>
        숫자로.
      </h1>
      <p style={{fontFamily:'Pretendard', fontSize:13, color:'var(--plum-2)', marginTop:14, lineHeight:1.6, maxWidth:300}}>
        사진 한 장. 30초 분석. AI가 매력의 좌표를 찾고, 가장 가까운 사람부터 보여드립니다.
      </p>
    </div>

    {/* AI thinking-out-loud stream */}
    <div style={{padding:'18px 24px 0'}}>
      <div style={{background:'#fff', borderRadius:14, padding:'14px 16px', border:'1px solid var(--line)'}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8}}>
          <AIChip>AI · NOW</AIChip>
          <span style={{fontFamily:'var(--mono)', fontSize:10, color:'#9a8674'}}>v3.2 · seoul</span>
        </div>
        <TokenStream lines={[
          '오늘 들어온 2,418명 분석 완료',
          '강남·송파 권역 매칭 후보 14명 식별',
          '당신을 기다리는 중...',
        ]}/>
      </div>
    </div>

    {/* photo teaser w/ wire overlay */}
    <div style={{padding:'12px 24px 0'}}>
      <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:8, height:160}}>
        <div className="ph-img" data-label="PHOTO" style={{borderRadius:18, position:'relative', overflow:'hidden'}}>
          <FaceWire color="#fff" accent="var(--coral)"/>
          <span style={{position:'absolute', left:12, bottom:12, padding:'4px 10px', borderRadius:999, background:'rgba(0,0,0,.6)', backdropFilter:'blur(8px)', fontFamily:'var(--display)', fontWeight:600, fontSize:10, letterSpacing:'.08em', color:'#fff'}}>SCAN · 92%</span>
        </div>
        <div style={{borderRadius:14, background:'var(--plum)', color:'#fff', padding:'12px', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
          <span style={{fontFamily:'var(--display)', fontWeight:500, fontSize:9, letterSpacing:'.2em', opacity:.6}}>TODAY</span>
          <span className="tabular" style={{fontFamily:'var(--display)', fontWeight:700, fontSize:30, letterSpacing:'-.04em', lineHeight:.9}}>2,418</span>
          <span style={{fontFamily:'Pretendard', fontSize:10, opacity:.7}}>오늘 AI가 분석한 사람</span>
        </div>
      </div>
    </div>

    {/* big CTA strip */}
    <div style={{position:'absolute', left:0, right:0, bottom:0, padding:'16px 20px 28px', background:'linear-gradient(180deg, transparent 0%, #F7F3EE 30%)'}}>
      <button className="btn-primary" style={{height:60, fontFamily:'var(--display)', fontWeight:600, fontSize:16, letterSpacing:'-.01em', borderRadius:20}}>
        사진 올리고 AI 분석 시작
        <Chevron d="right"/>
      </button>
      <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginTop:10, fontSize:10, color:'#9a8674', fontFamily:'var(--display)', letterSpacing:'.14em'}}>
        <span>30 SEC</span><span>·</span><span>PRIVATE</span><span>·</span><span>AUTO DELETE</span>
      </div>
    </div>
  </Phone>
);

// ===================================================================
// v2 SCREEN 2 — Analyzing LIVE (face landmarks + token stream)
// ===================================================================
const V2_Analyzing = () => (
  <Phone bg="#1A0F18">
    <TopBar
      left={<button className="btn-ghost" style={{padding:0,color:'#fff'}}><Chevron/></button>}
      title={<AIChip dark>AI · ANALYZING</AIChip>}
      right={<span style={{fontFamily:'var(--mono)', fontSize:11, color:'rgba(255,255,255,.6)'}}>22s</span>}
    />

    <div style={{padding:'18px 24px 0'}}>
      <div style={{fontFamily:'var(--display)', fontWeight:500, fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--coral)'}}>STEP 3 / 5</div>
      <h2 style={{fontFamily:'var(--display)', fontWeight:700, fontSize:32, lineHeight:.95, letterSpacing:'-.03em', color:'#fff', margin:'10px 0 0'}}>
        AI가 표정을<br/>읽는 중<span style={{fontFamily:'var(--serif)',fontStyle:'italic',color:'var(--peach)'}}>...</span>
      </h2>
    </div>

    {/* face with wire */}
    <div style={{padding:'18px 24px 0', display:'flex', justifyContent:'center'}}>
      <div style={{position:'relative', width:280, height:340, borderRadius:24, overflow:'hidden'}}>
        <div className="ph-img" data-label="" style={{position:'absolute', inset:0, filter:'brightness(.7) saturate(.6)'}}/>
        <FaceWire color="#fff" accent="#FF6B8A"/>
        {/* scanning line */}
        <div className="pulse" style={{position:'absolute', left:0, right:0, top:'52%', height:1.5, background:'linear-gradient(90deg, transparent, #FF6B8A, transparent)', boxShadow:'0 0 14px #FF6B8A'}}/>
        {/* measurement labels floating */}
        <div style={{position:'absolute', top:18, left:14, fontFamily:'var(--mono)', fontSize:9, letterSpacing:'.1em', color:'#FFB07A'}}>BROW · 92.4</div>
        <div style={{position:'absolute', top:18, right:14, fontFamily:'var(--mono)', fontSize:9, letterSpacing:'.1em', color:'#FFB07A'}}>EYE.R · 88.7</div>
        <div style={{position:'absolute', bottom:18, right:14, fontFamily:'var(--mono)', fontSize:9, letterSpacing:'.1em', color:'#FFB07A'}}>JAW · 84.1</div>
        <div style={{position:'absolute', bottom:18, left:14, fontFamily:'var(--mono)', fontSize:9, letterSpacing:'.1em', color:'#FFB07A'}}>SMILE · +.12</div>
      </div>
    </div>

    {/* token stream + steps */}
    <div style={{padding:'22px 24px 0'}}>
      <div style={{background:'rgba(255,255,255,.06)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,.1)', borderRadius:14, padding:'14px 16px'}}>
        <div style={{fontFamily:'var(--display)', fontWeight:600, fontSize:10, letterSpacing:'.22em', color:'rgba(255,255,255,.55)', marginBottom:10}}>AI · THINKING</div>
        <div style={{fontFamily:'var(--mono)', fontSize:11, lineHeight:1.7, color:'rgba(255,255,255,.85)'}}>
          <div style={{opacity:.45}}><span style={{color:'var(--ok)'}}>✓ </span>얼굴 인식 (210ms)</div>
          <div style={{opacity:.45}}><span style={{color:'var(--ok)'}}>✓ </span>비율 분석 — 황금비 0.94</div>
          <div><span style={{color:'var(--coral)'}}>▸ </span>표정 추정 — confidence 0.85<span className="pulse" style={{display:'inline-block', width:7, height:12, marginLeft:2, verticalAlign:'middle', background:'var(--coral)'}}/></div>
          <div style={{opacity:.25}}>· 매력 임베딩 벡터 생성</div>
          <div style={{opacity:.25}}>· 매칭 후보 인덱싱</div>
        </div>
      </div>

      <div style={{display:'flex', alignItems:'center', gap:8, marginTop:14, fontFamily:'var(--mono)', fontSize:10, color:'rgba(255,255,255,.4)', letterSpacing:'.1em'}}>
        <span style={{flex:1, height:2, background:'rgba(255,255,255,.08)', borderRadius:1, overflow:'hidden'}}>
          <span style={{display:'block', height:'100%', width:'62%', background:'linear-gradient(90deg,#FFB07A,#FF5A78)'}}/>
        </span>
        <span>62%</span>
      </div>
    </div>
  </Phone>
);

// ===================================================================
// v2 SCREEN 3 — Score (with wire overlay + AI note)
// ===================================================================
const V2_Score = () => (
  <Phone bg="#F7F3EE">
    <TopBar
      left={<button className="btn-ghost" style={{padding:0,color:'var(--plum)'}}><Chevron/></button>}
      title={<AIChip>AI · RESULT</AIChip>}
      right={<button className="btn-ghost" style={{padding:0,color:'var(--plum)',fontSize:18}}>↗</button>}
    />

    <div style={{padding:'14px 24px 0'}}>
      {/* photo + wire small inline */}
      <div style={{display:'flex', alignItems:'flex-end', gap:14}}>
        <div style={{width:108, height:140, borderRadius:14, overflow:'hidden', position:'relative', flexShrink:0}}>
          <div className="ph-img" data-label="" style={{position:'absolute', inset:0, filter:'brightness(.85)'}}/>
          <FaceWire color="#fff" accent="var(--coral)"/>
        </div>
        <div style={{flex:1}}>
          <div style={{fontFamily:'var(--display)', fontWeight:500, fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--coral)'}}>YOUR LOOK SCORE</div>
          <div className="countin tabular" style={{fontFamily:'var(--display)', fontWeight:700, fontSize:132, lineHeight:.85, letterSpacing:'-.07em', color:'var(--plum)', marginTop:4}}>87</div>
        </div>
      </div>

      <div style={{display:'flex', alignItems:'baseline', gap:12, marginTop:10}}>
        <div style={{fontFamily:'var(--serif)', fontStyle:'italic', fontSize:30, color:'var(--coral)', lineHeight:1}}>top 12%</div>
        <div style={{fontFamily:'var(--display)', fontWeight:600, fontSize:12, letterSpacing:'.1em', color:'var(--plum-2)'}}>· A 등급</div>
        <div style={{marginLeft:'auto'}}><AIChip>신뢰 96%</AIChip></div>
      </div>
    </div>

    {/* AI note — what AI noticed */}
    <div style={{padding:'18px 24px 0'}}>
      <AINote tag="AI · NOTED">
        “Strong jaw line and balanced brow position. The smile asymmetry is your charm — keep it.”
      </AINote>
    </div>

    {/* three facts (compact) */}
    <div style={{padding:'14px 24px 0'}}>
      <div style={{borderTop:'1px solid var(--line)'}}>
        {[
          ['얼굴 비율',   '상위 5%',  '92'],
          ['표정 · 분위기','상위 18%','85'],
          ['스타일링',    '상위 22%','84'],
        ].map(([k,sub,num])=>(
          <div key={k} style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 0', borderBottom:'1px solid var(--line)'}}>
            <div>
              <div style={{fontFamily:'Pretendard', fontWeight:600, fontSize:14, color:'var(--plum)'}}>{k}</div>
              <div style={{fontFamily:'var(--display)', fontWeight:500, fontSize:10, letterSpacing:'.14em', color:'#9a8674', marginTop:2}}>{sub}</div>
            </div>
            <div className="tabular" style={{fontFamily:'var(--display)', fontWeight:700, fontSize:28, color:'var(--plum)', letterSpacing:'-.03em'}}>{num}</div>
          </div>
        ))}
      </div>
    </div>

    <div style={{position:'absolute', left:24, right:24, bottom:28}}>
      <button className="btn-primary" style={{fontFamily:'var(--display)', fontWeight:600, fontSize:16, letterSpacing:'-.01em', borderRadius:20, height:58}}>
        다음 · 스펙으로 매력 부스트
        <Chevron d="right"/>
      </button>
    </div>
  </Phone>
);

// ===================================================================
// v2 SCREEN 4 — Swipe (radar chip + AI reasoning peek)
// ===================================================================
const V2_Swipe = () => {
  const [x, setX] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const [showWhy, setShowWhy] = React.useState(false);
  const startRef = React.useRef({x:0, ox:0});
  const onDown = (e) => {
    if (showWhy) return;
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    startRef.current = { x:cx, ox:x };
    setDragging(true);
  };
  const onMove = (e) => {
    if(!dragging) return;
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    setX(startRef.current.ox + (cx - startRef.current.x));
  };
  const onUp = () => {
    setDragging(false);
    if (Math.abs(x) > 90) { setX(x > 0 ? 600 : -600); setTimeout(()=>setX(0), 280); }
    else setX(0);
  };
  React.useEffect(()=>{
    if(!dragging) return;
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return ()=>{ window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  });

  const rot = x * 0.06;
  const likeOp = Math.max(0, Math.min(1, x/80));
  const passOp = Math.max(0, Math.min(1, -x/80));

  return (
    <Phone bg="#1A0F18">
      <div style={{position:'absolute', inset:0, padding:'52px 16px 16px', display:'flex', flexDirection:'column'}}>
        {/* story-bar at top */}
        <div style={{display:'flex', gap:4, padding:'0 6px'}}>
          {[1,1,0,0,0].map((on,i)=>(
            <span key={i} style={{flex:1, height:3, borderRadius:2, background: on?'#fff':'rgba(255,255,255,.25)'}}/>
          ))}
        </div>

        {/* top mini chrome */}
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 6px 0'}}>
          <PulseMark size={20} color="#fff" dot="#FFB07A"/>
          <AIChip dark>AI · 14 MATCHED</AIChip>
          <span style={{width:20,height:20,color:'#fff',display:'flex',alignItems:'center'}}>
            <svg viewBox="0 0 20 20" fill="none"><circle cx="3" cy="10" r="1.5" fill="#fff"/><circle cx="10" cy="10" r="1.5" fill="#fff"/><circle cx="17" cy="10" r="1.5" fill="#fff"/></svg>
          </span>
        </div>

        {/* card */}
        <div
          onMouseDown={onDown}
          style={{
            flex:1, marginTop:14, borderRadius:24, overflow:'hidden', position:'relative',
            background:'#2D1F2A',
            transform:`translateX(${x}px) rotate(${rot}deg)`,
            transition: dragging ? 'none' : 'transform .28s cubic-bezier(.2,.7,.3,1)',
            cursor: showWhy?'default':(dragging?'grabbing':'grab'), userSelect:'none',
            boxShadow:'0 20px 60px rgba(0,0,0,.4)'
          }}
        >
          <div className="ph-img" data-label="PHOTO" style={{position:'absolute', inset:0, borderRadius:24, filter:'brightness(.85)'}}/>
          <FaceWire color="#fff" accent="#FFB07A"/>

          {/* like/pass overlays */}
          <div style={{position:'absolute', top:60, left:24, fontFamily:'var(--serif)', fontStyle:'italic', fontSize:72, color:'#fff', lineHeight:1, transform:'rotate(-10deg)', opacity:likeOp, textShadow:'0 4px 30px rgba(0,0,0,.5)'}}>yes</div>
          <div style={{position:'absolute', top:60, right:24, fontFamily:'var(--serif)', fontStyle:'italic', fontSize:72, color:'#fff', lineHeight:1, transform:'rotate(10deg)', opacity:passOp, textShadow:'0 4px 30px rgba(0,0,0,.5)'}}>no</div>

          {/* TR scores stacked */}
          <div style={{position:'absolute', top:18, right:18, display:'flex', flexDirection:'column', gap:6, alignItems:'flex-end'}}>
            <span style={{padding:'5px 10px', borderRadius:999, background:'rgba(0,0,0,.55)', backdropFilter:'blur(10px)', color:'#fff', fontFamily:'var(--display)', fontWeight:600, fontSize:11, letterSpacing:'.08em'}}>91 · S</span>
            <span style={{padding:'5px 10px', borderRadius:999, background:'rgba(63,185,132,.92)', color:'#fff', fontFamily:'var(--display)', fontWeight:700, fontSize:11, letterSpacing:'.06em'}}>AI · FIT 96</span>
          </div>

          {/* TL: live radar mini */}
          <div style={{position:'absolute', top:14, left:14, background:'rgba(0,0,0,.4)', backdropFilter:'blur(10px)', borderRadius:14, padding:6}}>
            <Radar size={76} values={[.91,.78,.96,.72,.84,.88]} labels={['','','','','','']} dark/>
          </div>

          {/* bottom info */}
          <div style={{position:'absolute', left:0, right:0, bottom:0, padding:'80px 22px 22px', background:'linear-gradient(180deg, transparent 0%, rgba(0,0,0,.7) 60%, rgba(0,0,0,.88) 100%)', color:'#fff'}}>
            <div style={{fontFamily:'var(--display)', fontWeight:500, fontSize:11, letterSpacing:'.22em', color:'rgba(255,255,255,.7)', textTransform:'uppercase'}}>SEOUL · GANGNAM</div>
            <div style={{display:'flex', alignItems:'baseline', gap:8, marginTop:6}}>
              <span style={{fontFamily:'var(--display)', fontWeight:700, fontSize:46, lineHeight:.95, letterSpacing:'-.04em'}}>지윤</span>
              <span style={{fontFamily:'var(--serif)', fontStyle:'italic', fontSize:34, color:'#FFB07A', lineHeight:1}}>, 27</span>
              <button onClick={()=>setShowWhy(true)} style={{marginLeft:'auto', padding:'6px 12px', borderRadius:999, background:'rgba(255,255,255,.14)', border:'1px solid rgba(255,255,255,.22)', color:'#fff', cursor:'pointer', fontFamily:'var(--display)', fontWeight:600, fontSize:10, letterSpacing:'.16em'}}>WHY · AI</button>
            </div>
            <div style={{display:'flex', gap:12, marginTop:8, fontFamily:'Pretendard', fontSize:12, opacity:.85}}>
              <span>마케터</span><span>·</span><span>165cm</span><span>·</span><span>5km</span>
            </div>
            <div style={{marginTop:10, fontFamily:'var(--serif)', fontStyle:'italic', fontSize:14, color:'rgba(255,255,255,.85)', lineHeight:1.5}}>
              “AI noted: you both rate calm weekends over loud nights.”
            </div>
          </div>

          {/* "why" peek sheet */}
          {showWhy && (
            <div onClick={()=>setShowWhy(false)} style={{position:'absolute', inset:0, background:'rgba(0,0,0,.6)', backdropFilter:'blur(6px)', display:'flex', alignItems:'flex-end'}}>
              <div onClick={e=>e.stopPropagation()} style={{width:'100%', background:'#fff', borderRadius:'22px 22px 0 0', padding:'22px 22px 28px', color:'var(--plum)'}}>
                <div style={{width:36,height:4,background:'var(--sand-2)',borderRadius:999,margin:'0 auto 14px'}}/>
                <AIChip>AI · REASONING</AIChip>
                <div style={{fontFamily:'var(--display)', fontWeight:700, fontSize:24, marginTop:10, letterSpacing:'-.02em'}}>호환도 96의 이유</div>
                {[
                  ['외모',  '같은 점수대 ±5',  92],
                  ['취향',  '카페·러닝·클래식 3개 겹침',  88],
                  ['시간대','금·토 활동 패턴 일치',  84],
                  ['거리',  '5km 이내',  96],
                ].map(([k,d,v])=>(
                  <div key={k} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 0',borderTop:'1px solid var(--line)',marginTop:10}}>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,fontWeight:600}}>{k}</div>
                      <div style={{fontSize:11,color:'#9a8674'}}>{d}</div>
                    </div>
                    <div className="tabular" style={{fontFamily:'var(--display)',fontWeight:700,fontSize:22,letterSpacing:'-.02em'}}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* action row */}
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'18px 14px 6px', marginTop:6}}>
          <button style={{width:54,height:54,borderRadius:'50%',background:'rgba(255,255,255,.08)',border:'1px solid rgba(255,255,255,.18)',color:'#fff',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          <button style={{height:54,padding:'0 26px',borderRadius:999,background:'#fff',color:'var(--plum)',border:0,cursor:'pointer',fontFamily:'var(--display)',fontWeight:700,fontSize:14,letterSpacing:'-.01em',display:'flex',alignItems:'center',gap:8}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--coral)"><path d="M12 21s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.5-7 10-7 10z"/></svg>
            좋아요
          </button>
          <button style={{width:54,height:54,borderRadius:'50%',background:'rgba(255,255,255,.08)',border:'1px solid rgba(255,255,255,.18)',color:'var(--gold)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22}}>✦</button>
        </div>
      </div>
    </Phone>
  );
};

// ===================================================================
// v2 SCREEN 5 — Why this match (AI reasoning detail)
// ===================================================================
const V2_WhyMatch = () => (
  <Phone bg="#F7F3EE">
    <TopBar
      left={<button className="btn-ghost" style={{padding:0,color:'var(--plum)'}}><Chevron/></button>}
      title={<AIChip>AI · REASONING</AIChip>}
    />

    <div style={{padding:'14px 24px 0'}}>
      <div style={{fontFamily:'var(--display)', fontWeight:500, fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--coral)'}}>WHY THIS MATCH</div>
      <h2 style={{fontFamily:'var(--display)', fontWeight:700, fontSize:34, lineHeight:.95, letterSpacing:'-.04em', color:'var(--plum)', margin:'10px 0 0'}}>
        AI가 <span style={{fontFamily:'var(--serif)',fontStyle:'italic',fontWeight:400,color:'var(--coral)'}}>96</span>점을<br/>매긴 이유
      </h2>
    </div>

    {/* radar */}
    <div style={{padding:'14px 24px 0', display:'flex', justifyContent:'center'}}>
      <Radar size={230}/>
    </div>

    {/* reasoning list */}
    <div style={{padding:'8px 24px 0'}}>
      <AINote tag="AI · TOP REASON">
        “Same Saturday rhythm: cafés before noon, no late-night clubs. That's a rare 88-percentile overlap in Seoul.”
      </AINote>
    </div>

    <div style={{padding:'12px 24px 0', display:'flex', flexDirection:'column', gap:8}}>
      {[
        ['외모 호환',  '두 분 모두 A 등급', 92, 'var(--coral)'],
        ['생활 리듬',  '카페·러닝·클래식', 88, 'var(--peach)'],
        ['시간대',     '주말 오전 활동',     84, 'var(--gold)'],
        ['거리',       '5km · 같은 권역',     96, 'var(--ok)'],
      ].map(([k,d,v,c])=>(
        <div key={k} style={{background:'#fff', borderRadius:12, padding:'12px 14px', border:'1px solid var(--line)', display:'flex', alignItems:'center', gap:12}}>
          <div style={{width:6, height:36, borderRadius:3, background:c, flexShrink:0}}/>
          <div style={{flex:1}}>
            <div style={{fontSize:13, fontWeight:600, color:'var(--plum)'}}>{k}</div>
            <div style={{fontSize:11, color:'#9a8674'}}>{d}</div>
          </div>
          <div className="tabular" style={{fontFamily:'var(--display)', fontWeight:700, fontSize:22, color:'var(--plum)', letterSpacing:'-.02em'}}>{v}</div>
        </div>
      ))}
    </div>

    <div style={{position:'absolute', left:24, right:24, bottom:28}}>
      <button className="btn-primary" style={{height:56, fontFamily:'var(--display)', fontWeight:600, fontSize:15, borderRadius:18}}>
        지윤님에게 좋아요 보내기
      </button>
    </div>
  </Phone>
);

// ===================================================================
// v2 SCREEN 6 — Match moment (AI authored)
// ===================================================================
const V2_Match = () => (
  <Phone bg="#F7F3EE">
    <TopBar
      left={<button className="btn-ghost" style={{padding:0,color:'var(--plum)'}}><Chevron/></button>}
      title={<AIChip>AI · MATCHED</AIChip>}
    />

    <div style={{padding:'24px 28px 0'}}>
      <div style={{fontFamily:'var(--display)', fontWeight:500, fontSize:11, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--coral)'}}>FIT · 96</div>

      <h1 style={{fontFamily:'var(--display)', fontWeight:700, fontSize:60, lineHeight:.92, letterSpacing:'-.05em', color:'var(--plum)', margin:'14px 0 0'}}>
        AI가 <span style={{fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:400}}>이어준</span><br/>
        오늘의 한 사람.
      </h1>
    </div>

    {/* two photos with wire */}
    <div style={{padding:'24px 28px 0'}}>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
        <div>
          <div style={{height:170, borderRadius:14, position:'relative', overflow:'hidden'}}>
            <div className="ph-img" data-label="YOU" style={{position:'absolute',inset:0,filter:'brightness(.9)'}}/>
            <FaceWire color="#fff" accent="var(--coral)"/>
            <span style={{position:'absolute',left:8,bottom:8,padding:'3px 8px',borderRadius:999,background:'rgba(255,255,255,.92)',fontFamily:'var(--display)',fontWeight:700,fontSize:10,letterSpacing:'.06em',color:'var(--plum)'}}>89</span>
          </div>
          <div style={{fontFamily:'var(--display)', fontWeight:600, fontSize:10, letterSpacing:'.18em', color:'#9a8674', marginTop:6, textTransform:'uppercase'}}>You</div>
        </div>
        <div style={{marginTop:18}}>
          <div style={{height:170, borderRadius:14, position:'relative', overflow:'hidden'}}>
            <div className="ph-img" data-label="JIYOON" style={{position:'absolute',inset:0,filter:'brightness(.9)'}}/>
            <FaceWire color="#fff" accent="var(--coral)"/>
            <span style={{position:'absolute',left:8,bottom:8,padding:'3px 8px',borderRadius:999,background:'rgba(255,255,255,.92)',fontFamily:'var(--display)',fontWeight:700,fontSize:10,letterSpacing:'.06em',color:'var(--plum)'}}>91 · S</span>
          </div>
          <div style={{fontFamily:'var(--display)', fontWeight:600, fontSize:10, letterSpacing:'.18em', color:'#9a8674', marginTop:6, textTransform:'uppercase'}}>지윤 · 27</div>
        </div>
      </div>
    </div>

    {/* AI note */}
    <div style={{padding:'16px 28px 0'}}>
      <AINote tag="AI · OPENER">
        “두 분 다 토요일 오전 카페를 좋아하시네요. 첫 메시지는 거기서 시작해보세요.”
      </AINote>
    </div>

    <div style={{position:'absolute', left:24, right:24, bottom:28, display:'flex', flexDirection:'column', gap:8}}>
      <button className="btn-primary" style={{height:56, fontFamily:'var(--display)', fontWeight:600, fontSize:15, borderRadius:18}}>
        AI가 추천한 첫 메시지 보내기
      </button>
      <button style={{height:46, borderRadius:16, background:'transparent', color:'var(--plum-2)', border:'1px solid var(--line-2)', cursor:'pointer', fontFamily:'var(--display)', fontWeight:500, fontSize:13}}>
        매칭 이유 자세히 보기
      </button>
    </div>
  </Phone>
);

Object.assign(window, { PulseMark, AIChip, FaceWire, Radar, AINote, TokenStream, V2_Brand, V2_Home, V2_Analyzing, V2_Score, V2_Swipe, V2_WhyMatch, V2_Match });