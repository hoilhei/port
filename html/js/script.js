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
    var y = window.scrollY || window.pageYOffset || 0;
    if(hero){
      var scrollRange = Math.max(hero.offsetHeight - window.innerHeight, 1);
      var heroProgress = clamp((y - hero.offsetTop) / scrollRange, 0, 1);
      // Resolve hero6 during the first half of the pinned scene, then hold it.
      var fadeProgress = smoothstep(clamp((heroProgress - .03) / .44, 0, 1));
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

  // Work carousel — center-focused slide with peeking neighbors, infinite seamless loop
  (function(){
   try{
    var root = document.getElementById('workCarousel');
    if(!root) return;
    var viewport = root.querySelector('.carousel-viewport');
    var track = document.getElementById('carouselTrack');
    var realSlides = Array.prototype.slice.call(track.querySelectorAll('.slide'));
    var realCount = realSlides.length;
    var dotsWrap = document.getElementById('carDots');
    var prevBtn = document.getElementById('carPrev');
    var nextBtn = document.getElementById('carNext');
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var autoplayTimer = null;

    // Two clones on each side keep the infinite carousel seamless.
    var prependClones = [realSlides[realCount - 2].cloneNode(true), realSlides[realCount - 1].cloneNode(true)];
    var appendClones = [realSlides[0].cloneNode(true), realSlides[1].cloneNode(true)];
    prependClones.concat(appendClones).forEach(function(c){ c.setAttribute('aria-hidden', 'true'); });
    prependClones.forEach(function(c){ track.insertBefore(c, realSlides[0]); });
    appendClones.forEach(function(c){ track.appendChild(c); });

    var slides = Array.prototype.slice.call(track.children);
    var realStart = 2, realEnd = realStart + realCount - 1;
    var activeIndex = realStart;

    realSlides.forEach(function(_, i){
      var dot = document.createElement('button');
      dot.className = 'car-dot';
      dot.setAttribute('aria-label', (i + 1) + '번째 프로젝트로 이동');
      dot.addEventListener('click', function(){ goTo(realStart + i); restartAutoplay(); });
      dotsWrap.appendChild(dot);
    });
    var dots = Array.prototype.slice.call(dotsWrap.children);

    var currentX = 0;
    function getFocusX(vw){
      var focusPercent = parseFloat(getComputedStyle(viewport).getPropertyValue('--carousel-focus-x'));
      if(!Number.isFinite(focusPercent)) focusPercent = 50;
      return vw * Math.max(0, Math.min(100, focusPercent)) / 100;
    }
    function render(instant, extraFreezeEls){
      var active = slides[activeIndex];
      if(!active) return; // defensive guard — never crash on an out-of-range index
      var vw = viewport.clientWidth;
      var center = active.offsetLeft + active.offsetWidth / 2;
      currentX = getFocusX(vw) - center;
      var frozen = [];
      if(instant){
        // Suppress transitions during resize and clone-boundary correction.
        var mediaEls = slides.map(function(slide){ return slide.querySelector('.slide-media'); }).filter(Boolean);
        frozen = [track].concat(mediaEls, extraFreezeEls || []);
        frozen.forEach(function(el){ el.style.transition = 'none'; });
      }
      track.style.transform = 'translateX(' + currentX + 'px)';
      slides.forEach(function(s, i){ s.classList.toggle('is-active', i === activeIndex); });
      var realIdx = ((activeIndex - realStart) % realCount + realCount) % realCount;
      dots.forEach(function(d, i){ d.classList.toggle('is-active', i === realIdx); });
      if(instant){
        void track.offsetWidth; // force a reflow while the swapped elements' transitions are suppressed
        frozen.forEach(function(el){ el.style.transition = ''; });
      }
    }
    function goTo(i){
      if(cloneCheckTimer){
        clearTimeout(cloneCheckTimer);
        cloneCheckTimer = null;
      }
      if(i > realEnd + 1){
        activeIndex = realStart;
        render(true);
        return;
      }
      if(i < realStart - 1){
        activeIndex = realEnd;
        render(true);
        return;
      }
      activeIndex = i;
      render();
      if(activeIndex === realStart - 1 || activeIndex === realEnd + 1){
        scheduleCloneCheck();
      }
    }
    function next(){ goTo(activeIndex + 1); }
    function prev(){ goTo(activeIndex - 1); }

    // Silently replace a boundary clone with its matching real slide.
    function correctClonePosition(){
      cloneCheckTimer = null;
      var nextIndex = null;
      if(activeIndex === realStart - 1) nextIndex = realEnd;
      else if(activeIndex === realEnd + 1) nextIndex = realStart;
      if(nextIndex === null) return;
      activeIndex = nextIndex;
      var incomingPanel = slides[activeIndex].querySelector('.slide-panel');
      render(true, incomingPanel ? [incomingPanel] : []);
    }
    var cloneCheckTimer = null;
    function getCloneCorrectionDelay(){
      var rawDuration = getComputedStyle(track).getPropertyValue('--carousel-transition-duration').trim();
      var duration = parseFloat(rawDuration);
      if(!Number.isFinite(duration)) return 930;
      var durationMs = /ms$/i.test(rawDuration) ? duration : duration * 1000;
      return durationMs + 80;
    }
    function scheduleCloneCheck(){
      if(cloneCheckTimer) clearTimeout(cloneCheckTimer);
      cloneCheckTimer = setTimeout(correctClonePosition, getCloneCorrectionDelay());
    }

    function startAutoplay(){
      if(reduceMotion) return;
      stopAutoplay();
      autoplayTimer = setInterval(next, 4500);
    }
    function stopAutoplay(){ if(autoplayTimer){ clearInterval(autoplayTimer); autoplayTimer = null; } }
    function restartAutoplay(){ startAutoplay(); }

    prevBtn.addEventListener('click', function(){ prev(); restartAutoplay(); });
    nextBtn.addEventListener('click', function(){ next(); restartAutoplay(); });
    window.addEventListener('resize', function(){ render(true); });

    // Drag / swipe support
    var isDragging = false, dragStartX = 0, dragDelta = 0;
    track.style.cursor = 'grab';
    function dragStart(x){
      isDragging = true; dragStartX = x; dragDelta = 0;
      track.style.transition = 'none';
      track.style.cursor = 'grabbing';
      stopAutoplay();
    }
    function dragMove(x){
      if(!isDragging) return;
      dragDelta = x - dragStartX;
      track.style.transform = 'translateX(' + (currentX + dragDelta) + 'px)';
    }
    function dragEnd(){
      if(!isDragging) return;
      isDragging = false;
      track.style.transition = '';
      track.style.cursor = 'grab';
      var threshold = 60;
      if(dragDelta <= -threshold){ next(); }
      else if(dragDelta >= threshold){ prev(); }
      else { render(); }
      restartAutoplay();
    }
    track.addEventListener('pointerdown', function(e){
      if(e.button !== 0) return;
      // Keep the web popup arrow from being captured as a carousel drag.
      if(e.target.closest('.lightbox-trigger')) return;
      dragStart(e.clientX);
      track.setPointerCapture && track.setPointerCapture(e.pointerId);
    });
    track.addEventListener('pointermove', function(e){ dragMove(e.clientX); });
    track.addEventListener('pointerup', dragEnd);
    track.addEventListener('pointercancel', dragEnd);
    track.addEventListener('dragstart', function(e){ e.preventDefault(); }); // stop native image/link drag ghosting

    render(true);
    if(reduceMotion){
      if(playBtn) playBtn.style.display = 'none';
    } else {
      startAutoplay();
    }
   } catch(e){ console.error('Work carousel init failed:', e); }
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

      if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){
        projectSection.classList.add('is-static');
        items.forEach(function(item){
          item.card.style.opacity = '1';
          item.card.style.transform = 'translateY(' + (item.row * item.card.offsetHeight) + 'px)';
        });
        return;
      }

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
        if(!document.hidden && renderServiceCards() && !isPaused && !isDragging) elapsed += delta;
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
    window.scrollTo(0, lightboxPageScrollY);
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
    lightboxImg.alt = btn.getAttribute('data-lightbox-title') || '';
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
    lockLightboxPage();
    lightbox.classList.add('is-open');
    if(!isVideo && lightboxImg.complete) window.requestAnimationFrame(fitBannerLightbox);
  }
  function closeLightbox(){
    lightbox.classList.remove('is-open');
    unlockLightboxPage();
    lightboxVideo.pause();
    lightboxScroll.scrollTop = 0;
  }
  // Each project card opens its own image and text in the lightbox.
  // The arrow owns its popup data directly, so SVG clicks and hover state cannot break it.
  var projectCards = document.querySelector('#project .cards');
  if(projectCards){
    function openProjectCard(card, button){
      var image = card.querySelector('.card-photo img');
      var title = card.querySelector('h3');
      var desc = card.querySelector('.card-body p');
      if(!image) return;
      button.setAttribute('data-lightbox-src', button.getAttribute('data-popup-image') || image.getAttribute('src'));
      button.setAttribute('data-lightbox-title', button.getAttribute('data-popup-title') || (title ? title.textContent.trim() : image.alt));
      button.setAttribute('data-lightbox-desc', desc ? desc.textContent.trim() : '');
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

  // About file tabs
  var aboutTabBtns = document.querySelectorAll('.about-file-tab');
  var aboutTabPanels = document.querySelectorAll('.about-tab-panel');
  aboutTabBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      var target = btn.getAttribute('data-about-tab');
      aboutTabBtns.forEach(function(tab){
        var isActive = tab === btn;
        tab.classList.toggle('is-active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
      aboutTabPanels.forEach(function(panel){
        var isActive = panel.getAttribute('data-about-panel') === target;
        panel.classList.toggle('is-active', isActive);
        panel.hidden = !isActive;
      });
    });
  });
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function(e){ if(e.target === lightbox) closeLightbox(); });
  if(lightboxPrev) lightboxPrev.addEventListener('click', function(){ moveWebPopup(-1); });
  if(lightboxNext) lightboxNext.addEventListener('click', function(){ moveWebPopup(1); });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeLightbox();
    if(!lightbox.classList.contains('is-open')) return;
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
      var isDown = false, startX = 0, startScroll = 0, moved = false;

      cards.forEach(function(card){
        var image = card.querySelector('.journal-photo img');
        if(!image) return;
        var title = card.querySelector('.journal-body h4');
        var desc = card.querySelector('.journal-body p');
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', (title ? title.textContent.trim() : image.alt) + ' 크게 보기');

        function openJournalCard(){
          card.setAttribute('data-lightbox-src', image.currentSrc || image.src);
          card.setAttribute('data-lightbox-title', title ? title.textContent.trim() : image.alt);
          card.setAttribute('data-lightbox-desc', desc ? desc.textContent.trim() : '');
          card.setAttribute('data-lightbox-kind', 'banner');
          openLightbox(card);
        }

        card.addEventListener('click', function(){
          if(moved) return;
          openJournalCard();
        });
        card.addEventListener('keydown', function(e){
          if(e.key !== 'Enter' && e.key !== ' ') return;
          e.preventDefault();
          openJournalCard();
        });
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
        if(e.pointerType === 'touch') return; // let touch use native scrolling
        isDown = true; moved = false;
        startX = e.clientX;
        startScroll = scroller.scrollLeft;
        scroller.classList.add('is-dragging');
        scroller.setPointerCapture && scroller.setPointerCapture(e.pointerId);
      });
      scroller.addEventListener('pointermove', function(e){
        if(!isDown) return;
        var delta = e.clientX - startX;
        // A small pointer wobble during a normal click must not cancel the card popup.
        if(Math.abs(delta) > 10) moved = true;
        scroller.scrollLeft = startScroll - delta;
      });
      function endDrag(){
        isDown = false;
        scroller.classList.remove('is-dragging');
      }
      scroller.addEventListener('pointerup', endDrag);
      scroller.addEventListener('pointercancel', endDrag);
      scroller.addEventListener('pointerleave', endDrag);
      // prevent the drag from being interpreted as a click on a card link
      scroller.addEventListener('click', function(e){
        if(!moved) return;
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }, true);
    } catch(e){ console.error('Journal drag init failed:', e); }
  })();

})();
