(function(){
  const clamp = (v,min,max)=>Math.max(min,Math.min(max,v));
  const vh = ()=> window.innerHeight;

  const s1 = document.getElementById('s1');
  const fitline = document.getElementById('fitline');
  const fitThumb = document.getElementById('fitThumb');
  const footer = document.getElementById('s6');

  const trackContent = document.getElementById('trackContent');
  const panelContent = document.querySelector('.panel-content');

  const brandText = document.getElementById('mBrandText');
  const brandPhoto = document.getElementById('mBrandPhoto');
  const c1Title = document.getElementById('c1Title');
  const c1w1Cards = Array.from(document.querySelectorAll('.c1w1 .fly-card'));
  const c1w2Cards = Array.from(document.querySelectorAll('.c1w2 .fly-card'));
  const procBg = document.getElementById('procBg');
  const procText = document.getElementById('mProcText');
  const procPhoto = document.getElementById('mProcPhoto');
  const processSlides = Array.from(document.querySelectorAll('#s5stack .ph'));

  // ---- flying element helper -----------------------------------------------
  // s = 0 → in place. s = 1 → off to the left (either "not arrived yet" or
  // "already exited"). Entering therefore reads as a left→right move, and
  // exiting reads as a right→left move — both anchored on the SAME left side.
  function flyState(p, inS, inE, outS, outE){
    if (inE <= inS){
      if (p < inS) return {op:0, s:1};
    } else if (p < inS){
      return {op:0, s:1};
    } else if (p < inE){
      const l = (p - inS) / (inE - inS);
      return {op:l, s:1 - l};
    }
    if (outS == null || p < outS) return {op:1, s:0};
    if (p < outE){
      const l = (p - outS) / (outE - outS);
      return {op:1 - l, s:l};
    }
    return {op:0, s:1};
  }

  function applyFly(el, state, dist){
    dist = dist || 110;
    el.style.opacity = state.op;
    el.style.transform = `translateX(${-state.s * dist}px)`;
    el.style.pointerEvents = state.op > 0.05 ? 'auto' : 'none';
  }

  // splits a base window into N staggered per-item windows, so a group of
  // cards enters/exits ONE BY ONE rather than all together
  function stagger(baseS, baseE, idx, count){
    const span = baseE - baseS;
    const dur = span * 0.62;
    const step = count > 1 ? (span - dur) / (count - 1) : 0;
    const s = baseS + step * idx;
    return [s, s + dur];
  }

  function applyStaggeredGroup(cards, inS, inE, outS, outE, p, dist){
    cards.forEach((el, i) => {
      const [is_, ie_] = stagger(inS, inE, i, cards.length);
      let os_ = null, oe_ = null;
      if (outS != null){ [os_, oe_] = stagger(outS, outE, i, cards.length); }
      applyFly(el, flyState(p, is_, ie_, os_, oe_), dist);
    });
  }

  function applyProcessSlides(slides, p, start, end){
    if (!slides.length) return;
    const progress = clamp((p - start) / Math.max(end - start, 0.0001), 0, 0.999999);
    const step = 1 / slides.length;
    const transition = step * 0.34;

    slides.forEach((el, i)=>{
      const slideStart = i * step;
      const slideEnd = slideStart + step;

      if (progress < slideStart){
        el.style.opacity = '0';
        el.style.transform = 'translateX(100%)';
      } else if (progress < slideStart + transition){
        const enter = (progress - slideStart) / transition;
        el.style.opacity = enter;
        el.style.transform = `translateX(${(1 - enter) * 100}%)`;
      } else if (progress < slideEnd || i === slides.length - 1){
        el.style.opacity = '1';
        el.style.transform = 'translateX(0)';
      } else {
        el.style.opacity = '0';
        el.style.transform = 'translateX(-100%)';
      }
    });
  }

  // ---- stage boundaries along the merged panel's internal progress (0..1) --
  const CB = {
    brandOutS:0.04, brandOutE:0.13,
    c1TitleInS:0.13, c1TitleInE:0.19, c1TitleOutS:0.42, c1TitleOutE:0.48,
    c1w1InS:0.13, c1w1InE:0.23, c1w1OutS:0.27, c1w1OutE:0.35,
    c1w2InS:0.27, c1w2InE:0.39, c1w2OutS:0.42, c1w2OutE:0.48,
    procInS:0.48, procInE:0.58,
    procSlidesInS:0.50, procSlidesInE:0.98
  };

  function update(){
    const scrollY = window.scrollY || window.pageYOffset;
    const H = vh();

    // ---------- merged content : one-time arrival, then flying elements ----------
    const top = trackContent.offsetTop;
    const height = trackContent.offsetHeight;
    const scrollable = Math.max(height - H, 1);
    const local = clamp(scrollY - top, 0, scrollable);

    const slideRange = H;
    const panRange = Math.max(scrollable - slideRange, 1);
    const slideProgress = clamp(local / slideRange, 0, 1);
    const p = clamp((local - slideRange) / panRange, 0, 1);

    // brand
    applyFly(brandText, flyState(p, 0, 0, CB.brandOutS, CB.brandOutE), 120);
    applyFly(brandPhoto, flyState(p, 0, 0, CB.brandOutS + 0.02, CB.brandOutE + 0.02), 160);

    // titles
    applyFly(c1Title, flyState(p, CB.c1TitleInS, CB.c1TitleInE, CB.c1TitleOutS, CB.c1TitleOutE), 60);
    // collection cards — each flies in/out one by one
    applyStaggeredGroup(c1w1Cards, CB.c1w1InS, CB.c1w1InE, CB.c1w1OutS, CB.c1w1OutE, p, 140);
    applyStaggeredGroup(c1w2Cards, CB.c1w2InS, CB.c1w2InE, CB.c1w2OutS, CB.c1w2OutE, p, 140);

    // process : the background fills the screen and images slide in one by one
    const bgState = flyState(p, CB.procInS, CB.procInS + 0.08, null, null);
    procBg.style.opacity = bgState.op;
    applyFly(procText, flyState(p, CB.procInS, CB.procInS + 0.08, null, null), 120);
    procPhoto.style.opacity = p < CB.procSlidesInS ? '0' : '1';
    procPhoto.style.transform = 'none';
    applyProcessSlides(processSlides, p, CB.procSlidesInS, CB.procSlidesInE);

    // arrival slide + release once fully scrolled past
    if (local >= scrollable){
      s1.style.visibility = 'hidden';
      panelContent.style.position = 'absolute';
      panelContent.style.top = scrollable + 'px';
      panelContent.style.transform = 'translateX(0%)';
    } else {
      s1.style.visibility = 'visible';
      panelContent.style.position = 'fixed';
      panelContent.style.top = '0px';
      panelContent.style.transform = `translateX(${(1 - slideProgress) * 100}%)`;
    }

    // ---------- "fit" progress bar : reaches 100% right as the footer arrives, ----------
    // ---------- then hides so it never sits on top of the footer ----------
    const footerTop = footer.offsetTop;
    const progressEnd = Math.max(footerTop - H, 1);
    const overall = clamp(scrollY / progressEnd, 0, 1);
    fitThumb.style.left = (overall * 100) + '%';
    fitline.style.opacity = (scrollY >= footerTop - H * 0.1) ? '0' : '1';
    fitline.style.pointerEvents = (scrollY >= footerTop - H * 0.1) ? 'none' : 'auto';

    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);

  // craft video play/pause toggle
  const craftVideo = document.getElementById('craftVideo');
  const videoPlayBtn = document.getElementById('videoPlayBtn');
  const iconPlay = document.getElementById('iconPlay');
  const iconPause = document.getElementById('iconPause');
  if (videoPlayBtn && craftVideo){
    videoPlayBtn.addEventListener('click', ()=>{
      if (craftVideo.paused){
        craftVideo.play();
        iconPlay.style.display = 'none';
        iconPause.style.display = '';
      } else {
        craftVideo.pause();
        iconPlay.style.display = '';
        iconPause.style.display = 'none';
      }
    });
  }

  // smooth in-page nav
  document.querySelectorAll('.nav-menu a').forEach(a=>{
    a.addEventListener('click', e=>{
      e.preventDefault();
      const target = document.getElementById(a.getAttribute('href').slice(1));
      if (target) window.scrollTo({top: target.offsetTop, behavior:'smooth'});
    });
  });

  // "back to top" in the footer
  const toTop = document.querySelector('.to-top');
  if (toTop){
    toTop.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));
  }
})();
