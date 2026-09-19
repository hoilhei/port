(function(){
  // Intro scene: keep the first image pinned while the second image and title
  // style fade in with the scroll position.
  var nav = document.getElementById('nav');
  var topBtn = document.getElementById('topBtn');
  var hero = document.getElementById('top');
  var heroBase = hero && hero.querySelector('.hero-image-base');
  var heroNext = hero && hero.querySelector('.hero-image-next');
  var titlePrimary = hero && hero.querySelector('.hero-title');
  var titleSecondary = hero && hero.querySelector('.hero-title-secondary');
  function clamp(value, min, max){ return Math.max(min, Math.min(max, value)); }
  function smoothstep(value){ return value * value * (3 - 2 * value); }
  function updateIntroScene(){
    if(document.documentElement.classList.contains('lightbox-open')) return;
    var y = window.scrollY || window.pageYOffset || 0;
    if(hero){
      var scrollRange = Math.max(hero.offsetHeight - window.innerHeight, 1);
      var heroProgress = clamp((y - hero.offsetTop) / scrollRange, 0, 1);
      // Fade across most of the pinned scene, then hold the completed image.
      var fadeProgress = smoothstep(clamp((heroProgress - .03) / .72, 0, 1));
      if(heroBase) heroBase.style.opacity = String(1 - fadeProgress);
      if(heroNext) heroNext.style.opacity = String(fadeProgress);
      if(titlePrimary) titlePrimary.style.opacity = String(1 - fadeProgress);
      if(titleSecondary) titleSecondary.style.opacity = String(fadeProgress);
      // Switch while hero6 is still pinned, immediately before the next
      // section starts to enter the viewport.
      nav.classList.toggle('is-scrolled', heroProgress >= .999);
    }
    if(topBtn) topBtn.classList.toggle('is-visible', y > 500);
  }
  window.addEventListener('scroll', updateIntroScene, {passive:true});
  window.addEventListener('resize', updateIntroScene);
  updateIntroScene();

  // Mobile menu
  var burger = document.getElementById('burgerBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  var mobileMenuClose = document.getElementById('mobileMenuClose');
  burger.addEventListener('click', function(){
    var open = mobileMenu.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open);
  });
  mobileMenuClose.addEventListener('click', function(){
    mobileMenu.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  });
  mobileMenu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ mobileMenu.classList.remove('is-open'); });
  });

  // Tabs
  var tabBtns = document.querySelectorAll('.tab-btn');
  var panels = document.querySelectorAll('.tab-panel');
  tabBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      tabBtns.forEach(function(b){ b.classList.remove('is-active'); b.setAttribute('aria-selected','false'); });
      panels.forEach(function(p){ p.classList.remove('is-active'); });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected','true');
      document.querySelector('.tab-panel[data-panel="'+btn.dataset.tab+'"]').classList.add('is-active');
    });
  });

  // Project summaries and case-study copy share one source of truth.
  var projectStories = [
    {name:'DELIBIRDY', category:'Personal Brand Project',
      summary:'식물을 고르는 경험과 브랜드 스토리를 연결한 반응형 웹사이트입니다.',
      role:'UI Design · Responsive Publishing',
      concept:'식물과 사람의 일상을 중심으로 브랜드의 이야기를 전달합니다. 캠페인 이미지와 상품 정보를 연결해 브랜드를 이해하고 식물을 탐색하는 흐름을 구성했습니다.',
      screens:'PC의 넓은 캠페인 화면과 모바일의 상품 탐색 화면을 함께 구성했습니다. 대표 목업에서 두 화면의 정보 배치와 시각적 위계를 확인할 수 있습니다.',
      focus:'브랜드 스토리, 상품 탐색, 가드닝 콘텐츠가 하나의 경험으로 이어지도록 화면을 설계했습니다.',
      process:['반응형 웹 리서치와 콘텐츠 기획','브랜드 방향을 반영한 UI 디자인','HTML·CSS를 활용한 화면 구현']},
    {name:'DAILY TEA', category:'Personal Brand Project',
      summary:'일상 속 차 한 잔의 휴식을 담은 브랜드 웹사이트입니다.',
      role:'Brand Design · UI Design · Content Production',
      concept:'차를 마시는 일상의 휴식을 브랜드 경험으로 표현합니다. 웹 화면과 로고, 패키지의 시각적 방향을 연결하는 데 집중했습니다.',
      screens:'대표 목업에 담긴 PC·모바일 화면을 통해 브랜드 콘텐츠의 배치와 화면별 구성을 확인할 수 있습니다.',
      focus:'브랜드 이미지와 AI 영상을 활용해 일상의 휴식을 시각적으로 전달합니다.',
      process:['휴식을 주제로 브랜드 방향 정리','로고·패키지 및 UI/UX 디자인','AI 영상 제작과 웹 화면 구성']},
    {name:'FOREST', category:'Personal Brand Project',
      summary:'바디 제품의 첫인상을 전달하는 런칭 랜딩페이지입니다.',
      role:'Landing Page Design · Responsive Publishing',
      concept:'제품 런칭에 필요한 브랜드 이미지와 제품 정보를 하나의 랜딩페이지에 담았습니다. 제품의 분위기를 전달하는 비주얼을 중심으로 구성했습니다.',
      screens:'대표 목업에서 제품 중심의 랜딩 화면 구성과 콘텐츠의 배치 방향을 확인할 수 있습니다.',
      focus:'AI 영상과 웹 퍼블리싱을 함께 활용해 제품의 인상을 전달하는 화면을 작업했습니다.',
      process:['제품 런칭 화면 방향 정리','비주얼과 AI 영상 제작','랜딩페이지 퍼블리싱']},
    {name:'HWAWOON', category:'Personal Brand Project',
      summary:'이미지와 영상으로 브랜드의 이야기를 전달하는 소개 웹사이트입니다.',
      role:'Brand Design · Responsive Publishing',
      concept:'화장품 브랜드의 소개를 이미지와 영상 중심으로 풀어냈습니다. 브랜드의 분위기와 정보를 함께 전달하는 화면을 구성했습니다.',
      screens:'대표 목업에서 브랜드 소개 화면과 주요 비주얼의 구성을 확인할 수 있습니다.',
      focus:'브랜드 이미지와 영상 콘텐츠를 연결해 브랜드가 가진 인상을 전달합니다.',
      process:['브랜드 소개 콘텐츠 정리','이미지·영상 중심의 화면 디자인','HTML·CSS 웹 화면 구현']},
    {name:'Lehnen', category:'Personal Brand Project · In Progress',
      summary:'내 몸에 꼭 맞는 나만의 의자를 소개하는 가구 웹사이트를 제작하고 있습니다.',
      role:'Web Design · Responsive Publishing',
      concept:'의자를 선택하는 경험을 중심으로 가구 브랜드의 웹 화면을 구상하고 있습니다.',
      screens:'현재 제작 중인 화면의 목업입니다. 최종 화면과 구성은 작업 과정에서 변경될 수 있습니다.',
      focus:'제품의 특징과 브랜드 이미지를 전달하는 화면을 작업 중입니다.',
      process:['브랜드와 제품 방향 정리','화면 디자인 진행','웹 퍼블리싱 진행']}
  ];

  // One selected project: large mockup, independent summary, explicit actions.
  (function(){
    var root = document.getElementById('workCarousel');
    if(!root) return;
    var slides = Array.from(root.querySelectorAll('.slide'));
    var tabs = document.getElementById('carDots');
    var selected = 0;
    slides.forEach(function(slide, i){
      var story = projectStories[i];
      if(!story) return;
      var panel = slide.querySelector('.slide-panel');
      var button = slide.querySelector('.lightbox-trigger');
      button.dataset.storyIndex = String(i);
      button.className = 'project-detail-btn lightbox-trigger';
      button.textContent = '프로젝트 자세히 보기';
      button.setAttribute('aria-label', story.name + ' 프로젝트 자세히 보기');
      button.setAttribute('aria-haspopup', 'dialog');
      panel.querySelector('h4').textContent = story.name;
      panel.querySelector('.slide-cat').textContent = story.category;
      panel.querySelector('.slide-desc').textContent = story.summary;
      var indexLabel = panel.querySelector('.slide-index');
      if(indexLabel) indexLabel.textContent = String(i + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
      var role = document.createElement('p');
      role.className = 'project-role';
      role.textContent = story.role;
      panel.appendChild(role);
      var actions = document.createElement('div');
      actions.className = 'project-actions';
      actions.appendChild(button);
      var site = button.getAttribute('data-popup-project');
      if(site){
        var link = document.createElement('a');
        link.className = 'project-site-link';
        link.href = site;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = '사이트 보기 ↗';
        actions.appendChild(link);
      } else {
        var status = document.createElement('span');
        status.className = 'project-site-pending';
        status.textContent = '사이트 제작 중';
        actions.appendChild(status);
      }
      panel.appendChild(actions);
      var tab = document.createElement('button');
      tab.type = 'button';
      tab.className = 'car-dot';
      tab.textContent = story.name;
      tab.setAttribute('aria-label', story.name + ' 프로젝트 선택');
      tab.addEventListener('click', function(){ selectProject(i); });
      tabs.appendChild(tab);
    });
    function selectProject(index){
      selected = (index + slides.length) % slides.length;
      slides.forEach(function(slide, i){
        slide.hidden = i !== selected;
        slide.classList.toggle('is-active', i === selected);
      });
      Array.from(tabs.children).forEach(function(tab, i){
        tab.classList.toggle('is-active', i === selected);
        tab.setAttribute('aria-pressed', String(i === selected));
      });
    }
    document.getElementById('carPrev').addEventListener('click', function(){ selectProject(selected - 1); });
    document.getElementById('carNext').addEventListener('click', function(){ selectProject(selected + 1); });
    selectProject(0);
  })();

  // Project cards — endless vertical slider with two desktop columns and one mobile column.
  (function(){
    try{
      var stage = document.querySelector('#project .cards');
      if(!stage) return;
      var projectSection = document.getElementById('project');
      var processSection = document.getElementById('process');
      var isMobileProject = window.matchMedia && window.matchMedia('(max-width:767px)').matches;

      function goToProcessSection(){
        if(!processSection) return;
        var navHeight = nav ? nav.getBoundingClientRect().height : 0;
        var processTop = processSection.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({top:Math.max(0, processTop - navHeight), behavior:'smooth'});
      }

      var baseCards = Array.prototype.slice.call(stage.querySelectorAll('.card'));
      if(baseCards.length < 2) return;

      var columnCount = isMobileProject ? 1 : 2;

      var items = baseCards.map(function(card, i){
        return {card:card, column:i % columnCount, row:Math.floor(i / columnCount)};
      });

      function place(item){
        item.card.style.top = isMobileProject ? '0' : '40px';
        item.card.style.left = isMobileProject ? '8%' : (item.column === 0 ? '24px' : 'auto');
        item.card.style.right = isMobileProject ? 'auto' : (item.column === 1 ? '24px' : 'auto');
        item.card.classList.remove('is-settled');
      }
      items.forEach(place);

      // Recompute columns when resizing across the mobile breakpoint.
      window.addEventListener('resize', function(){
        isMobileProject = window.matchMedia('(max-width:767px)').matches;
        columnCount = isMobileProject ? 1 : 2;
        items.forEach(function(item, i){
          item.column = i % columnCount;
          item.row = Math.floor(i / columnCount);
          place(item);
        });
      });

      var reduceProjectMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      var speed = isMobileProject ? 30 : 38;
      var elapsed = 0;
      var previousTime = null;
      var isPaused = false;
      var isDragging = false;
      var dragStartY = 0;
      var dragStartOffset = 0;
      var dragOffset = 0;
      var dragMoved = false;
      var dragCount = 0;
      var suppressCardClickUntil = 0;
      var sectionChangeStarted = false;
      var DRAGS_TO_NEXT_SECTION = 2;

      stage.style.cursor = 'grab';
      stage.style.touchAction = 'none';
      stage.addEventListener('mouseenter', function(){ isPaused = true; });
      stage.addEventListener('mouseleave', function(){ if(!isDragging) isPaused = false; });
      stage.addEventListener('pointerdown', function(e){
        if(e.button !== 0) return;
        // Let the project arrow receive its own click event; never capture it as a drag.
        if(e.target.closest('.work-link')) return;
        isDragging = true;
        isPaused = true;
        dragMoved = false;
        stage.classList.remove('is-dragging');
        dragStartY = e.clientY;
        dragStartOffset = dragOffset;
        stage.style.cursor = 'grabbing';
        stage.setPointerCapture && stage.setPointerCapture(e.pointerId);
      });
      stage.addEventListener('pointermove', function(e){
        if(!isDragging) return;
        if(Math.abs(e.clientY - dragStartY) > 6){
          dragMoved = true;
          stage.classList.add('is-dragging');
        }
        dragOffset = dragStartOffset + dragStartY - e.clientY;
        renderServiceCards();
      });
      function endServiceDrag(e){
        if(!isDragging) return;
        isDragging = false;
        stage.style.cursor = 'grab';
        if(dragMoved){
          dragCount += 1;
          suppressCardClickUntil = Date.now() + 250;
          window.projectCardClickLockUntil = suppressCardClickUntil;
          if(dragCount >= DRAGS_TO_NEXT_SECTION && !sectionChangeStarted && processSection){
            sectionChangeStarted = true;
            isPaused = true;
            window.setTimeout(function(){
              goToProcessSection();
            }, 180);
          }
        }
        setTimeout(function(){ stage.classList.remove('is-dragging'); }, 0);
        if(stage.releasePointerCapture && e && stage.hasPointerCapture && stage.hasPointerCapture(e.pointerId)){
          stage.releasePointerCapture(e.pointerId);
        }
      }
      stage.addEventListener('pointerup', endServiceDrag);
      stage.addEventListener('pointercancel', endServiceDrag);

      function renderServiceCards(){
        if(document.documentElement.classList.contains('lightbox-open')) return false;
        var rect = projectSection.getBoundingClientRect();
        var isVisible = rect.bottom > 0 && rect.top < window.innerHeight;
        // Reveal the project cards when the section top reaches the first-third
        // line of the viewport, instead of waiting for a fixed scroll distance.
        var revealLine = window.innerHeight / 3;
        var cardsReady = rect.top <= revealLine && rect.bottom > 0;
        var cardsEnding = cardsReady && rect.bottom <= revealLine;
        stage.classList.toggle('is-ready', cardsReady);
        stage.classList.toggle('is-ending', cardsEnding);
        if(!isVisible || !cardsReady) return false;

        var stageHeight = stage.clientHeight;
        var cardHeight = items[0].card.offsetHeight;
        // CSS controls the extra space between project card rows.
        var cardGap = parseFloat(getComputedStyle(stage).getPropertyValue('--project-card-gap')) || 60;
        var step = cardHeight + cardGap;
        var rowsPerColumn = Math.ceil(items.length / columnCount);
        var cycleHeight = step * rowsPerColumn;
        var initialOffset = Math.max(0, cycleHeight - stageHeight);

        items.forEach(function(item){
          var columnPhase = columnCount > 1 ? item.column * step * .5 : 0;
          var y = item.row * step - (((elapsed * speed + dragOffset) + initialOffset + columnPhase) % cycleHeight);
          while(y < -cardHeight) y += cycleHeight;
          item.card.style.transform = 'translateY(' + y + 'px)';
          item.card.style.opacity = '1';
        });

        return isVisible;
      }

      function animateServiceCards(now){
        if(previousTime === null) previousTime = now;
        var delta = Math.min(50, now - previousTime) / 1000;
        previousTime = now;
        if(!document.hidden && renderServiceCards() && !reduceProjectMotion && !isPaused && !isDragging) elapsed += delta;
        window.requestAnimationFrame(animateServiceCards);
      }

      renderServiceCards();
      window.requestAnimationFrame(animateServiceCards);
    } catch(e){ console.error('Services slider init failed:', e); }
  })();


  // Reveal on scroll
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:.15});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }

  // Back to top
  topBtn.addEventListener('click', function(){
    window.scrollTo({top:0, behavior:'smooth'});
  });

  // Work lightbox — clicking a card's arrow opens a popup with that project's image
  // Process media can be switched from image to video by changing only
  // data-media-type="video" and data-media-src on the .step-media element.
  document.querySelectorAll('.step-media').forEach(function(media){
    var src = media.getAttribute('data-media-src') || '';
    var type = (media.getAttribute('data-media-type') || 'image').toLowerCase();
    if(!src || type !== 'video') return;
    var video = document.createElement('video');
    video.src = src;
    video.controls = true;
    video.playsInline = true;
    video.preload = 'metadata';
    media.replaceChildren(video);
  });

  var lightbox = document.getElementById('lightboxOverlay');
  var lightboxPanel = lightbox.querySelector('.lightbox');
  var lightboxScroll = lightbox.querySelector('.lightbox-scroll');
  var lightboxClose = document.getElementById('lightboxClose');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxVideo = document.getElementById('lightboxVideo');
  var lightboxTitle = document.getElementById('lightboxTitle');
  var lightboxDesc = document.getElementById('lightboxDesc');
  var lightboxPeriod = document.getElementById('lightboxPeriod');
  var lightboxTools = document.getElementById('lightboxTools');
  var lightboxPageScrollY = 0;
  function lockLightboxPage(){
    if(document.documentElement.classList.contains('lightbox-open')) return;
    lightboxPageScrollY = window.scrollY || document.documentElement.scrollTop || 0;
    document.documentElement.classList.add('lightbox-open');
    document.body.classList.add('lightbox-open');
    document.body.style.position = 'fixed';
    document.body.style.top = '-' + lightboxPageScrollY + 'px';
    document.body.style.left = '0';
    document.body.style.width = '100%';
  }
  function unlockLightboxPage(){
    if(!document.documentElement.classList.contains('lightbox-open')) return;
    document.documentElement.classList.remove('lightbox-open');
    document.body.classList.remove('lightbox-open');
    document.body.style.removeProperty('position');
    document.body.style.removeProperty('top');
    document.body.style.removeProperty('left');
    document.body.style.removeProperty('width');
    // Override the document's smooth scrolling when restoring the locked page.
    window.scrollTo({top:lightboxPageScrollY, left:0, behavior:'instant'});
    updateIntroScene();
  }
  function resetBannerLightboxSize(){
    lightboxPanel.style.removeProperty('width');
    lightboxPanel.style.removeProperty('height');
  }
  function fitBannerLightbox(){
    if(!lightboxPanel.classList.contains('is-banner-popup') || !lightboxImg.naturalWidth || !lightboxImg.naturalHeight) return;

    var overlayStyle = getComputedStyle(lightbox);
    var horizontalPadding = parseFloat(overlayStyle.paddingLeft) + parseFloat(overlayStyle.paddingRight);
    var verticalPadding = parseFloat(overlayStyle.paddingTop) + parseFloat(overlayStyle.paddingBottom);
    var availableWidth = Math.max(1, window.innerWidth - horizontalPadding);
    var availableHeight = Math.max(1, window.innerHeight - verticalPadding);
    var scale = Math.min(
      1,
      availableWidth / lightboxImg.naturalWidth,
      availableHeight / lightboxImg.naturalHeight
    );

    lightboxPanel.style.width = Math.round(lightboxImg.naturalWidth * scale) + 'px';
    lightboxPanel.style.height = Math.round(lightboxImg.naturalHeight * scale) + 'px';
  }
  lightboxImg.addEventListener('load', fitBannerLightbox);
  window.addEventListener('resize', fitBannerLightbox);
  function getToolMark(tool){
    var name = tool.toLowerCase();
    if(/^ai\s*\(/i.test(name)) return '✦';
    if(name === 'ai' || name.indexOf('gemini') !== -1) return '✦';
    if(name.indexOf('gpt') !== -1) return '◎';
    if(name.indexOf('codex') !== -1) return '⌘';
    if(name.indexOf('claude') !== -1) return 'Cl';
    if(name.indexOf('google flow') !== -1) return 'Gf';
    if(name.indexOf('midjourney') !== -1) return 'Mj';
    if(name.indexOf('figma') !== -1) return 'Fi';
    if(name.indexOf('photoshop') !== -1) return 'Ps';
    if(name.indexOf('illustrator') !== -1) return 'Ai';
    if(name.indexOf('after effects') !== -1) return 'Ae';
    if(name.indexOf('premiere') !== -1) return 'Pr';
    if(name.indexOf('html') !== -1) return '</>';
    if(name.indexOf('css') !== -1) return '#';
    return tool.slice(0, 2).toUpperCase();
  }
  function splitToolList(value){
    var tools = [];
    var current = '';
    var depth = 0;
    Array.from(value || '').forEach(function(char){
      if(char === '(') depth += 1;
      if(char === ')') depth = Math.max(0, depth - 1);
      if(char === ',' && depth === 0){
        if(current.trim()) tools.push(current.trim());
        current = '';
        return;
      }
      current += char;
    });
    if(current.trim()) tools.push(current.trim());
    return tools;
  }
  function renderLightboxTools(value){
    if(!lightboxTools) return;
    lightboxTools.replaceChildren();
    splitToolList(value).forEach(function(tool){
      var item = document.createElement('span');
      item.className = 'lightbox-tool';
      item.title = tool;
      var icon = document.createElement('span');
      icon.className = 'lightbox-tool-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = getToolMark(tool);
      var label = document.createElement('span');
      label.className = 'lightbox-tool-name';
      label.textContent = tool;
      item.append(icon, label);
      lightboxTools.appendChild(item);
    });
  }
  var webPopupTriggers = Array.prototype.slice.call(document.querySelectorAll('#web .slide:not([aria-hidden="true"]) .lightbox-trigger'));
  var lightboxPopupIndex = -1;
  var lightboxPrev = document.getElementById('lightboxPrev');
  var lightboxNext = document.getElementById('lightboxNext');
  function getPopupTitle(btn){
    return btn.getAttribute('data-popup-title') || btn.getAttribute('data-lightbox-title') || '';
  }
  function findWebPopupIndex(btn){
    var index = webPopupTriggers.indexOf(btn);
    if(index !== -1) return index;
    var title = getPopupTitle(btn);
    index = webPopupTriggers.findIndex(function(trigger){
      return getPopupTitle(trigger) === title;
    });
    if(index !== -1) return index;
    var image = btn.getAttribute('data-popup-image') || '';
    return webPopupTriggers.findIndex(function(trigger){ return trigger.getAttribute('data-popup-image') === image; });
  }
  function updateLightboxNavigation(btn){
    var isWebPopup = !!btn.closest('#web');
    lightboxPopupIndex = isWebPopup ? findWebPopupIndex(btn) : -1;
  }
  function moveWebPopup(step){
    if(lightboxPopupIndex < 0 || !webPopupTriggers.length) return;
    var nextIndex = (lightboxPopupIndex + step + webPopupTriggers.length) % webPopupTriggers.length;
    openLightbox(webPopupTriggers[nextIndex]);
  }
  function updateWebLightboxLinks(btn){
    lightbox.querySelectorAll('.web-lightbox-action').forEach(function(link){
      var action = link.getAttribute('data-lightbox-action');
      var path = action ? btn.getAttribute('data-popup-' + action) : '';
      link.href = path || '#';
      link.hidden = !path;
    });
  }
  function openLightbox(btn){
    // Always show a newly opened popup from the top.
    lightboxScroll.scrollTop = 0;
    resetBannerLightboxSize();
    var videoSrc = btn.getAttribute('data-popup-video') || '';
    var mediaSrc = btn.getAttribute('data-popup-image') || btn.getAttribute('data-lightbox-src') || '';
    var isVideo = !!videoSrc || /\.(mp4|webm|ogg)(\?.*)?$/i.test(videoSrc || mediaSrc);
    var isProjectPopup = btn.getAttribute('data-lightbox-kind') === 'project';
    var isBannerPopup = btn.getAttribute('data-lightbox-kind') === 'banner';
    var isWebPopup = btn.getAttribute('data-lightbox-kind') === 'web' || !!btn.closest('#web');
    lightboxPanel.classList.toggle('case-study', isWebPopup);
    var popupTitle = getPopupTitle(btn).toUpperCase();
    lightboxPanel.classList.toggle('is-project-only', isProjectPopup);
    lightboxPanel.classList.toggle('is-banner-popup', isBannerPopup);
    lightboxPanel.classList.toggle('is-web-popup', isWebPopup);
    updateLightboxNavigation(btn);
    lightboxPanel.classList.toggle('is-delibirdy', isWebPopup && popupTitle.indexOf('DELIBIRDY') !== -1);
    lightboxPanel.classList.toggle('is-daily-tea', isWebPopup && popupTitle.indexOf('DAILY TEA') !== -1);
    lightboxImg.style.display = isVideo ? 'none' : 'block';
    lightboxVideo.hidden = !isVideo;
    lightboxVideo.pause();
    lightboxVideo.removeAttribute('src');
    lightboxVideo.load();
    if(isVideo){
      lightboxVideo.src = videoSrc || mediaSrc;
      lightboxVideo.load();
    } else {
      lightboxImg.src = mediaSrc;
    }
    lightboxImg.alt = btn.getAttribute('data-popup-alt') || btn.getAttribute('data-lightbox-alt') || btn.getAttribute('data-lightbox-title') || '';
    lightboxTitle.textContent = btn.getAttribute('data-lightbox-title') || '';
    var popupStatus = btn.getAttribute('data-popup-status') || '';
    if(popupStatus){
      var statusSpan = document.createElement('span');
      statusSpan.className = 'lightbox-title-status';
      statusSpan.textContent = popupStatus;
      lightboxTitle.appendChild(statusSpan);
    }
    lightboxDesc.textContent = btn.getAttribute('data-lightbox-desc') || '';
    if(lightboxPeriod) lightboxPeriod.textContent = btn.getAttribute('data-popup-period') || '—';
    renderLightboxTools(btn.getAttribute('data-popup-tools') || '');
    updateWebLightboxLinks(btn);
    renderProjectStudy(btn, isWebPopup);
    lockLightboxPage();
    lightbox.classList.add('is-open');
    lightboxReturnFocus = btn;
    lightboxClose.focus({preventScroll:true});
    if(!isVideo && lightboxImg.complete) window.requestAnimationFrame(fitBannerLightbox);
  }
  function closeLightbox(){
    lightbox.classList.remove('is-open');
    unlockLightboxPage();
    lightboxVideo.pause();
    lightboxScroll.scrollTop = 0;
    if(lightboxReturnFocus && lightboxReturnFocus.isConnected) lightboxReturnFocus.focus({preventScroll:true});
  }
  var lightboxReturnFocus = null;
  function renderProjectStudy(btn, enabled){
    lightboxScroll.querySelectorAll('.case-study-body').forEach(function(el){ el.remove(); });
    lightbox.querySelectorAll('.case-study-role').forEach(function(el){ el.remove(); });
    if(!enabled) return;
    var story = projectStories[Number(btn.dataset.storyIndex)];
    if(!story) return;
    lightboxTitle.textContent = story.name;
    lightboxDesc.textContent = story.summary;
    var role = document.createElement('p');
    role.className = 'case-study-role';
    role.textContent = '담당 범위 · ' + story.role;
    lightboxDesc.after(role);
    lightbox.querySelectorAll('.web-lightbox-action').forEach(function(link){ link.textContent = '사이트 방문 ↗'; });
    var body = document.createElement('div');
    body.className = 'case-study-body';
    function section(title, copy){
      var section = document.createElement('section');
      var heading = document.createElement('h4');
      heading.textContent = title;
      var paragraph = document.createElement('p');
      paragraph.textContent = copy;
      section.append(heading, paragraph);
      body.appendChild(section);
      return section;
    }
    section('01 / 프로젝트 개요', btn.getAttribute('data-lightbox-desc') || story.summary);
    section('02 / 디자인 콘셉트', story.concept);
    section('03 / 화면 구성', story.screens);
    section('04 / 주요 UI · 콘텐츠', story.focus);
    var process = section('05 / 작업 과정', '기획에서 디자인, 구현까지의 작업 범위');
    var list = document.createElement('ol');
    story.process.forEach(function(copy){
      var item = document.createElement('li');
      item.textContent = copy;
      list.appendChild(item);
    });
    process.appendChild(list);
    lightboxScroll.appendChild(body);
  }
  // Each project card opens its own image and text in the lightbox.
  // The arrow owns its popup data directly, so SVG clicks and hover state cannot break it.
  var projectCards = document.querySelector('#project .cards');
  if(projectCards){
    function openProjectCard(card, button){
      var image = card.querySelector('.card-photo img');
      var title = card.querySelector('h3');
      var desc = button.getAttribute('data-popup-description') || '';
      var fallbackDesc = card.querySelector('.card-detail');
      if(!desc && fallbackDesc) desc = fallbackDesc.textContent.trim();
      if(!image) return;
      button.setAttribute('data-lightbox-src', button.getAttribute('data-popup-image') || image.getAttribute('src'));
      button.setAttribute('data-lightbox-title', button.getAttribute('data-popup-title') || (title ? title.textContent.trim() : image.alt));
      button.setAttribute('data-lightbox-alt', button.getAttribute('data-popup-alt') || image.alt);
      button.setAttribute('data-lightbox-desc', desc);
      button.setAttribute('data-lightbox-kind', 'project');
      openLightbox(button);
    }

    projectCards.querySelectorAll('.work-link').forEach(function(button){
      button.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        var card = button.closest('.card');
        if(card) openProjectCard(card, button);
      });
    });

    projectCards.addEventListener('click', function(e){
      var card = e.target.closest('#project .card');
      if(!card || e.target.closest('.work-link') || projectCards.classList.contains('is-dragging') || Date.now() < (window.projectCardClickLockUntil || 0)) return;
      var trigger = card.querySelector('.work-link');
      if(!trigger) return;
      e.preventDefault();
      openProjectCard(card, trigger);
    });
  }
  document.querySelectorAll('.lightbox-trigger, [data-lightbox-src]').forEach(function(btn){
    btn.addEventListener('click', function(e){
      e.preventDefault();
      openLightbox(btn);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function(e){ if(e.target === lightbox) closeLightbox(); });
  if(lightboxPrev) lightboxPrev.addEventListener('click', function(){ moveWebPopup(-1); });
  if(lightboxNext) lightboxNext.addEventListener('click', function(){ moveWebPopup(1); });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeLightbox();
    if(!lightbox.classList.contains('is-open')) return;
    if(e.key === 'Tab'){
      var focusable = Array.from(lightbox.querySelectorAll('button, a[href], video[controls]')).filter(function(el){
        return !el.hidden && el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden' && getComputedStyle(el).opacity !== '0';
      });
      var first = focusable[0], last = focusable[focusable.length - 1];
      if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    }
    if(e.key === 'ArrowLeft') moveWebPopup(-1);
    if(e.key === 'ArrowRight') moveWebPopup(1);
  });

  // The UI/UX subpage's Web link returns to this page and reopens the related popup.
  var popupParam = new URLSearchParams(window.location.search).get('popup');
  if(popupParam){
    var popupTrigger = Array.prototype.slice.call(document.querySelectorAll('#web .lightbox-trigger')).find(function(btn){
      return btn.getAttribute('data-popup-id') === popupParam;
    });
    if(popupTrigger) window.requestAnimationFrame(function(){ openLightbox(popupTrigger); });
  }

  // Journal — drag to scroll horizontally with the mouse (touch already scrolls natively)
  (function(){
    try{
      var scroller = document.querySelector('.journal-scroll');
      if(!scroller) return;
      var slider = document.getElementById('journalSlider');
      var currentLabel = document.getElementById('journalSliderCurrent');
      var totalLabel = document.getElementById('journalSliderTotal');
      var cards = Array.prototype.slice.call(scroller.querySelectorAll('.journal-card'));
      var isDown = false, startX = 0, startScroll = 0, moved = false, suppressClickUntil = 0;

      function openJournalCard(card){
        if(!card) return;
        var image = card.querySelector('.journal-photo img');
        if(!image) return;
        var title = card.querySelector('.journal-body h4');
        var desc = card.querySelector('.journal-description') || card.querySelector('.journal-body p');
        card.setAttribute('data-lightbox-src', image.currentSrc || image.getAttribute('src') || image.src);
        card.setAttribute('data-lightbox-title', title ? title.textContent.trim() : image.alt);
        card.setAttribute('data-lightbox-alt', image.alt);
        card.setAttribute('data-lightbox-desc', desc ? desc.textContent.trim() : '');
        card.setAttribute('data-lightbox-kind', 'banner');
        openLightbox(card);
      }

      cards.forEach(function(card){
        var image = card.querySelector('.journal-photo img');
        if(!image) return;
        var title = card.querySelector('.journal-body h4');
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-haspopup', 'dialog');
        card.setAttribute('aria-label', (title ? title.textContent.trim() : image.alt) + ' 크게 보기');

        card.addEventListener('keydown', function(e){
          if(e.key !== 'Enter' && e.key !== ' ') return;
          e.preventDefault();
          openJournalCard(card);
        });
      });

      // Delegate clicks from the scroller so image/text descendants all open
      // the same card popup. A completed drag is filtered out below.
      scroller.addEventListener('click', function(e){
        if(moved || Date.now() < suppressClickUntil){
          e.preventDefault();
          e.stopPropagation();
          moved = false;
          return;
        }
        var card = e.target.closest('.journal-card');
        if(!card || !scroller.contains(card)) return;
        e.preventDefault();
        openJournalCard(card);
      });

      function updateJournalSlider(){
        if(!slider) return;
        var maxScroll = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
        var progress = maxScroll ? (scroller.scrollLeft / maxScroll) * 100 : 0;
        slider.value = progress;

        if(currentLabel && cards.length){
          var closestIndex = 0;
          var closestDistance = Infinity;
          cards.forEach(function(card, index){
            var distance = Math.abs(card.offsetLeft - scroller.scrollLeft);
            if(distance < closestDistance){
              closestDistance = distance;
              closestIndex = index;
            }
          });
          currentLabel.textContent = String(closestIndex + 1).padStart(2, '0');
        }
      }

      if(totalLabel && cards.length) totalLabel.textContent = String(cards.length).padStart(2, '0');
      if(slider){
        slider.addEventListener('input', function(){
          var maxScroll = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
          scroller.scrollLeft = maxScroll * (Number(slider.value) / 100);
        });
      }
      scroller.addEventListener('scroll', updateJournalSlider, {passive:true});
      window.addEventListener('resize', updateJournalSlider);
      updateJournalSlider();
      scroller.addEventListener('pointerdown', function(e){
        if(e.pointerType === 'touch' || e.button !== 0) return; // let touch use native scrolling
        isDown = true; moved = false;
        startX = e.clientX;
        startScroll = scroller.scrollLeft;
        scroller.classList.add('is-dragging');
      });
      scroller.addEventListener('pointermove', function(e){
        if(!isDown) return;
        var delta = e.clientX - startX;
        // A small pointer wobble during a normal click must not cancel the card popup.
        if(Math.abs(delta) > 10) moved = true;
        scroller.scrollLeft = startScroll - delta;
      });
      function endDrag(){
        var completedDrag = moved;
        isDown = false;
        scroller.classList.remove('is-dragging');
        // Suppress only the synthetic click immediately following a drag.
        if(completedDrag) suppressClickUntil = Date.now() + 250;
        moved = false;
      }
      scroller.addEventListener('pointerup', endDrag);
      scroller.addEventListener('pointercancel', endDrag);
      scroller.addEventListener('pointerleave', endDrag);
    } catch(e){ console.error('Journal drag init failed:', e); }
  })();

})();
