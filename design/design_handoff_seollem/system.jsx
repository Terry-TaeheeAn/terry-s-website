/* system.jsx — component & motion + icons spec sheets */

// ---------- 1) Buttons ----------
const ButtonSpecs = () => (
  <div style={{padding:32, fontFamily:'Pretendard', display:'flex', flexDirection:'column', gap:18}}>
    <div>
      <div className="doc-eyebrow">05 · Buttons</div>
      <div className="doc-h" style={{marginTop:8}}>버튼</div>
    </div>
    <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16}}>
      {[
        {label:'Primary CTA', node:<button className="btn-primary">사진 업로드</button>, spec:'56px · 18r · gradient + shadow'},
        {label:'Secondary',  node:<button className="btn-secondary">건너뛰기</button>, spec:'52px · 16r · 1px line'},
        {label:'Pill action',node:<button style={{height:44,padding:'0 18px',borderRadius:14,background:'var(--coral)',color:'#fff',border:0,fontWeight:600,fontSize:14,fontFamily:'inherit',cursor:'pointer'}}>부스트하기</button>, spec:'44px · 14r · solid coral'},
        {label:'Text',       node:<button className="btn-ghost" style={{color:'var(--coral)'}}>나중에 할게요</button>, spec:'no chrome · coral'},
      ].map(b=>(
        <div key={b.label} style={{background:'#fff', borderRadius:16, padding:18, border:'1px solid var(--line)', display:'flex', flexDirection:'column', gap:14}}>
          <div className="doc-eyebrow">{b.label}</div>
          {b.node}
          <div style={{fontSize:11, fontFamily:'var(--mono)', color:'#9a8674'}}>{b.spec}</div>
        </div>
      ))}
    </div>

    {/* states */}
    <div style={{background:'#fff', borderRadius:16, padding:20, border:'1px solid var(--line)'}}>
      <div className="doc-eyebrow" style={{marginBottom:14}}>Primary states</div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14}}>
        {[
          ['Default','linear-gradient(180deg,#FF6B8A,#FF5A78,#F2486A)', '#fff', 1],
          ['Hover',  'linear-gradient(180deg,#FF7A96,#FF6485,#F45577)', '#fff', 1],
          ['Pressed','linear-gradient(180deg,#E84B6B,#D43559,#BD2A4D)', '#fff', 1],
          ['Disabled','#F0E0D6', '#A39286', .9],
        ].map(([k,bg,fg,o])=>(
          <div key={k} style={{display:'flex',flexDirection:'column',gap:8}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:52,borderRadius:16,background:bg,color:fg,fontWeight:600,fontSize:15,opacity:o,boxShadow:k==='Default'?'var(--shadow-lift)':'none'}}>다음으로</div>
            <div style={{fontSize:11, fontFamily:'var(--mono)', color:'#9a8674'}}>{k}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ---------- 2) Inputs ----------
const InputSpecs = () => (
  <div style={{padding:32, fontFamily:'Pretendard', display:'flex', flexDirection:'column', gap:18}}>
    <div>
      <div className="doc-eyebrow">06 · Inputs & Selects</div>
      <div className="doc-h" style={{marginTop:8}}>입력 · 선택</div>
    </div>
    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
      <div style={{background:'#fff',borderRadius:16,padding:20,border:'1px solid var(--line)',display:'flex',flexDirection:'column',gap:14}}>
        <div className="doc-eyebrow">Text field</div>
        <label style={{display:'flex',flexDirection:'column',gap:6,fontSize:12,color:'var(--plum-2)'}}>
          닉네임
          <input defaultValue="설레임" style={{height:52,borderRadius:14,border:'1px solid var(--line-2)',padding:'0 16px',fontSize:15,fontFamily:'inherit',color:'var(--plum)',background:'#fff',outline:'none'}}/>
        </label>
        <label style={{display:'flex',flexDirection:'column',gap:6,fontSize:12,color:'var(--plum-2)'}}>
          포커스 · 입력 중
          <input defaultValue="안녕" style={{height:52,borderRadius:14,border:'1.5px solid var(--coral)',padding:'0 16px',fontSize:15,fontFamily:'inherit',color:'var(--plum)',background:'#FFF8F5',outline:'none',boxShadow:'0 0 0 4px rgba(255,90,120,.12)'}}/>
        </label>
        <label style={{display:'flex',flexDirection:'column',gap:6,fontSize:12,color:'var(--coral-deep)'}}>
          에러
          <input defaultValue="abc" style={{height:52,borderRadius:14,border:'1.5px solid var(--coral-deep)',padding:'0 16px',fontSize:15,fontFamily:'inherit',color:'var(--coral-deep)',background:'#fff',outline:'none'}}/>
          <span style={{fontSize:11}}>한글 2자 이상 입력해주세요</span>
        </label>
      </div>

      <div style={{background:'#fff',borderRadius:16,padding:20,border:'1px solid var(--line)',display:'flex',flexDirection:'column',gap:10}}>
        <div className="doc-eyebrow">Option buttons</div>
        {[
          ['5,000 – 7,000만원', false],
          ['7,000 – 1억', true],
          ['1억 – 2억', false],
        ].map(([k, sel])=>(
          <button key={k} style={{
            display:'flex',alignItems:'center',justifyContent:'space-between',
            height:54, padding:'0 16px', borderRadius:14,
            background: sel?'#FFF1EC':'#fff',
            border: sel?'1.5px solid var(--coral)':'1px solid var(--line-2)',
            color:'var(--plum)', fontFamily:'inherit', fontWeight: sel?600:500, fontSize:14, cursor:'pointer'
          }}>
            {k}
            <span style={{width:20,height:20,borderRadius:'50%',background:sel?'var(--coral)':'transparent',border:sel?'none':'1.5px solid var(--line-2)',display:'flex',alignItems:'center',justifyContent:'center'}}>
              {sel && <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M3 8l3 3 7-7" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </span>
          </button>
        ))}
      </div>
    </div>
  </div>
);

// ---------- 3) Cards / Score / Progress ----------
const SurfaceSpecs = () => (
  <div style={{padding:32, fontFamily:'Pretendard', display:'flex', flexDirection:'column', gap:18}}>
    <div>
      <div className="doc-eyebrow">07 · Cards · Score · Progress</div>
      <div className="doc-h" style={{marginTop:8}}>표면 · 점수 · 진행</div>
    </div>

    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:16}}>
      <div style={{background:'var(--cream)',borderRadius:16,padding:20,border:'1px solid var(--line)'}}>
        <div className="doc-eyebrow">Card · default</div>
        <div style={{height:90, marginTop:10, borderRadius:14, background:'#fff', boxShadow:'var(--shadow-card)'}}/>
        <div style={{fontSize:11, fontFamily:'var(--mono)', color:'#9a8674', marginTop:10}}>
          radius 14 · 1px var(--line) · shadow-card
        </div>
      </div>
      <div style={{background:'var(--cream)',borderRadius:16,padding:20,border:'1px solid var(--line)'}}>
        <div className="doc-eyebrow">Card · elevated</div>
        <div style={{height:90, marginTop:10, borderRadius:22, background:'#fff', boxShadow:'0 12px 40px rgba(45,31,42,.18), 0 2px 6px rgba(45,31,42,.08)'}}/>
        <div style={{fontSize:11, fontFamily:'var(--mono)', color:'#9a8674', marginTop:10}}>radius 22 · floating · 매칭 카드</div>
      </div>
      <div style={{background:'var(--cream)',borderRadius:16,padding:20,border:'1px solid var(--line)'}}>
        <div className="doc-eyebrow">Card · dark / premium</div>
        <div style={{height:90, marginTop:10, borderRadius:18, background:'linear-gradient(135deg,#2D1F2A,#6B2E4E)'}}/>
        <div style={{fontSize:11, fontFamily:'var(--mono)', color:'#9a8674', marginTop:10}}>radius 18 · plum→aubergine · CTA blocks</div>
      </div>
    </div>

    {/* score display */}
    <div style={{display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:16}}>
      <div style={{background:'#fff',borderRadius:16,padding:20,border:'1px solid var(--line)'}}>
        <div className="doc-eyebrow">Score display</div>
        <div style={{display:'flex',alignItems:'baseline',gap:20,marginTop:14}}>
          <span className="ring-num" style={{fontSize:128, color:'var(--plum)'}}>87</span>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            <span className="pill" style={{background:'var(--plum)',color:'#fff'}}>상위 12%</span>
            <span className="pill" style={{background:'rgba(201,163,107,.18)',color:'var(--aubergine)'}}>A 등급</span>
          </div>
        </div>
        <div style={{fontSize:11, fontFamily:'var(--mono)', color:'#9a8674', marginTop:14}}>
          Instrument Serif Italic · 128px · letter-spacing -.04em · count-up animation
        </div>
      </div>

      <div style={{background:'#fff',borderRadius:16,padding:20,border:'1px solid var(--line)',display:'flex',flexDirection:'column',gap:14}}>
        <div className="doc-eyebrow">Progress</div>
        <div className="pbar"><i style={{width:'40%'}}/></div>
        <div className="pbar" style={{height:6}}><i style={{width:'72%'}}/></div>
        <div style={{display:'flex',justifyContent:'space-between',fontSize:11,fontFamily:'var(--mono)',color:'#9a8674'}}>
          <span>height 6 · 8</span><span>radius pill</span><span>peach→coral fill</span>
        </div>

        <div className="doc-eyebrow" style={{marginTop:6}}>Pills</div>
        <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
          <span className="pill" style={{background:'var(--coral)',color:'#fff'}}>매칭</span>
          <span className="pill" style={{background:'var(--plum)',color:'#fff'}}>상위 12%</span>
          <span className="pill" style={{background:'rgba(63,185,132,.14)',color:'var(--ok)'}}>호환 96%</span>
          <span className="pill" style={{background:'rgba(201,163,107,.18)',color:'var(--aubergine)'}}>S 등급</span>
          <span className="pill" style={{background:'var(--sand)',color:'var(--plum)'}}>비공개</span>
        </div>
      </div>
    </div>

    {/* toast + modal */}
    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
      <div style={{background:'var(--cream)',borderRadius:16,padding:20,border:'1px solid var(--line)'}}>
        <div className="doc-eyebrow">Toast</div>
        <div style={{marginTop:14, display:'flex',flexDirection:'column',gap:10}}>
          <div style={{padding:'12px 16px', background:'var(--plum)', color:'#fff', borderRadius:14, fontSize:13, display:'flex', alignItems:'center', gap:10, boxShadow:'var(--shadow-card)'}}>
            <span style={{color:'var(--ok)'}}>●</span> 사진이 안전하게 업로드 되었어요
          </div>
          <div style={{padding:'12px 16px', background:'#fff', color:'var(--coral-deep)', borderRadius:14, fontSize:13, border:'1px solid rgba(224,59,94,.22)', display:'flex', alignItems:'center', gap:10}}>
            <span>⚠</span> 얼굴이 잘 보이지 않아요. 다시 시도해주세요
          </div>
        </div>
      </div>
      <div style={{background:'var(--cream)',borderRadius:16,padding:20,border:'1px solid var(--line)'}}>
        <div className="doc-eyebrow">Modal · sheet</div>
        <div style={{marginTop:14, background:'#fff', borderRadius:22, padding:'18px 18px 16px', boxShadow:'0 12px 40px rgba(45,31,42,.18)'}}>
          <div style={{width:36, height:4, background:'var(--sand-2)', borderRadius:999, margin:'0 auto 12px'}}/>
          <div style={{fontSize:16, fontWeight:700, color:'var(--plum)'}}>매칭을 종료할까요?</div>
          <div style={{fontSize:13, color:'var(--plum-2)', marginTop:6}}>지금까지 받은 매칭은 보관돼요.</div>
          <div style={{display:'flex',gap:8,marginTop:14}}>
            <button className="btn-secondary" style={{height:44}}>취소</button>
            <button className="btn-primary" style={{height:44,fontSize:14}}>종료</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ---------- 4) Motion + interactions ----------
