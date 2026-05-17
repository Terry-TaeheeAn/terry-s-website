/* screens.jsx — 8 mobile screens (390x844) */

// ---------- Phone wrapper ----------
const Phone = ({ children, time='9:41', bg }) => (
  <div className="phone" style={bg?{background:bg}:undefined}>
    <div className="statusbar">
      <span>{time}</span>
      <div className="icons">
        <span style={{fontSize:11,fontWeight:600}}>●●●●</span>
        <span style={{fontSize:11}}>5G</span>
        <span style={{display:'inline-block',width:24,height:11,border:'1.4px solid currentColor',borderRadius:3,position:'relative'}}>
          <span style={{position:'absolute',inset:1.5,right:5,background:'currentColor',borderRadius:1}}/>
        </span>
      </div>
    </div>
    {children}
    <div className="home-ind"/>
  </div>
);

// ---------- shared bits ----------
const Logo = ({size=22, color='var(--plum)'}) => (
  <div style={{display:'flex',alignItems:'center',gap:8}}>
    <AuraMark size={size} />
    <span style={{fontFamily:'Pretendard',fontWeight:800,fontSize:size,lineHeight:1,color,letterSpacing:'-.06em'}}>설렘</span>
  </div>
);
const TopBar = ({ left, right, title }) => (
  <div style={{height:48, padding:'0 20px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
    <div style={{width:60, display:'flex', alignItems:'center'}}>{left}</div>
    <div style={{fontSize:15, fontWeight:600, color:'var(--plum)'}}>{title}</div>
    <div style={{width:60, display:'flex', justifyContent:'flex-end'}}>{right}</div>
  </div>
);
const Chevron = ({d='left'}) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{transform:d==='right'?'rotate(180deg)':'none'}}>
    <path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// =====================================================================
// SCREEN 1 — 홈/사진 업로드
// =====================================================================
const S1_Home = () => {
  const [dragOver, setDragOver] = React.useState(false);
  return (
    <Phone>
      <TopBar left={<Logo size={20}/>} right={
        <button className="btn-ghost" style={{padding:'6px 12px',fontSize:13,border:'1px solid var(--line-2)',borderRadius:999,background:'#fff'}}>로그인</button>
      }/>
      <div style={{padding:'24px 24px 0'}}>
        <div className="doc-eyebrow" style={{color:'var(--coral)'}}>AI · MATCH · 30 SEC</div>
        <h1 style={{fontSize:34, fontWeight:700, color:'var(--plum)', letterSpacing:'-.03em', lineHeight:1.12, margin:'10px 0 0'}}>
          사진 한 장으로<br/>
          <span style={{fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:400}}>당신의 매력</span>을<br/>
          숫자로 알려드릴게요.
        </h1>
        <p style={{fontSize:14, color:'var(--plum-2)', marginTop:14, lineHeight:1.55}}>
          AI가 외모와 스펙을 분석해 진짜 어울리는 사람만 매칭해드려요.
        </p>
      </div>

      {/* drop zone */}
      <div style={{padding:'22px 24px 0'}}>
        <div
          onMouseEnter={()=>setDragOver(true)} onMouseLeave={()=>setDragOver(false)}
          style={{
            position:'relative', height:300, borderRadius:24,
            background:dragOver?'linear-gradient(180deg,#FFF1EC,#FFE3D9)':'#FFF1EC',
            border:`2px dashed ${dragOver?'var(--coral)':'rgba(255,90,120,.45)'}`,
            display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:14,
            transition:'all .25s'
          }}>
          <div style={{width:72,height:72,borderRadius:'50%',background:'#fff',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 8px 20px rgba(255,90,120,.18)'}}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M12 16V5m0 0l-5 5m5-5l5 5" stroke="var(--coral)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="var(--coral)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:16,fontWeight:600,color:'var(--plum)'}}>얼굴이 잘 보이는 사진을 올려주세요</div>
            <div style={{fontSize:12,color:'var(--plum-2)',marginTop:4}}>드래그하거나 탭해서 선택 · JPG · PNG · 10MB</div>
          </div>
          <div style={{position:'absolute',top:14,left:14,display:'flex',gap:6}}>
            <span className="pill" style={{background:'#fff',color:'var(--plum-2)',fontSize:11,padding:'4px 8px'}}>🔒 비공개</span>
          </div>
        </div>
      </div>

      <div style={{padding:'18px 24px 0'}}>
        <button className="btn-primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          사진 업로드하고 분석 시작
        </button>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:6,marginTop:14,fontSize:12,color:'var(--plum-2)'}}>
          <span style={{display:'inline-flex',gap:-6}}>
            {['#FFB07A','#FF5A78','#6B2E4E'].map((c,i)=>(<span key={i} style={{width:18,height:18,borderRadius:'50%',background:c,border:'2px solid var(--cream)',marginLeft:i?-6:0}}/>))}
          </span>
          오늘까지 <b style={{color:'var(--plum)'}} className="tabular">78,492명</b>이 분석을 완료했어요
        </div>
      </div>
    </Phone>
  );
};

// =====================================================================
// SCREEN 2 — AI 분석 중
// =====================================================================
const S2_Analyzing = () => {
  const steps = [
    {k:'얼굴 인식',    s:'done'},
    {k:'얼굴 비율 분석', s:'done'},
    {k:'표정·분위기 분석', s:'active'},
    {k:'매력 요소 추출', s:'pending'},
    {k:'점수 산출',    s:'pending'},
  ];
  return (
    <Phone bg="linear-gradient(180deg,#FFF8F5 0%, #FFE9DF 100%)">
      <TopBar left={<button className="btn-ghost" style={{padding:0,color:'var(--plum)'}}><Chevron/></button>} title="AI 분석 중"/>
      {/* center face circle */}
      <div style={{padding:'10px 24px 0', display:'flex', flexDirection:'column', alignItems:'center'}}>
        <div style={{position:'relative', width:240, height:240, marginTop:18}}>
          {/* outer pulsing rings */}
          {[1,2,3].map(i=>(
            <div key={i} className="hpop" style={{position:'absolute',inset:0,borderRadius:'50%',border:'1.5px solid var(--coral)',animationDelay:`${i*0.35}s`}}/>
          ))}
          {/* photo */}
          <div className="ph-img" data-label="USER PHOTO" style={{position:'absolute', inset:30, borderRadius:'50%'}}/>
          {/* scan line */}
          <div style={{position:'absolute', inset:30, borderRadius:'50%', overflow:'hidden'}}>
            <div className="pulse" style={{position:'absolute', left:0, right:0, top:'50%', height:2, background:'linear-gradient(90deg,transparent,#FF5A78,transparent)', boxShadow:'0 0 10px #FF5A78'}}/>
          </div>
          {/* corner brackets */}
          {[{t:30,l:30},{t:30,r:30},{b:30,l:30},{b:30,r:30}].map((p,i)=>(
            <div key={i} style={{position:'absolute',width:22,height:22,...p,
              borderTop:p.t!==undefined?'2px solid var(--coral)':'none',
              borderBottom:p.b!==undefined?'2px solid var(--coral)':'none',
              borderLeft:p.l!==undefined?'2px solid var(--coral)':'none',
              borderRight:p.r!==undefined?'2px solid var(--coral)':'none'}}/>
          ))}
        </div>

        <div style={{marginTop:28, textAlign:'center'}}>
          <div className="doc-eyebrow" style={{color:'var(--coral)'}}>STEP 3 / 5</div>
          <div style={{fontFamily:'var(--serif)', fontStyle:'italic', fontSize:32, color:'var(--plum)', marginTop:8, lineHeight:1.1}}>당신의 매력을<br/>읽어내는 중</div>
        </div>
      </div>

      {/* steps */}
      <div style={{padding:'24px 24px 0'}}>
        <div style={{background:'#fff', borderRadius:18, padding:'14px 16px', boxShadow:'var(--shadow-card)'}}>
          {steps.map((st,i)=>(
            <div key={i} style={{display:'flex', alignItems:'center', gap:12, padding:'10px 0', borderTop:i?'1px solid var(--line)':'none'}}>
              <span style={{
                width:24,height:24,borderRadius:'50%',
                background: st.s==='done' ? 'var(--ok)' : st.s==='active' ? 'var(--coral)' : 'var(--sand-2)',
                display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:12,fontWeight:700,flexShrink:0
              }}>
                {st.s==='done'?'✓': st.s==='active'? <span className="pulse">●</span> : i+1}
              </span>
              <span style={{fontSize:14, fontWeight: st.s==='active'?600:500, color: st.s==='pending'?'#9a8674':'var(--plum)'}}>{st.k}</span>
              {st.s==='active' && <span style={{marginLeft:'auto',fontSize:11,color:'var(--coral)',fontFamily:'var(--mono)'}}>분석중...</span>}
            </div>
          ))}
        </div>
        <div style={{fontSize:11, color:'#9a8674', textAlign:'center', marginTop:12, fontFamily:'var(--mono)'}}>
          평균 28초 소요 · 사진은 분석 후 자동 삭제
        </div>
      </div>
    </Phone>
  );
};

// =====================================================================
// SCREEN 3 — 외모 점수 결과
// =====================================================================
const ScoreBar = ({ label, value, accent='var(--coral)' }) => (
  <div style={{display:'flex', flexDirection:'column', gap:6}}>
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
      <span style={{fontSize:13, color:'var(--plum-2)', fontWeight:500}}>{label}</span>
      <span style={{fontFamily:'var(--serif)', fontStyle:'italic', fontSize:20, color:'var(--plum)', lineHeight:1}} className="tabular">{value}</span>
    </div>
    <div className="pbar"><i style={{width:`${value}%`, background:accent}}/></div>
  </div>
);

const S3_LookScore = () => (
  <Phone>
    <TopBar left={<button className="btn-ghost" style={{padding:0,color:'var(--plum)'}}><Chevron/></button>} title="외모 점수"/>
    <div style={{padding:'18px 24px 0'}}>
      {/* big number */}
      <div style={{background:'linear-gradient(180deg,#fff 0%, #FFF1EC 100%)', borderRadius:24, padding:'28px 22px', border:'1px solid var(--line)', position:'relative', overflow:'hidden'}}>
        <div className="doc-eyebrow" style={{color:'var(--coral)'}}>YOUR LOOK SCORE</div>
        <div style={{display:'flex', alignItems:'baseline', gap:6, marginTop:10}}>
          <div className="ring-num countin" style={{fontSize:140, color:'var(--plum)'}}>87</div>
          <div style={{fontSize:24, color:'var(--plum-2)', fontWeight:500}}>/ 100</div>
        </div>
        <div style={{display:'flex',gap:8, marginTop:10, flexWrap:'wrap'}}>
          <span className="pill" style={{background:'var(--plum)',color:'#fff'}}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 5l2 5h6l2-5-3 2-2-4-2 4-3-2z" fill="var(--gold)"/></svg>
            상위 12%
          </span>
          <span className="pill" style={{background:'rgba(201,163,107,.18)', color:'var(--aubergine)'}}>A 등급</span>
          <span className="pill" style={{background:'#fff', color:'var(--plum-2)', border:'1px solid var(--line-2)'}}>표본 78,492</span>
        </div>
        {/* decorative */}
        <div style={{position:'absolute', right:-30, top:-30, width:140, height:140, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,176,122,.45), transparent 70%)'}}/>
      </div>

      {/* breakdown */}
      <div style={{marginTop:18, background:'#fff', borderRadius:18, padding:'18px 18px 20px', border:'1px solid var(--line)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:14}}>
          <div style={{fontSize:14, fontWeight:600, color:'var(--plum)'}}>점수 구성</div>
          <div style={{fontSize:11, color:'#9a8674', fontFamily:'var(--mono)'}}>BREAKDOWN</div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          <ScoreBar label="얼굴 비율"   value={92} />
          <ScoreBar label="표정·분위기" value={85} accent="var(--peach)"/>
          <ScoreBar label="또렷함"      value={88} />
          <ScoreBar label="스타일링"   value={84} accent="var(--peach)"/>
        </div>
      </div>

      {/* CTA card */}
      <div style={{marginTop:14, borderRadius:20, padding:'18px 18px', background:'linear-gradient(135deg,#2D1F2A 0%, #6B2E4E 100%)', color:'#fff', position:'relative', overflow:'hidden'}}>
        <div style={{position:'absolute',right:-20,bottom:-20,fontFamily:'var(--serif)',fontStyle:'italic',fontSize:140,opacity:.08,lineHeight:.8}}>+</div>
        <div className="doc-eyebrow" style={{color:'var(--peach)'}}>NEXT STEP</div>
        <div style={{fontFamily:'var(--serif)', fontStyle:'italic', fontSize:26, marginTop:6, lineHeight:1.1}}>스펙을 더하면<br/>매력점수가 올라가요</div>
        <div style={{fontSize:12, opacity:.75, marginTop:8, lineHeight:1.5}}>5개 질문, 약 1분</div>
        <button style={{marginTop:14, height:44, padding:'0 18px', borderRadius:14, background:'var(--coral)', color:'#fff', border:0, fontWeight:600, fontSize:14, display:'inline-flex', alignItems:'center', gap:6, cursor:'pointer'}}>
          매력점수 부스트하기 <Chevron d="right"/>
        </button>
      </div>
    </div>
  </Phone>
);

// =====================================================================
// SCREEN 4 — 스펙 입력 (5단계 중 2)
// =====================================================================
const S4_SpecInput = () => {
  const opts = [
    {k:'5천만원 미만',      d:''},
    {k:'5,000 – 7,000',  d:'만원'},
    {k:'7,000 – 1억',     d:'만원', selected:true},
    {k:'1억 – 2억',        d:'만원'},
    {k:'2억 이상',         d:''},
    {k:'비공개',           d:''},
  ];
  return (
    <Phone>
      <TopBar
        left={<button className="btn-ghost" style={{padding:0,color:'var(--plum)'}}><Chevron/></button>}
        title="스펙 입력"
        right={<span style={{fontSize:13,color:'var(--plum-2)',fontFamily:'var(--mono)'}}>2 / 5</span>}
      />
      <div style={{padding:'4px 24px 0'}}>
        <div className="pbar" style={{height:6}}><i style={{width:'40%'}}/></div>
      </div>

      <div style={{padding:'28px 24px 0'}}>
        <div className="doc-eyebrow" style={{color:'var(--coral)'}}>Q.02 · INCOME</div>
        <h2 style={{fontSize:26, fontWeight:700, color:'var(--plum)', letterSpacing:'-.02em', margin:'10px 0 6px', lineHeight:1.25}}>
          연 소득은 어느 정도인가요?
        </h2>
        <p style={{fontSize:13, color:'var(--plum-2)', lineHeight:1.5}}>
          세전 기준. 매칭 시 정확한 숫자는 공개되지 않아요.
        </p>
      </div>

      <div style={{padding:'22px 24px 0', display:'flex', flexDirection:'column', gap:10}}>
        {opts.map((o,i)=>(
          <button key={i} style={{
            display:'flex', alignItems:'center', justifyContent:'space-between',
            height:60, padding:'0 18px', borderRadius:16,
            background: o.selected ? '#FFF1EC' : '#fff',
            border: o.selected ? '1.5px solid var(--coral)' : '1px solid var(--line-2)',
            color:'var(--plum)', fontFamily:'inherit', fontWeight: o.selected?600:500, fontSize:15, cursor:'pointer', textAlign:'left'
          }}>
            <span style={{display:'flex',alignItems:'baseline',gap:6}}>
              {o.k}<span style={{fontSize:12,color:'#9a8674',fontFamily:'var(--mono)'}}>{o.d}</span>
            </span>
            <span style={{
              width:22,height:22,borderRadius:'50%',
              background: o.selected ? 'var(--coral)' : 'transparent',
              border: o.selected ? 'none' : '1.5px solid var(--line-2)',
              display:'flex',alignItems:'center',justifyContent:'center'
            }}>
              {o.selected && <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8l3 3 7-7" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </span>
          </button>
        ))}
      </div>

      <div style={{position:'absolute', left:24, right:24, bottom:30}}>
        <button className="btn-primary">다음 <Chevron d="right"/></button>
      </div>
    </Phone>
  );
};

// =====================================================================
// SCREEN 5 — 종합 결과
// =====================================================================
const MiniScore = ({ label, value, sub, primary }) => (
  <div style={{
    flex:1, borderRadius:18, padding:'16px 12px', textAlign:'center',
    background: primary ? 'linear-gradient(180deg,#FF6B8A,#E03B5E)' : '#fff',
    color: primary ? '#fff' : 'var(--plum)',
    border: primary ? 'none' : '1px solid var(--line)'
  }}>
    <div style={{fontSize:10, fontFamily:'var(--mono)', letterSpacing:'.12em', opacity:primary?.85:.5}}>{label}</div>
    <div className="ring-num tabular" style={{fontSize:54, marginTop:6}}>{value}</div>
    <div style={{fontSize:11, marginTop:4, opacity:primary?.85:.6}}>{sub}</div>
  </div>
);

const S5_Total = () => (
  <Phone bg="linear-gradient(180deg,#FFF8F5 0%, #FFE9DF 60%, #FFF8F5 100%)">
    <TopBar title="종합 결과" right={<button className="btn-ghost" style={{padding:0,color:'var(--plum)'}}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M14 4l3 3-9 9H5v-3l9-9z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
    </button>}/>

    <div style={{padding:'18px 24px 0', textAlign:'center'}}>
      <div className="doc-eyebrow" style={{color:'var(--coral)'}}>FINAL GRADE</div>
      {/* grade */}
      <div style={{position:'relative', display:'inline-block', marginTop:12}}>
        <div style={{
          width:148, height:148, borderRadius:'50%',
          background:'linear-gradient(180deg,#FF6B8A 0%, #E03B5E 100%)',
          display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:'0 20px 50px rgba(224,59,94,.35), inset 0 -8px 20px rgba(0,0,0,.1)'
        }}>
          <span style={{fontFamily:'var(--serif)', fontStyle:'italic', fontSize:96, color:'#fff', lineHeight:.85, letterSpacing:'-.04em'}}>A<span style={{fontSize:50, verticalAlign:'super'}}>+</span></span>
        </div>
        {/* sparkles */}
        <div style={{position:'absolute', top:-6, right:-12, fontSize:24, color:'var(--gold)'}}>✦</div>
        <div style={{position:'absolute', bottom:6, left:-14, fontSize:18, color:'var(--gold)'}}>✦</div>
      </div>
      <div style={{marginTop:14, fontSize:13, color:'var(--plum-2)'}}>
        <span style={{fontWeight:600,color:'var(--plum)'}}>상위 8%</span> · 78,492명 중 6,279위
      </div>
    </div>

    <div style={{padding:'22px 20px 0', display:'flex', gap:10}}>
      <MiniScore label="외모"  value="87" sub="상위 12%" />
      <MiniScore label="매력" value="92" sub="상위 6%" primary />
      <MiniScore label="종합"  value="89" sub="상위 8%" />
    </div>

    {/* highlights */}
    <div style={{padding:'18px 24px 0'}}>
      <div style={{background:'#fff', borderRadius:18, padding:'16px 18px', border:'1px solid var(--line)'}}>
        <div style={{fontSize:12, color:'#9a8674', fontFamily:'var(--mono)', letterSpacing:'.12em'}}>HIGHLIGHTS</div>
        <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:10}}>
          {[
            ['얼굴 비율',  '상위 5%'],
            ['연 소득',    '상위 14%'],
            ['직업',       '전문직 · 가점'],
          ].map(([k,v])=>(
            <div key={k} style={{display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:14}}>
              <span style={{color:'var(--plum-2)'}}>{k}</span>
              <span style={{color:'var(--plum)',fontWeight:600}}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div style={{position:'absolute', left:24, right:24, bottom:30}}>
      <button className="btn-primary">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 21s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.5-7 10-7 10z" fill="#fff"/></svg>
        지금 등록하고 매칭 받기
      </button>
      <div style={{textAlign:'center',marginTop:10,fontSize:11,color:'#9a8674'}}>등록 즉시 AI가 당신과 어울리는 분을 찾아드려요</div>
    </div>
  </Phone>
);

// =====================================================================
// SCREEN 6 — 틴더식 매칭 카드 (실제 스와이프)
// =====================================================================
const S6_SwipeCard = () => {
  const [x, setX] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const startRef = React.useRef({x:0, ox:0});

  const onDown = (e) => {
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
    if (Math.abs(x) > 90) {
      // snap off
      setX(x > 0 ? 600 : -600);
      setTimeout(()=>setX(0), 280);
    } else {
      setX(0);
    }
  };
  React.useEffect(()=>{
    if(!dragging) return;
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return ()=>{ window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  });

  const rot = x * 0.06;
  const likeOp  = Math.max(0, Math.min(1, x/80));
  const passOp  = Math.max(0, Math.min(1, -x/80));

  return (
    <Phone>
      <TopBar
        left={<button className="btn-ghost" style={{padding:0,color:'var(--plum)'}}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
        </button>}
        title={<span style={{fontFamily:'Pretendard', fontWeight:800, fontSize:20, letterSpacing:'-.06em'}}>설렘</span>}
        right={<button className="btn-ghost" style={{padding:0,color:'var(--plum)'}}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.8"/><path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
        </button>}
      />

      <div style={{padding:'8px 20px 0'}}>
        {/* card */}
        <div style={{position:'relative', height:560}}>
          {/* back card peek */}
          <div className="card-shadow" style={{position:'absolute', inset:'8px 14px 0', borderRadius:26, background:'var(--sand)', transform:'scale(.96)', opacity:.6}}/>
          {/* front card */}
          <div
            onMouseDown={onDown}
            className="card-shadow"
            style={{
              position:'absolute', inset:0, borderRadius:26, overflow:'hidden', background:'#fff',
              transform:`translateX(${x}px) rotate(${rot}deg)`,
              transition: dragging ? 'none' : 'transform .28s cubic-bezier(.2,.7,.3,1)',
              cursor: dragging?'grabbing':'grab', userSelect:'none'
            }}
          >
            <div className="ph-img" data-label="MATCH PHOTO" style={{height:'62%', position:'relative'}}>
              {/* score chip */}
              <div style={{position:'absolute', top:14, left:14, display:'flex', gap:6}}>
                <span className="pill" style={{background:'rgba(45,31,42,.78)', color:'#fff', backdropFilter:'blur(8px)'}}>
                  <span style={{color:'var(--peach)'}}>♦</span> 외모 91
                </span>
                <span className="pill" style={{background:'rgba(201,163,107,.95)', color:'#fff'}}>S 등급</span>
              </div>
              <div style={{position:'absolute', top:14, right:14}}>
                <span className="pill" style={{background:'rgba(63,185,132,.95)', color:'#fff'}}>
                  <span style={{width:6,height:6,borderRadius:'50%',background:'#fff'}}/>호환 96%
                </span>
              </div>
              {/* like / pass overlays */}
              <div style={{position:'absolute', top:60, left:24, padding:'8px 18px', border:'4px solid var(--ok)', color:'var(--ok)', borderRadius:14, fontFamily:'var(--serif)', fontStyle:'italic', fontSize:38, transform:'rotate(-18deg)', opacity:likeOp, background:'rgba(255,255,255,.6)'}}>LIKE</div>
              <div style={{position:'absolute', top:60, right:24, padding:'8px 18px', border:'4px solid var(--coral-deep)', color:'var(--coral-deep)', borderRadius:14, fontFamily:'var(--serif)', fontStyle:'italic', fontSize:38, transform:'rotate(18deg)', opacity:passOp, background:'rgba(255,255,255,.6)'}}>NOPE</div>
              <div style={{position:'absolute', inset:'auto 0 0 0', height:140, background:'linear-gradient(180deg, transparent, rgba(0,0,0,.55))'}}/>
            </div>

            {/* info */}
            <div style={{padding:'14px 18px 16px'}}>
              <div style={{display:'flex', alignItems:'baseline', gap:8}}>
                <div style={{fontSize:24, fontWeight:700, color:'var(--plum)', letterSpacing:'-.02em'}}>지윤</div>
                <div style={{fontSize:18, color:'var(--plum-2)', fontFamily:'var(--serif)', fontStyle:'italic'}}>, 27</div>
                <span className="pill" style={{marginLeft:'auto', background:'var(--sand)', color:'var(--plum)', fontSize:11}}>165cm</span>
              </div>
              <div style={{display:'flex',gap:14,marginTop:8,fontSize:12,color:'var(--plum-2)'}}>
                <span>📍 서울 강남</span>
                <span>마케터</span>
                <span>5km</span>
              </div>
              <div style={{fontSize:13, color:'var(--plum-2)', marginTop:8, lineHeight:1.5}}>
                토요일 아침 카페 · 러닝 · 클래식 공연 좋아해요
              </div>
            </div>
          </div>
        </div>

        {/* action buttons */}
        <div style={{display:'flex', justifyContent:'center', gap:22, marginTop:14}}>
          <button title="pass" style={{width:60,height:60,borderRadius:'50%',background:'#fff',border:'1px solid var(--line-2)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',boxShadow:'var(--shadow-card)'}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="var(--plum)" strokeWidth="2.2" strokeLinecap="round"/></svg>
          </button>
          <button title="super" style={{width:52,height:52,borderRadius:'50%',background:'var(--plum)',color:'#fff',border:0,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',boxShadow:'var(--shadow-card)'}}>
            <span style={{color:'var(--gold)',fontSize:22}}>✦</span>
          </button>
          <button title="like" style={{width:60,height:60,borderRadius:'50%',background:'linear-gradient(180deg,#FF6B8A,#E03B5E)',color:'#fff',border:0,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',boxShadow:'var(--shadow-lift)'}}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 21s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.5-7 10-7 10z" fill="#fff"/></svg>
          </button>
        </div>
      </div>
    </Phone>
  );
};

// =====================================================================
// SCREEN 7 — 매칭 성공 모달
// =====================================================================
const Confetti = () => {
  const items = Array.from({length:14}, (_,i)=>({
    l: Math.random()*100, t: Math.random()*60, s: 12+Math.random()*16, d: Math.random()*1.2, r: Math.random()*360
  }));
  return (
    <>
      {items.map((c,i)=>(
        <span key={i} className="hpop" style={{
          position:'absolute', left:`${c.l}%`, top:`${c.t}%`, fontSize:c.s, transform:`rotate(${c.r}deg)`,
          animationDelay:`${c.d}s`, color: i%3===0?'var(--gold)':i%3===1?'var(--peach)':'#fff'
        }}>{i%2 ? '♥' : '✦'}</span>
      ))}
    </>
  );
};

const S7_MatchModal = () => (
  <Phone>
    {/* dim background showing previous card */}
    <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, #6B2E4E 0%, #2D1F2A 100%)'}}/>
    <Confetti/>

    <div style={{position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'0 28px', textAlign:'center'}}>
      <div className="doc-eyebrow" style={{color:'var(--peach)'}}>IT'S A MATCH</div>
      <div style={{fontFamily:'var(--serif)', fontStyle:'italic', fontSize:84, color:'#fff', lineHeight:.9, letterSpacing:'-.03em', marginTop:6}}>설렘이</div>
      <div style={{fontFamily:'var(--serif)', fontStyle:'italic', fontSize:64, color:'var(--peach)', lineHeight:.9, letterSpacing:'-.03em'}}>시작됐어요</div>

      {/* two avatars overlap */}
      <div style={{display:'flex', marginTop:30}}>
        <div className="ph-img" data-label="YOU" style={{width:104, height:104, borderRadius:'50%', border:'4px solid var(--peach)', position:'relative', zIndex:2}}/>
        <div className="ph-img" data-label="MATCH" style={{width:104, height:104, borderRadius:'50%', border:'4px solid var(--coral)', marginLeft:-22, position:'relative'}}/>
      </div>
      {/* compat */}
      <div style={{marginTop:18, padding:'8px 16px', borderRadius:999, background:'rgba(255,255,255,.12)', backdropFilter:'blur(8px)', color:'#fff', fontSize:13, display:'inline-flex', gap:8, alignItems:'center'}}>
        <span style={{color:'var(--ok)'}}>●</span> AI 호환도 <b className="tabular">96%</b>
      </div>

      <div style={{marginTop:22, color:'#fff', fontSize:15, lineHeight:1.6}}>
        <div style={{fontWeight:600}}>지윤 · 27 · 서울 강남</div>
        <div style={{opacity:.7, fontSize:13, marginTop:4}}>kakao · jiyoon_27</div>
      </div>

      <div style={{marginTop:28, width:'100%', display:'flex', flexDirection:'column', gap:10}}>
        <button className="btn-primary">메시지 보내기</button>
        <button style={{height:52, borderRadius:16, background:'rgba(255,255,255,.1)', color:'#fff', border:'1px solid rgba(255,255,255,.2)', fontWeight:600, fontFamily:'inherit', fontSize:15, cursor:'pointer'}}>계속 매칭 둘러보기</button>
      </div>
    </div>
  </Phone>
);

// =====================================================================
// SCREEN 8 — 받은 매칭 목록
// =====================================================================
const MatchRow = ({ name, age, region, when, compat, online, contact }) => (
  <div style={{display:'flex', alignItems:'center', gap:14, padding:'14px 16px', background:'#fff', borderRadius:16, border:'1px solid var(--line)'}}>
    <div style={{position:'relative'}}>
      <div className="ph-img" data-label="" style={{width:56, height:56, borderRadius:'50%'}}/>
      {online && <span style={{position:'absolute', right:0, bottom:2, width:12, height:12, borderRadius:'50%', background:'var(--ok)', border:'2px solid #fff'}}/>}
    </div>
    <div style={{flex:1, minWidth:0}}>
      <div style={{display:'flex', alignItems:'baseline', gap:6}}>
        <span style={{fontSize:15, fontWeight:600, color:'var(--plum)'}}>{name}</span>
        <span style={{fontSize:13, color:'var(--plum-2)'}}>· {age}</span>
        <span className="pill" style={{marginLeft:'auto', background:'rgba(63,185,132,.12)', color:'var(--ok)', fontSize:10}}>{compat}%</span>
      </div>
      <div style={{fontSize:12, color:'var(--plum-2)', marginTop:2, display:'flex', gap:8}}>
        <span>{region}</span><span>· {when}</span>
      </div>
      <div style={{fontSize:11, color:'#9a8674', marginTop:4, fontFamily:'var(--mono)'}}>{contact}</div>
    </div>
  </div>
);

const S8_MatchList = () => (
  <Phone>
    <TopBar
      title="받은 매칭"
      right={<button className="btn-ghost" style={{padding:0,color:'var(--plum)'}}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8"/><path d="M14 14l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
      </button>}
    />

    {/* tabs */}
    <div style={{padding:'4px 20px 0', display:'flex', gap:6, borderBottom:'1px solid var(--line)'}}>
      {['받은 매칭 12','보낸 좋아요 8','대화 3'].map((t,i)=>(
        <button key={t} style={{
          padding:'12px 10px', background:'transparent', border:0, cursor:'pointer', fontFamily:'inherit',
          fontSize:14, fontWeight: i===0?600:500,
          color: i===0?'var(--coral)':'var(--plum-2)',
          borderBottom: i===0?'2px solid var(--coral)':'2px solid transparent',
          marginBottom:-1
        }}>{t}</button>
      ))}
    </div>

    {/* new match strip */}
    <div style={{padding:'16px 20px 0'}}>
      <div className="doc-eyebrow" style={{color:'#9a8674'}}>NEW · 오늘 도착</div>
      <div style={{display:'flex', gap:12, marginTop:10, overflowX:'auto', paddingBottom:4}}>
        {['지윤','수아','민지','하영','채원'].map((n,i)=>(
          <div key={n} style={{flex:'0 0 auto', textAlign:'center'}}>
            <div style={{position:'relative', padding:2, borderRadius:'50%', background:'linear-gradient(135deg,#FFB07A,#FF5A78)'}}>
              <div className="ph-img" data-label="" style={{width:60, height:60, borderRadius:'50%', border:'2px solid var(--cream)'}}/>
              {i<2 && <span style={{position:'absolute',top:-2,right:-2, width:18,height:18, borderRadius:'50%', background:'var(--coral)', color:'#fff', fontSize:10, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', border:'2px solid var(--cream)'}}>{i+1}</span>}
            </div>
            <div style={{fontSize:11, color:'var(--plum)', marginTop:6, fontWeight:500}}>{n}</div>
          </div>
        ))}
      </div>
    </div>

    {/* list */}
    <div style={{padding:'16px 20px 0', display:'flex', flexDirection:'column', gap:10}}>
      <div className="doc-eyebrow" style={{color:'#9a8674'}}>이번 주</div>
      <MatchRow name="지윤" age="27" region="서울 강남" when="2일 전" compat={96} online contact="kakao · jiyoon_27"/>
      <MatchRow name="수아" age="29" region="서울 송파" when="3일 전" compat={91} contact="kakao · sua_b"/>
      <MatchRow name="민지" age="26" region="경기 분당" when="5일 전" compat={88} online contact="연락처 공개됨"/>
      <MatchRow name="하영" age="28" region="서울 마포" when="6일 전" compat={84} contact="kakao · hayoung___"/>
    </div>

    {/* bottom nav */}
    <div style={{position:'absolute', left:0, right:0, bottom:0, height:78, padding:'10px 20px 28px', background:'rgba(255,248,245,.92)', backdropFilter:'blur(10px)', borderTop:'1px solid var(--line)', display:'flex', justifyContent:'space-around', alignItems:'center'}}>
      {[
        ['홈','M3 10l9-7 9 7v9a2 2 0 01-2 2h-4v-7H9v7H5a2 2 0 01-2-2v-9z'],
        ['매칭','M12 21s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.5-7 10-7 10z'],
        ['목록','M4 6h16M4 12h16M4 18h16'],
        ['프로필','M12 12a4 4 0 100-8 4 4 0 000 8zm-7 9a7 7 0 0114 0'],
      ].map(([k,d],i)=>(
        <button key={k} className="btn-ghost" style={{display:'flex',flexDirection:'column',alignItems:'center',gap:2,color: i===2?'var(--coral)':'var(--plum-2)'}}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill={i===1?'currentColor':'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>
          <span style={{fontSize:10, fontWeight: i===2?700:500}}>{k}</span>
        </button>
      ))}
    </div>
  </Phone>
);

Object.assign(window, { Phone, S1_Home, S2_Analyzing, S3_LookScore, S4_SpecInput, S5_Total, S6_SwipeCard, S7_MatchModal, S8_MatchList });
