/* v2-extra.jsx — additional v2 screens: spec, total, list, chat, profile */

// ===================================================================
// v2 SCREEN — Spec Input (5 step, AI-augmented)
// ===================================================================
const V2_Spec = () => (
  <Phone bg="#F7F3EE">
    <TopBar
      left={<button className="btn-ghost" style={{padding:0,color:'var(--plum)'}}><Chevron/></button>}
      title={<AIChip>AI · BOOSTING</AIChip>}
      right={<span style={{fontFamily:'var(--mono)', fontSize:11, color:'var(--plum-2)'}}>2 / 5</span>}
    />
    <div style={{padding:'4px 24px 0'}}>
      <div style={{height:6, borderRadius:999, background:'var(--sand-2)', overflow:'hidden'}}>
        <div style={{width:'40%', height:'100%', background:'linear-gradient(90deg,#FFB07A,#FF5A78)'}}/>
      </div>
    </div>

    <div style={{padding:'24px 24px 0'}}>
      <div style={{fontFamily:'var(--display)', fontWeight:500, fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--coral)'}}>Q.02 · INCOME</div>
      <h2 style={{fontFamily:'var(--display)', fontWeight:700, fontSize:36, lineHeight:.95, letterSpacing:'-.03em', color:'var(--plum)', margin:'10px 0 0'}}>
        연 소득은<br/>어느 정도인가요?
      </h2>
      <p style={{fontSize:13, color:'var(--plum-2)', marginTop:10, lineHeight:1.5}}>
        세전 기준. 매칭 시 정확한 숫자는 공개되지 않아요.
      </p>
    </div>

    {/* AI live calc note */}
    <div style={{padding:'14px 24px 0'}}>
      <AINote tag="AI · LIVE CALC">
        “7천만원 선택 시, 매력점수 <b>+4.2</b> 예상. 같은 권역 매칭 후보 <b>+18명</b>.”
      </AINote>
    </div>

    <div style={{padding:'14px 24px 0', display:'flex', flexDirection:'column', gap:8}}>
      {[
        {k:'5천만원 미만',      d:'',      sel:false, delta:'+0.0'},
        {k:'5,000 – 7,000',  d:'만원',  sel:false, delta:'+2.4'},
        {k:'7,000 – 1억',     d:'만원',  sel:true,  delta:'+4.2'},
        {k:'1억 – 2억',        d:'만원',  sel:false, delta:'+6.1'},
        {k:'2억 이상',         d:'',      sel:false, delta:'+7.8'},
        {k:'비공개',           d:'',      sel:false, delta:'+1.0'},
      ].map((o,i)=>(
        <button key={i} style={{
          display:'flex', alignItems:'center', justifyContent:'space-between',
          height:54, padding:'0 16px', borderRadius:14,
          background: o.sel ? '#fff' : '#fff',
          border: o.sel ? '1.5px solid var(--coral)' : '1px solid var(--line-2)',
          color:'var(--plum)', fontFamily:'inherit', fontWeight: o.sel?600:500, fontSize:14, cursor:'pointer', textAlign:'left',
          boxShadow: o.sel ? '0 2px 12px rgba(255,90,120,.10)' : 'none'
        }}>
          <span style={{display:'flex',alignItems:'baseline',gap:6}}>
            {o.k}<span style={{fontSize:11,color:'#9a8674',fontFamily:'var(--mono)'}}>{o.d}</span>
          </span>
          <span style={{display:'flex',alignItems:'center',gap:10}}>
            <span style={{fontFamily:'var(--mono)', fontSize:10, color: o.sel?'var(--coral)':'#9a8674', letterSpacing:'.05em'}}>{o.delta}</span>
            <span style={{
              width:18,height:18,borderRadius:'50%',
              background: o.sel ? 'var(--coral)' : 'transparent',
              border: o.sel ? 'none' : '1.5px solid var(--line-2)',
              display:'flex',alignItems:'center',justifyContent:'center'
            }}>
              {o.sel && <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M3 8l3 3 7-7" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </span>
          </span>
        </button>
      ))}
    </div>

    <div style={{position:'absolute', left:24, right:24, bottom:28}}>
      <button className="btn-primary" style={{height:58, fontFamily:'var(--display)', fontWeight:600, fontSize:15, borderRadius:18}}>
        다음 질문 <Chevron d="right"/>
      </button>
    </div>
  </Phone>
);

// ===================================================================
// v2 SCREEN — Total Result (3 scores + grade + AI summary)
// ===================================================================
const V2_Total = () => (
  <Phone bg="#F7F3EE">
    <TopBar
      left={<button className="btn-ghost" style={{padding:0,color:'var(--plum)'}}><Chevron/></button>}
      title={<AIChip>AI · FINAL</AIChip>}
      right={<button className="btn-ghost" style={{padding:0,color:'var(--plum)',fontSize:18}}>↗</button>}
    />

    <div style={{padding:'14px 24px 0'}}>
      <div style={{fontFamily:'var(--display)', fontWeight:500, fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--coral)'}}>FINAL GRADE</div>
      <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginTop:8}}>
        <div className="ring-num countin tabular" style={{fontFamily:'var(--display)', fontWeight:700, fontSize:160, lineHeight:.85, letterSpacing:'-.06em', color:'var(--plum)'}}>
          A<span style={{fontFamily:'var(--serif)',fontStyle:'italic',fontSize:80,verticalAlign:'super',color:'var(--coral)',fontWeight:400,lineHeight:1}}>+</span>
        </div>
        <div style={{textAlign:'right', marginTop:10}}>
          <div style={{fontFamily:'var(--serif)', fontStyle:'italic', fontSize:26, color:'var(--coral)', lineHeight:1}}>top 8%</div>
          <div style={{fontFamily:'var(--mono)', fontSize:10, color:'#9a8674', marginTop:4}}>78,492 ÷ 6,279</div>
        </div>
      </div>
    </div>

    {/* three scores big */}
    <div style={{padding:'18px 24px 0', display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8}}>
      {[
        {k:'외모',  v:'87', sub:'top 12%', pri:false},
        {k:'매력', v:'92', sub:'top 6%',  pri:true},
        {k:'종합',  v:'89', sub:'top 8%',  pri:false},
      ].map(s=>(
        <div key={s.k} style={{
          borderRadius:16, padding:'14px 12px',
          background: s.pri ? 'var(--plum)' : '#fff',
          color: s.pri ? '#fff' : 'var(--plum)',
          border: s.pri ? 'none' : '1px solid var(--line)'
        }}>
          <div style={{fontFamily:'var(--display)', fontWeight:600, fontSize:9, letterSpacing:'.22em', textTransform:'uppercase', opacity: s.pri?.7:.5}}>{s.k}</div>
          <div className="tabular" style={{fontFamily:'var(--display)', fontWeight:700, fontSize:48, lineHeight:1, letterSpacing:'-.04em', marginTop:6}}>{s.v}</div>
          <div style={{fontFamily:'var(--mono)', fontSize:10, opacity: s.pri?.7:.55, marginTop:4}}>{s.sub}</div>
        </div>
      ))}
    </div>

    {/* AI summary */}
    <div style={{padding:'18px 24px 0'}}>
      <AINote tag="AI · SUMMARY">
        “외모는 A, 매력은 S 직전. 7,000–1억 소득 + 전문직 가점으로 강남·송파 권역에서 강한 매치를 만들 수 있어요.”
      </AINote>
    </div>

    {/* compatibility hint */}
    <div style={{padding:'14px 24px 0'}}>
      <div style={{background:'#fff', borderRadius:14, border:'1px solid var(--line)', padding:'14px 16px', display:'flex', alignItems:'center', gap:14}}>
        <Radar size={84} values={[.87,.92,.89,.74,.82,.85]} labels={['','','','','','']}/>
        <div style={{flex:1}}>
          <div style={{fontFamily:'var(--display)', fontWeight:600, fontSize:11, letterSpacing:'.16em', color:'#9a8674'}}>YOUR PROFILE SHAPE</div>
          <div style={{fontFamily:'Pretendard', fontWeight:600, fontSize:14, color:'var(--plum)', marginTop:4}}>매력·외모 균형형</div>
          <div style={{fontSize:12, color:'var(--plum-2)', marginTop:2}}>가장 매칭이 잘되는 타입을 AI가 찾는 중</div>
        </div>
      </div>
    </div>

    <div style={{position:'absolute', left:24, right:24, bottom:28}}>
      <button className="btn-primary" style={{height:60, fontFamily:'var(--display)', fontWeight:600, fontSize:16, borderRadius:20}}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="#fff"><circle cx="3" cy="8" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="13" cy="8" r="1.5"/></svg>
        등록하고 AI 매칭 시작
      </button>
    </div>
  </Phone>
);

// ===================================================================
// v2 SCREEN — Match List (AI curated feed)
// ===================================================================
const V2_MatchList = () => (
  <Phone bg="#F7F3EE">
    <div style={{padding:'52px 24px 0', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
      <div>
        <div style={{fontFamily:'var(--display)', fontWeight:500, fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--coral)'}}>AI · CURATED FOR YOU</div>
        <h2 style={{fontFamily:'var(--display)', fontWeight:700, fontSize:30, lineHeight:.95, letterSpacing:'-.03em', color:'var(--plum)', margin:'8px 0 0'}}>받은 매칭</h2>
      </div>
      <button className="btn-ghost" style={{padding:0,color:'var(--plum)'}}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/><path d="M17 17l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
      </button>
    </div>

    {/* tabs */}
    <div style={{padding:'18px 24px 0', display:'flex', gap:14, borderBottom:'1px solid var(--line)'}}>
      {[
        ['받은 매칭', 12, true],
        ['보낸 좋아요', 8, false],
        ['대화', 3, false],
      ].map(([k,n,a])=>(
        <button key={k} style={{
          padding:'10px 0', background:'transparent', border:0, cursor:'pointer', fontFamily:'inherit',
          fontSize:13, fontWeight: a?600:500,
          color: a?'var(--plum)':'var(--plum-2)',
          borderBottom: a?'2px solid var(--coral)':'2px solid transparent',
          marginBottom:-1, display:'flex',alignItems:'center',gap:6
        }}>
          {k}
          <span style={{fontFamily:'var(--display)',fontWeight:700,fontSize:10,padding:'2px 6px',borderRadius:6,background:a?'var(--coral)':'var(--sand-2)',color:a?'#fff':'var(--plum-2)'}}>{n}</span>
        </button>
      ))}
    </div>

    {/* AI today picks - hero card */}
    <div style={{padding:'14px 24px 0'}}>
      <div style={{borderRadius:18, overflow:'hidden', background:'var(--plum)', color:'#fff', position:'relative'}}>
        <div style={{display:'flex', height:160}}>
          <div className="ph-img" data-label="" style={{width:160, height:'100%', position:'relative'}}>
            <FaceWire color="#fff" accent="#FFB07A"/>
          </div>
          <div style={{flex:1, padding:'14px 16px', display:'flex', flexDirection:'column'}}>
            <AIChip dark>AI · TOP TODAY</AIChip>
            <div style={{display:'flex', alignItems:'baseline', gap:6, marginTop:8}}>
              <span style={{fontFamily:'var(--display)', fontWeight:700, fontSize:28, letterSpacing:'-.03em'}}>지윤</span>
              <span style={{fontFamily:'var(--serif)', fontStyle:'italic', fontSize:20, color:'#FFB07A'}}>, 27</span>
            </div>
            <div style={{fontSize:11, opacity:.7, marginTop:2}}>서울 강남 · 마케터</div>
            <div style={{fontFamily:'var(--serif)', fontStyle:'italic', fontSize:13, lineHeight:1.4, color:'#FFB07A', marginTop:'auto'}}>
              “same Saturday rhythm”
            </div>
            <div style={{display:'flex', gap:6, marginTop:8}}>
              <span style={{padding:'3px 8px', borderRadius:999, background:'rgba(255,255,255,.12)', fontFamily:'var(--display)', fontWeight:700, fontSize:10}}>FIT 96</span>
              <span style={{padding:'3px 8px', borderRadius:999, background:'rgba(255,176,122,.2)', fontFamily:'var(--display)', fontWeight:700, fontSize:10, color:'#FFB07A'}}>S 등급</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* list */}
    <div style={{padding:'14px 24px 0', display:'flex', flexDirection:'column', gap:8}}>
      <div style={{fontFamily:'var(--display)', fontWeight:600, fontSize:10, letterSpacing:'.18em', color:'#9a8674', marginTop:4}}>이번 주 · 11명</div>
      {[
        ['수아','29','서울 송파', 91, '카페·전시 취향 일치'],
        ['민지','26','경기 분당', 88, '같은 직군'],
        ['하영','28','서울 마포', 84, '주말 활동 패턴 일치'],
        ['채원','27','서울 용산', 82, '음악 취향 비슷'],
      ].map(([n,a,r,c,note])=>(
        <div key={n} style={{display:'flex', alignItems:'center', gap:12, padding:'10px 12px', background:'#fff', borderRadius:14, border:'1px solid var(--line)'}}>
          <div style={{position:'relative', width:48, height:48, borderRadius:'50%', overflow:'hidden'}}>
            <div className="ph-img" data-label="" style={{position:'absolute', inset:0}}/>
            <FaceWire color="#fff" accent="var(--coral)"/>
          </div>
          <div style={{flex:1, minWidth:0}}>
            <div style={{display:'flex',alignItems:'baseline',gap:6}}>
              <span style={{fontFamily:'var(--display)',fontWeight:700,fontSize:15,color:'var(--plum)',letterSpacing:'-.02em'}}>{n}</span>
              <span style={{fontFamily:'var(--serif)',fontStyle:'italic',fontSize:13,color:'var(--plum-2)'}}>, {a}</span>
              <span style={{marginLeft:'auto', fontFamily:'var(--display)',fontWeight:700,fontSize:11,color:'var(--ok)'}}>FIT {c}</span>
            </div>
            <div style={{fontSize:11, color:'#9a8674', marginTop:1}}>{r}</div>
            <div style={{fontFamily:'var(--serif)',fontStyle:'italic',fontSize:11,color:'var(--coral)',marginTop:2,lineHeight:1.3}}>“{note}”</div>
          </div>
        </div>
      ))}
    </div>

    {/* bottom nav */}
    <div style={{position:'absolute', left:0, right:0, bottom:0, height:74, padding:'10px 20px 24px', background:'rgba(247,243,238,.92)', backdropFilter:'blur(10px)', borderTop:'1px solid var(--line)', display:'flex', justifyContent:'space-around'}}>
      {[
        ['홈','M3 10l9-7 9 7v9a2 2 0 01-2 2h-4v-7H9v7H5a2 2 0 01-2-2v-9z', false],
        ['매칭','M12 21s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.5-7 10-7 10z', false],
        ['목록','M4 6h16M4 12h16M4 18h16', true],
        ['프로필','M12 12a4 4 0 100-8 4 4 0 000 8zm-7 9a7 7 0 0114 0', false],
      ].map(([k,d,a])=>(
        <button key={k} className="btn-ghost" style={{display:'flex',flexDirection:'column',alignItems:'center',gap:2, color: a?'var(--plum)':'#9a8674'}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>
          <span style={{fontFamily:'var(--display)',fontSize:9, fontWeight: a?700:500, letterSpacing:'.08em', textTransform:'uppercase'}}>{k}</span>
        </button>
      ))}
    </div>
  </Phone>
);

// ===================================================================
// v2 SCREEN — Chat (with AI starter suggestion)
// ===================================================================
const V2_Chat = () => (
  <Phone bg="#F7F3EE">
    <div style={{padding:'48px 16px 12px', display:'flex', alignItems:'center', gap:12, borderBottom:'1px solid var(--line)'}}>
      <button className="btn-ghost" style={{padding:0,color:'var(--plum)'}}><Chevron/></button>
      <div style={{position:'relative', width:38, height:38, borderRadius:'50%', overflow:'hidden'}}>
        <div className="ph-img" data-label="" style={{position:'absolute', inset:0}}/>
        <FaceWire color="#fff" accent="var(--coral)"/>
      </div>
      <div style={{flex:1, minWidth:0}}>
        <div style={{display:'flex',alignItems:'baseline',gap:6}}>
          <span style={{fontFamily:'var(--display)',fontWeight:700,fontSize:15,color:'var(--plum)'}}>지윤</span>
          <span style={{fontFamily:'var(--mono)',fontSize:10,color:'var(--ok)'}}>● online</span>
        </div>
        <AIChip>AI · FIT 96</AIChip>
      </div>
      <button className="btn-ghost" style={{padding:0,color:'var(--plum)',fontSize:18}}>⋯</button>
    </div>

    {/* messages */}
    <div style={{padding:'18px 16px 0', display:'flex', flexDirection:'column', gap:12, overflow:'hidden'}}>
      {/* AI system bubble */}
      <div style={{alignSelf:'center', maxWidth:280, background:'rgba(45,31,42,.06)', borderRadius:14, padding:'10px 14px', textAlign:'center'}}>
        <div style={{fontFamily:'var(--display)', fontWeight:600, fontSize:9, letterSpacing:'.22em', color:'#9a8674', textTransform:'uppercase'}}>AI · MATCHED 2일 전</div>
        <div style={{fontFamily:'var(--serif)', fontStyle:'italic', fontSize:13, color:'var(--plum-2)', marginTop:4, lineHeight:1.4}}>
          “두 분 다 토요일 카페를 좋아하시네요.”
        </div>
      </div>

      {/* their msg */}
      <div style={{alignSelf:'flex-start', maxWidth:260, background:'#fff', borderRadius:'14px 14px 14px 4px', padding:'10px 14px', border:'1px solid var(--line)'}}>
        <div style={{fontSize:14, color:'var(--plum)', lineHeight:1.45}}>안녕하세요! 프로필 잘 봤어요 :)</div>
        <div style={{fontFamily:'var(--mono)', fontSize:9, color:'#9a8674', marginTop:4, textAlign:'right'}}>09:32</div>
      </div>

      {/* my msg */}
      <div style={{alignSelf:'flex-end', maxWidth:260, background:'var(--plum)', color:'#fff', borderRadius:'14px 14px 4px 14px', padding:'10px 14px'}}>
        <div style={{fontSize:14, lineHeight:1.45}}>안녕하세요 지윤님! 저도요. 토요일 자주 가는 카페 있으세요?</div>
        <div style={{fontFamily:'var(--mono)', fontSize:9, opacity:.6, marginTop:4, textAlign:'right'}}>09:34</div>
      </div>

      {/* AI suggestion card */}
      <div style={{alignSelf:'stretch', marginTop:6, background:'#fff', borderRadius:14, padding:'12px 14px', border:'1px solid var(--line)', boxShadow:'0 2px 8px rgba(45,31,42,.04)'}}>
        <div style={{display:'flex', alignItems:'center', gap:6, marginBottom:8}}>
          <AIChip>AI · SUGGESTS</AIChip>
          <span style={{marginLeft:'auto', fontFamily:'var(--mono)',fontSize:9,color:'#9a8674'}}>3 ideas</span>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:6}}>
          {[
            '카페 추천도 좋지만, 본인이 어디서 노트북 펴고 시간 보내는지 묻기',
            '러닝 좋아하시는 거 같던데, 한강 코스 공유하기',
            '주말 클래식 공연 같이 볼래요? 라고 제안하기',
          ].map((s,i)=>(
            <button key={i} style={{textAlign:'left', padding:'10px 12px', borderRadius:10, background:i===0?'#FFF1EC':'var(--sand)', border:'none', cursor:'pointer', fontFamily:'inherit', fontSize:12.5, color:'var(--plum)', lineHeight:1.45, display:'flex', alignItems:'center', gap:8}}>
              <span style={{fontFamily:'var(--display)',fontWeight:700,fontSize:10,color:'var(--coral)',flexShrink:0}}>0{i+1}</span>
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>

    {/* composer */}
    <div style={{position:'absolute', left:0, right:0, bottom:0, padding:'10px 14px 26px', background:'#F7F3EE', borderTop:'1px solid var(--line)', display:'flex', alignItems:'center', gap:8}}>
      <button style={{width:38, height:38, borderRadius:'50%', background:'#fff', border:'1px solid var(--line-2)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="var(--plum)" strokeWidth="2" strokeLinecap="round"/></svg>
      </button>
      <div style={{flex:1, height:42, borderRadius:21, background:'#fff', border:'1px solid var(--line-2)', display:'flex', alignItems:'center', padding:'0 14px', fontSize:13, color:'#9a8674'}}>메시지 입력</div>
      <button style={{width:42, height:42, borderRadius:'50%', background:'var(--coral)', border:0, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    </div>
  </Phone>
);

// ===================================================================
// v2 SCREEN — Profile (user's own)
// ===================================================================
const V2_Profile = () => (
  <Phone bg="#F7F3EE">
    <TopBar
      left={<button className="btn-ghost" style={{padding:0,color:'var(--plum)'}}><Chevron/></button>}
      title={<AIChip>YOUR AI PROFILE</AIChip>}
      right={<button className="btn-ghost" style={{padding:0,color:'var(--plum)',fontSize:14}}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M14 4l3 3-9 9H5v-3l9-9z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
      </button>}
    />

    {/* hero photo with overlay info */}
    <div style={{padding:'10px 20px 0'}}>
      <div style={{height:280, borderRadius:22, position:'relative', overflow:'hidden'}}>
        <div className="ph-img" data-label="" style={{position:'absolute', inset:0, filter:'brightness(.92)'}}/>
        <FaceWire color="#fff" accent="var(--coral)"/>
        {/* TR pills */}
        <div style={{position:'absolute', top:14, right:14, display:'flex', flexDirection:'column', gap:6, alignItems:'flex-end'}}>
          <span style={{padding:'5px 10px', borderRadius:999, background:'rgba(0,0,0,.55)', backdropFilter:'blur(10px)', color:'#fff', fontFamily:'var(--display)', fontWeight:700, fontSize:11, letterSpacing:'.06em'}}>89 · A+</span>
        </div>
        <div style={{position:'absolute', left:0, right:0, bottom:0, padding:'70px 18px 18px', background:'linear-gradient(180deg, transparent, rgba(0,0,0,.7))', color:'#fff'}}>
          <div style={{display:'flex',alignItems:'baseline',gap:8}}>
            <span style={{fontFamily:'var(--display)',fontWeight:700,fontSize:38,letterSpacing:'-.04em',lineHeight:1}}>나</span>
            <span style={{fontFamily:'var(--serif)',fontStyle:'italic',fontSize:28,color:'#FFB07A'}}>, 29</span>
          </div>
          <div style={{fontSize:12, opacity:.85, marginTop:4}}>서울 강남 · 디자이너 · 178cm</div>
        </div>
      </div>
    </div>

    {/* my scores */}
    <div style={{padding:'14px 20px 0', display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:6}}>
      {[
        ['외모','87','top 12%'],
        ['매력','92','top 6%'],
        ['종합','89','top 8%'],
      ].map(([k,v,sub])=>(
        <div key={k} style={{background:'#fff', borderRadius:12, padding:'10px 12px', border:'1px solid var(--line)'}}>
          <div style={{fontFamily:'var(--display)',fontWeight:600,fontSize:9,letterSpacing:'.18em',color:'#9a8674',textTransform:'uppercase'}}>{k}</div>
          <div className="tabular" style={{fontFamily:'var(--display)',fontWeight:700,fontSize:28,letterSpacing:'-.03em',color:'var(--plum)',marginTop:2}}>{v}</div>
          <div style={{fontFamily:'var(--mono)',fontSize:9,color:'#9a8674',marginTop:2}}>{sub}</div>
        </div>
      ))}
    </div>

    {/* radar */}
    <div style={{padding:'14px 20px 0'}}>
      <div style={{background:'#fff', borderRadius:14, border:'1px solid var(--line)', padding:'14px 16px', display:'flex', alignItems:'center', gap:14}}>
        <Radar size={100}/>
        <div style={{flex:1}}>
          <AIChip>AI · YOUR SHAPE</AIChip>
          <div style={{fontFamily:'Pretendard',fontWeight:600,fontSize:14,color:'var(--plum)',marginTop:6}}>매력·외모 균형형</div>
          <div style={{fontSize:11,color:'var(--plum-2)',marginTop:2,lineHeight:1.4}}>강남·송파에서 비슷한 분 23명, 활동 시간 일치하는 분 11명</div>
        </div>
      </div>
    </div>

    {/* stats */}
    <div style={{padding:'12px 20px 0', display:'flex', flexDirection:'column', gap:6}}>
      {[
        ['받은 매칭', '12'],
        ['보낸 좋아요', '8'],
        ['대화 중', '3'],
      ].map(([k,v])=>(
        <div key={k} style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 14px', background:'#fff', borderRadius:12, border:'1px solid var(--line)'}}>
          <span style={{fontSize:13,fontWeight:500,color:'var(--plum)'}}>{k}</span>
          <span className="tabular" style={{fontFamily:'var(--display)',fontWeight:700,fontSize:18,color:'var(--plum)',letterSpacing:'-.02em'}}>{v}</span>
        </div>
      ))}
    </div>
  </Phone>
);

Object.assign(window, { V2_Spec, V2_Total, V2_MatchList, V2_Chat, V2_Profile });