const MotionSpecs = () => (
  <div style={{padding:32, fontFamily:'Pretendard', display:'flex', flexDirection:'column', gap:18}}>
    <div>
      <div className="doc-eyebrow">08 · Motion</div>
      <div className="doc-h" style={{marginTop:8}}>모션 · 인터랙션</div>
      <div className="doc-body" style={{marginTop:8, maxWidth:560}}>모든 전환은 짧고 차분하게. 무거운 spring보다 부드러운 cubic-bezier(.2,.7,.3,1).</div>
    </div>

    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
      {[
        {t:'점수 카운트업', d:'0 → 87 · 1.2s · 가속 후 감속. 마지막 5점은 0.4s에 천천히. 살짝 스케일 1.05→1.0.', tag:'animate-count'},
        {t:'스와이프 물리감', d:'드래그 ±90px 임계. 회전 0.06×deltaX. snap-off 280ms. LIKE/NOPE 라벨은 opacity 0→1 over 80px.', tag:'swipe'},
        {t:'화면 전환', d:'iOS push: 좌→우 슬라이드 320ms, 이전 화면은 평행이동 −30%. 모달은 sheet up 360ms + scrim 0→.5.', tag:'navigation'},
        {t:'매칭 성공 이펙트', d:'하트 14개가 0.6–1.8s 사이에 등장 / 확대 / 페이드. 두 아바타는 반대 방향에서 모여 100ms 겹침. haptic medium.', tag:'celebrate'},
        {t:'CTA 강조', d:'프라이머리 버튼은 페이지 진입 후 600ms 시점에 shadow가 한 번 6→14→6으로 호흡. 반복 X.', tag:'attention'},
        {t:'분석 로딩', d:'얼굴 둘레 원 3개가 0.35s 간격으로 확대-페이드. 가로 스캔라인은 1.6s ease-in-out 왕복.', tag:'loading'},
      ].map(m=>(
        <div key={m.t} style={{background:'#fff',borderRadius:16,padding:18,border:'1px solid var(--line)'}}>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
            <span style={{fontSize:15,fontWeight:600,color:'var(--plum)'}}>{m.t}</span>
            <span className="pill" style={{marginLeft:'auto',background:'var(--sand)',color:'var(--plum-2)',fontSize:10,fontFamily:'var(--mono)'}}>{m.tag}</span>
          </div>
          <div style={{fontSize:13,color:'var(--plum-2)',lineHeight:1.55}}>{m.d}</div>
        </div>
      ))}
    </div>

    {/* easing curves */}
    <div style={{background:'#fff',borderRadius:16,padding:20,border:'1px solid var(--line)'}}>
      <div className="doc-eyebrow" style={{marginBottom:10}}>Easing</div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, fontFamily:'var(--mono)', fontSize:11, color:'#6a5a4a'}}>
        <div><b style={{color:'var(--plum)'}}>standard</b><br/>cubic-bezier(.2,.7,.3,1) · 220ms</div>
        <div><b style={{color:'var(--plum)'}}>celebrate</b><br/>cubic-bezier(.34,1.56,.64,1) · 600ms</div>
        <div><b style={{color:'var(--plum)'}}>linear-progress</b><br/>linear · 28s</div>
      </div>
    </div>
  </div>
);

