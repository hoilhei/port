/* ILSANGECHA page interactions */


  // ---- 모바일 햄버거 메뉴 ----
  const topNav = document.querySelector('.top-nav');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  function setMobileMenu(open){
    if(!topNav || !navToggle) return;
    topNav.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  }

  if(navToggle){
    navToggle.addEventListener('click', () => {
      setMobileMenu(!topNav.classList.contains('is-open'));
    });
  }

  if(navMenu){
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMobileMenu(false));
    });
  }

  document.addEventListener('keydown', (event) => {
    if(event.key === 'Escape') setMobileMenu(false);
  });

  window.addEventListener('resize', () => {
    if(window.innerWidth > 760) setMobileMenu(false);
  });

  // ---- 상단 네비 메뉴: 클릭하면 각 섹션(앵커) 위치로 부드럽게 이동 ----
  document.querySelectorAll('.top-nav a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if(!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  // ---- 오늘의 차: 새로고침할 때 세 계열에서 한 종류씩 무작위 선택 ----
  const TODAY_TEA_POOLS = [
    [
      { en:'BLACK TEA', name:'홍차', time:'3 – 4분', temp:'95℃', method:'끓인 물로 진하게 우려 향과 단맛 즐기기', benefit:'폴리페놀과 카페인이 일상에 활력을 더해줘요' },
      { en:'OOLONG TEA', name:'우롱차', time:'3 – 4분', temp:'90℃', method:'찻잎이 충분히 펼쳐지도록 여러 번 우리기', benefit:'식후 입안을 깔끔하게 정돈하고 가벼운 기분을 도와요' },
      { en:'PU-ERH TEA', name:'보이차', time:'3 – 5분', temp:'100℃', method:'첫물은 짧게 헹군 뒤 깊고 진하게 우리기', benefit:'식후 편안한 소화와 따뜻한 마무리에 잘 어울려요' },
      { en:'HOJICHA', name:'호지차', time:'2 – 3분', temp:'90℃', method:'구수한 볶은 향이 살아나도록 따뜻하게 우리기', benefit:'부드러운 카페인과 구수한 향으로 편안한 휴식을 도와요' }
    ],
    [
      { en:'GREEN TEA', name:'녹차', time:'1 – 2분', temp:'70℃', method:'낮은 온도로 짧고 은은하게 우리기', benefit:'카테킨과 은은한 카페인이 산뜻한 활력을 더해줘요' },
      { en:'WHITE TEA', name:'백차', time:'4 – 5분', temp:'80℃', method:'여린 찻잎의 향을 천천히 부드럽게 우리기', benefit:'가벼운 폴리페놀을 담아 부담 없이 즐기기 좋아요' },
      { en:'JASMINE TEA', name:'자스민차', time:'2 – 3분', temp:'80℃', method:'꽃향이 흐려지지 않도록 가볍게 우리기', benefit:'은은한 꽃향이 긴장을 풀고 편안한 기분을 도와요' },
      { en:'YELLOW TEA', name:'황차', time:'2 – 3분', temp:'80℃', method:'맑은 단맛이 살아나도록 차분하게 우리기', benefit:'부드러운 맛으로 속 편한 휴식에 잘 어울려요' }
    ],
    [
      { en:'CHAMOMILE', name:'캐모마일', time:'5 – 6분', temp:'95℃', method:'뚜껑을 덮고 포근한 향 충분히 우리기', benefit:'편안한 휴식과 잠들기 전 차분한 루틴에 잘 어울려요' },
      { en:'ROOIBOS', name:'루이보스', time:'5 – 7분', temp:'100℃', method:'붉은 빛과 구수한 단맛이 나도록 오래 우리기', benefit:'카페인 없이 부드럽게 수분을 보충하기 좋아요' },
      { en:'HIBISCUS', name:'히비스커스', time:'4 – 5분', temp:'95℃', method:'새콤한 풍미가 선명해지도록 진하게 우리기', benefit:'상큼한 풍미로 나른한 기분을 깨우고 수분 보충을 도와요' },
      { en:'PEPPERMINT', name:'페퍼민트', time:'4 – 5분', temp:'95℃', method:'상쾌한 향을 위해 뚜껑을 덮어 우리기', benefit:'시원한 멘톨 향이 식후 답답함을 덜어주는 데 도움을 줘요' }
    ]
  ];

  const todayTeaCards = Array.from(document.querySelectorAll('.tea-card'));
  const chooseTea = (pool) => pool[Math.floor(Math.random() * pool.length)];
  const selectedTeas = TODAY_TEA_POOLS.map(chooseTea);

  // 연속 새로고침에서 세 종류가 모두 똑같이 반복되면 한 종류는 다시 선택한다.
  try {
    const storageKey = 'ilsangecha-today-teas';
    const previousNames = JSON.parse(sessionStorage.getItem(storageKey) || '[]');
    const currentNames = selectedTeas.map((tea) => tea.name);
    const isSameSet = previousNames.length === currentNames.length &&
      currentNames.every((name, index) => name === previousNames[index]);

    if(isSameSet){
      const changeIndex = Math.floor(Math.random() * selectedTeas.length);
      const alternatives = TODAY_TEA_POOLS[changeIndex].filter((tea) => tea.name !== selectedTeas[changeIndex].name);
      selectedTeas[changeIndex] = chooseTea(alternatives);
    }

    sessionStorage.setItem(storageKey, JSON.stringify(selectedTeas.map((tea) => tea.name)));
  } catch(error){
    // 저장소 접근이 제한된 환경에서도 무작위 선택 자체는 그대로 동작한다.
  }

  todayTeaCards.forEach((card, index) => {
    const tea = selectedTeas[index];
    if(!tea) return;

    const en = card.querySelector('[data-tea-en]');
    const name = card.querySelector('[data-tea-name]');
    const time = card.querySelector('[data-tea-time]');
    const temp = card.querySelector('[data-tea-temp]');
    const method = card.querySelector('[data-tea-method]');
    const benefit = card.querySelector('[data-tea-benefit]');

    if(en) en.textContent = tea.en;
    if(name) name.textContent = tea.name;
    if(time) time.textContent = tea.time;
    if(temp) temp.textContent = tea.temp;
    if(method) method.textContent = tea.method;
    if(benefit) benefit.textContent = tea.benefit;
    card.setAttribute('aria-label', `오늘의 차 ${tea.name}`);
  });

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('in');
      }
    });
  },{threshold:0.28});

  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  document.querySelectorAll('.tea-card').forEach((el,i)=>{
    // Reveal each tea card in sequence as the section enters after brewing.
    el.style.transitionDelay = i*0.22 + 's';
  });
  // ---- Hero pin: phase A(영상 이동 + 패널) → phase C(소개 커튼) → phase E(블렌딩 슬라이더) ----
  const heroPin = document.getElementById('heroPin');
  const heroMedia = document.getElementById('heroMedia');
  const heroPanel = document.getElementById('heroPanel');
  const scrollCue = document.getElementById('scrollCue');
  const heroVideo = document.querySelector('.hero-video');
  const hpLines = ['hp1','hp2','hp3','hp4'].map(id => document.getElementById(id));
  const sootheCurtain = document.getElementById('sootheCurtain');
  const sgLines = ['sg1','sg2','sg3','sg4','sg5','sg6','sg7'].map(id => document.getElementById(id));
  const section4Curtain = document.getElementById('section4Curtain');

  // Mobile browsers can reject the mobile file when its embedded audio codec
  // is unavailable, even though the video is muted. Retry autoplay explicitly
  // and fall back to the desktop H.264 file if the mobile source fails.
  if (heroVideo) {
  const mobileHeroSrc = 'videos/hero-mo02.mp4';
  const desktopHeroSrc = 'videos/hero.mp4';
  const isMobile = window.matchMedia('(max-width: 760px)').matches;

  heroVideo.muted = true;
  heroVideo.defaultMuted = true;
  heroVideo.setAttribute('muted', '');
  heroVideo.setAttribute('playsinline', '');
  heroVideo.setAttribute('webkit-playsinline', '');

  heroVideo.src = isMobile ? mobileHeroSrc : desktopHeroSrc;
  heroVideo.load();

  function playHeroVideo() {
    const playPromise = heroVideo.play();

    if (playPromise) {
      playPromise.catch(error => {
        console.log('영상 재생 오류:', error);
      });
    }
  }

  heroVideo.addEventListener('canplay', playHeroVideo, { once: true });
  document.addEventListener('touchstart', playHeroVideo, {
    once: true,
    passive: true
  });

  playHeroVideo();
}

  function getHeroPhaseSplits(){
    const mobile = window.innerWidth <= 760;
    const phaseA = mobile ? 100 : 120;
    const phaseC = mobile ? 80 : 100;
    const phaseD = mobile ? 20 : 220;
    const phaseE = mobile ? 80 : 120;
    const phaseF = 100;
    const total = phaseA + phaseC + phaseD + phaseE + phaseF;

    return {
      phaseAEnd:phaseA / total,
      sootheEnd:(phaseA + phaseC) / total,
      blendStart:(phaseA + phaseC + phaseD) / total,
      blendEnd:(phaseA + phaseC + phaseD + phaseE) / total
    };
  }

  function smoothstep(t){ return t * t * (3 - 2 * t); }

  function updateHero(){
    if(!heroPin) return;
    const {phaseAEnd,sootheEnd,blendStart,blendEnd} = getHeroPhaseSplits();
    const rect = heroPin.getBoundingClientRect();
    const total = heroPin.offsetHeight - window.innerHeight;
    let progress = total > 0 ? (-rect.top) / total : 0;
    progress = Math.min(Math.max(progress, 0), 1);

    // ---- Phase A: 히어로 영상 이동 + 좌측 패널/텍스트 펼침 ----
    const pA = Math.min(progress / phaseAEnd, 1);
    const easedA = smoothstep(pA);

    if(heroMedia){
      heroMedia.style.transform = `translateX(${easedA * 7}vw) scale(${1 + easedA * 0.05})`;
    }
    if(heroPanel){
      const viewportWidth = window.innerWidth;
      const contentGutter = Math.max(viewportWidth * 0.07, (viewportWidth - 1400) / 2);
      const panelTarget = viewportWidth < 760
        ? viewportWidth * 0.78
        : Math.max(viewportWidth * 0.34, contentGutter + 430);
      heroPanel.style.width = (easedA * panelTarget) + 'px';
    }
    hpLines.forEach((el, i) => {
      if(!el) return;
      const start = 0.16 + i * 0.14;
      const local = Math.min(Math.max((pA - start) / 0.16, 0), 1);
      if(local > 0.05){ el.classList.add('in'); } else { el.classList.remove('in'); }
    });
    if(scrollCue){
      scrollCue.style.opacity = progress < 0.03 ? 1 : 0;
    }

    // ---- Phase C: 소개 커튼이 아래에서 위로 올라와 덮는다 ----
    const pC = Math.min(Math.max((progress - phaseAEnd) / (sootheEnd - phaseAEnd), 0), 1);

    if(sootheCurtain){
      const bgEased = smoothstep(Math.min(pC / 0.6, 1));
      sootheCurtain.style.transform = `translateY(${(1 - bgEased) * 100}%)`;
    }
    sgLines.forEach((el, i) => {
      if(!el) return;
      const start = 0.32 + i * 0.08;
      const local = Math.min(Math.max((pC - start) / 0.14, 0), 1);
      if(local > 0.05){ el.classList.add('in'); } else { el.classList.remove('in'); }
    });

    // ---- Phase E: 블렌딩 상품 커튼이 오른쪽에서 왼쪽으로 들어온다 ----
    const pE = Math.min(Math.max((progress - blendStart) / (blendEnd - blendStart), 0), 1);
    if(section4Curtain){
      const bgEased = smoothstep(pE);
      section4Curtain.style.transform = `translateX(${(1 - bgEased) * 100}%)`;
    }
  }

  window.addEventListener('scroll', updateHero, {passive:true});
  window.addEventListener('resize', updateHero);
  updateHero();

  // ---- Section4 palette slider: drag to scroll + arrow buttons ----
  const paletteSlider = document.getElementById('paletteSlider');
  const palettePrev = document.getElementById('palettePrev');
  const paletteNext = document.getElementById('paletteNext');

  if(paletteSlider){
    let isDragging = false;
    let dragStartX = 0;
    let scrollStart = 0;
    let moved = false;

    paletteSlider.addEventListener('mousedown', (e) => {
      isDragging = true;
      moved = false;
      dragStartX = e.pageX;
      scrollStart = paletteSlider.scrollLeft;
      paletteSlider.classList.add('dragging');
    });

    window.addEventListener('mousemove', (e) => {
      if(!isDragging) return;
      const dx = e.pageX - dragStartX;
      if(Math.abs(dx) > 4) moved = true;
      paletteSlider.scrollLeft = scrollStart - dx;
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
      paletteSlider.classList.remove('dragging');
    });

    paletteSlider.addEventListener('click', (e) => {
      if(moved){ e.preventDefault(); e.stopPropagation(); }
    });

    // 터치 드래그 지원
    paletteSlider.addEventListener('touchstart', (e) => {
      isDragging = true;
      dragStartX = e.touches[0].pageX;
      scrollStart = paletteSlider.scrollLeft;
    }, {passive:true});
    paletteSlider.addEventListener('touchmove', (e) => {
      if(!isDragging) return;
      const dx = e.touches[0].pageX - dragStartX;
      paletteSlider.scrollLeft = scrollStart - dx;
    }, {passive:true});
    paletteSlider.addEventListener('touchend', () => { isDragging = false; });
  }

  if(palettePrev){
    palettePrev.addEventListener('click', () => {
      const slide = paletteSlider.querySelector('.p-slide');
      const gap = parseFloat(getComputedStyle(paletteSlider).gap) || 0;
      const distance = slide ? slide.getBoundingClientRect().width + gap : 260;
      paletteSlider.scrollBy({left: -distance, behavior: 'smooth'});
    });
  }
  if(paletteNext){
    paletteNext.addEventListener('click', () => {
      const slide = paletteSlider.querySelector('.p-slide');
      const gap = parseFloat(getComputedStyle(paletteSlider).gap) || 0;
      const distance = slide ? slide.getBoundingClientRect().width + gap : 260;
      paletteSlider.scrollBy({left: distance, behavior: 'smooth'});
    });
  }

  // ---- Footer tabs: 탭을 클릭하면 좌측 콘텐츠(제목/본문/이미지)가 바뀌고, 탭들은 항상 오른쪽에 붙어있다 ----
  const footerImage = document.getElementById('footerImage');
  const footerTitle = document.getElementById('footerTitle');
  const footerText = document.getElementById('footerText');
  const footerSns = document.getElementById('footerSns');

  const FOOTER_TEXTS = [
    `<p>운영시간 내 언제든 편하게 연락해 주세요.<br>hello@ilsangecha.kr &nbsp;·&nbsp; 02-1234-5678</p>`,
    `<p>서울시 마포구 어딘가길 12, 일상에차<br>매일 09:00 – 21:00 운영 (연중무휴)</p>`,
    `<p>제품, 협업, 대량 주문 등 개별 문의는 아래 메일로 남겨주시면 순차적으로 답변드립니다.<br>order@ilsangecha.kr</p>`,
    `<p>일상에차 멤버십 가입 시 매월 시음 세트와 생일 쿠폰을 드려요.<br>매장 방문 시 직원에게 문의해 주세요.</p>`
  ];

  document.querySelectorAll('.h-acc-head').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.h-acc-head').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const idx = Number(tab.dataset.index);
      if(footerTitle) footerTitle.textContent = tab.dataset.title;
      if(footerText) footerText.innerHTML = FOOTER_TEXTS[idx] || '';
      if(footerSns) footerSns.style.display = idx === 0 ? 'flex' : 'none';
      if(footerImage && tab.dataset.image){
        footerImage.style.display = '';
        footerImage.src = tab.dataset.image;
      }
    });
  });