// ---------- 5) Icons ----------
const Ic = ({ icon, label }) => (
  <div style={{background:'#fff', borderRadius:14, border:'1px solid var(--line)', padding:'14px 10px 10px', display:'flex', flexDirection:'column', alignItems:'center', gap:8}}>
    <div style={{width:32, height:32, color:'var(--plum)', display:'flex', alignItems:'center', justifyContent:'center'}}>{icon}</div>
    <div style={{fontSize:11, color:'var(--plum-2)', textAlign:'center'}}>{label}</div>
  </div>
);
const SI = ({d, fill}) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill={fill||'none'} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>
);

const IconSet = () => (
  <div style={{padding:32, fontFamily:'Pretendard', display:'flex', flexDirection:'column', gap:18}}>
    <div>
      <div className="doc-eyebrow">09 · Icons</div>
      <div className="doc-h" style={{marginTop:8}}>아이콘 세트</div>
      <div className="doc-body" style={{marginTop:8, maxWidth:560}}>
        스타일: <b>24×24 그리드</b>, <b>1.6px stroke</b>, round join/cap, 외곽 선 + 채움 두 가지 변형. 디테일은 최소화하고 두께를 통일.
      </div>
    </div>
    <div style={{display:'grid', gridTemplateColumns:'repeat(8,1fr)', gap:10}}>
      <Ic label="heart-fill"      icon={<SI d="M12 21s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.5-7 10-7 10z" fill="currentColor"/>}/>
      <Ic label="heart"           icon={<SI d="M12 21s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.5-7 10-7 10z"/>}/>
      <Ic label="close · pass"    icon={<SI d="M6 6l12 12M18 6L6 18"/>}/>
      <Ic label="check"           icon={<SI d="M5 13l4 4L19 7"/>}/>
      <Ic label="star · grade"    icon={<SI d="M12 2l2.6 5.6L20 8.4l-4 4.1.9 5.7L12 15.6 7.1 18.2 8 12.5 4 8.4l5.4-.8L12 2z" fill="currentColor"/>}/>
      <Ic label="sparkle · ai"    icon={<SI d="M12 3l2 4 4-2-2 4 4 2-4 2 2 4-4-2-2 4-2-4-4 2 2-4-4-2 4-2-2-4 4 2z" fill="currentColor"/>}/>
      <Ic label="upload"          icon={<SI d="M12 16V5m0 0l-5 5m5-5l5 5M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"/>}/>
      <Ic label="camera"          icon={<SI d="M4 7h3l2-3h6l2 3h3v12H4V7z M12 16a3 3 0 100-6 3 3 0 000 6z"/>}/>
      <Ic label="profile"         icon={<SI d="M12 12a4 4 0 100-8 4 4 0 000 8zm-7 9a7 7 0 0114 0"/>}/>
      <Ic label="home"            icon={<SI d="M3 10l9-7 9 7v9a2 2 0 01-2 2h-4v-7H9v7H5a2 2 0 01-2-2v-9z"/>}/>
      <Ic label="menu"            icon={<SI d="M3 6h18M3 12h18M3 18h18"/>}/>
      <Ic label="list"            icon={<SI d="M4 6h16M4 12h16M4 18h10"/>}/>
      <Ic label="match · sync"    icon={<SI d="M9 9a6 6 0 1112 0M15 21a6 6 0 11-12 0M9 15l-4-4M15 9l4 4"/>}/>
      <Ic label="chat"            icon={<SI d="M21 11.5a8.4 8.4 0 01-9 8.5 8.4 8.4 0 01-8-8.5C4 7 7.6 3.5 12 3.5s9 3.5 9 8z"/>}/>
      <Ic label="verified"        icon={<SI d="M12 21l-7-7a5 5 0 010-7 5 5 0 017 0l0 0a5 5 0 017 0 5 5 0 010 7l-7 7z M9 11l3 3 5-5"/>}/>
      <Ic label="lock · privacy"  icon={<SI d="M5 9V7a7 7 0 0114 0v2 M4 9h16v11H4z M12 14v2"/>}/>
      <Ic label="analysis"        icon={<SI d="M3 12h18 M12 3v18 M5 5l14 14 M19 5L5 19"/>}/>
      <Ic label="trend · score"   icon={<SI d="M3 17l6-6 4 4 8-8 M14 7h7v7"/>}/>
      <Ic label="edit"            icon={<SI d="M3 21l3-1 12-12-2-2L4 18l-1 3z M14 6l4 4"/>}/>
      <Ic label="shine · result"  icon={<SI d="M12 2v3 M12 19v3 M2 12h3 M19 12h3 M5 5l2 2 M17 17l2 2 M5 19l2-2 M17 7l2-2"/>}/>
      <Ic label="location"        icon={<SI d="M21 12c0 5-9 9-9 9s-9-4-9-9a5 5 0 0110 0 5 5 0 0110 0z"/>}/>
      <Ic label="time"            icon={<SI d="M12 8v5l3 2 M3 12a9 9 0 1118 0 9 9 0 01-18 0z"/>}/>
      <Ic label="filter"          icon={<SI d="M4 4h6v6H4z M14 4h6v6h-6z M4 14h6v6H4z M14 14h6v6h-6z"/>}/>
      <Ic label="arrow-right"     icon={<SI d="M5 12h14 M13 6l6 6-6 6"/>}/>
    </div>
  </div>
);

Object.assign(window, { ButtonSpecs, InputSpecs, SurfaceSpecs, MotionSpecs, IconSet });
