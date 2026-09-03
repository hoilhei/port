document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const escapeHTML = (value) => String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character]);

  const products = [
    {
      name: "올리브 트리 & 테라코타 슬릿 팟",
      category: "SIGNATURE TREE",
      price: 89000,
      mark: "Olive",
      tone: "#899078",
      image: "images/sub_02.jpg",
      description: "은빛 잎이 공간에 차분한 리듬을 더하는 올리브 트리 큐레이션입니다.",
    },
    {
      name: "아우드리 고무나무 & 러스틱 샌드 팟",
      category: "INDOOR GREEN",
      price: 72000,
      mark: "Ficus",
      tone: "#65735b",
      image: "images/r-6.png",
      description: "벨벳처럼 부드러운 잎과 모래빛 화분이 자연스럽게 어우러집니다.",
    },
    {
      name: "여인초 & 라탄 바스켓 팟",
      category: "TROPICAL",
      price: 96000,
      mark: "Bird of paradise",
      tone: "#778b67",
      image: "images/r-4.jpg",
      description: "넓게 펼쳐지는 잎이 거실에 풍성하고 시원한 인상을 만듭니다.",
    },
    {
      name: "보스턴 고사리 & 크래프트 팟",
      category: "PET FRIENDLY",
      price: 46000,
      mark: "Fern",
      tone: "#879a74",
      image: "images/r-3.png",
      description: "섬세한 잎이 부드러운 그림자를 만드는 반려동물 친화 식물입니다.",
    },
    {
      name: "스킨답서스 & 테라조 행잉 팟",
      category: "HANGING",
      price: 39000,
      mark: "Pothos",
      tone: "#748267",
      image: "images/r-5.jpg",
      description: "늘어지는 잎의 선이 선반과 창가에 자연스러운 생기를 더합니다.",
    },
  ];

  const reviews = [
    { author: "김하늘", product: products[0].name, comment: "포장이 단단하고 잎 상태도 정말 좋았어요. 거실 분위기가 한결 편안해졌습니다." },
    { author: "이서윤", product: products[1].name, comment: "화분의 질감과 잎 색이 잘 어울려요. 관리 안내도 이해하기 쉬웠습니다." },
    { author: "박지우", product: products[3].name, comment: "고양이와 함께 지내도 부담이 적은 식물을 골라줘서 만족해요." },
    { author: "정민준", product: products[4].name, comment: "빈 선반에 두었더니 공간이 훨씬 자연스럽게 살아났어요." },
  ];

  const money = new Intl.NumberFormat("ko-KR");
  const productDetailUrl = (index) => `./detail.html?product=${index}`;
  let cartCount = 0;

  function showToast(message) {
    const toast = $("#toast-container");
    const text = $("#toast-text");
    if (!toast || !text) return;
    text.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2400);
  }

  function setupMissingAssetFallbacks() {
    $$("img").forEach((image) => {
      const markMissing = () => {
        image.classList.add("asset-missing");
        image.setAttribute("aria-hidden", "true");
      };
      image.addEventListener("error", markMissing, { once: true });
      if (image.complete && image.naturalWidth === 0) markMissing();
    });

    const heroVideo = $(".slide-media:is(video)");
    if (heroVideo) {
      heroVideo.addEventListener("error", () => heroVideo.classList.add("asset-missing"), { once: true });
      heroVideo.play().catch(() => heroVideo.setAttribute("controls", ""));
    }

    $$(".lookbook-panel").forEach((panel) => {
      const match = panel.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/);
      if (!match) return;
      const probe = new Image();
      probe.addEventListener("error", () => panel.classList.add("asset-missing"), { once: true });
      probe.src = match[1];
    });
  }

  function setupMobileMenu() {
    const openButton = $("#mobile-menu-btn");
    const closeButton = $("#close-menu-btn");
    const nav = $("#desktop-nav");
    if (!openButton || !closeButton || !nav) return;
    const mobileQuery = window.matchMedia("(max-width: 1024px)");
    const preventPageScroll = (event) => {
      if (nav.classList.contains("is-open")) event.preventDefault();
    };

    const setOpen = (isOpen) => {
      const wasOpen = nav.classList.contains("is-open");
      isOpen = mobileQuery.matches && isOpen;
      nav.classList.toggle("is-open", isOpen);
      nav.inert = mobileQuery.matches && !isOpen;
      if (mobileQuery.matches) nav.setAttribute("aria-hidden", String(!isOpen));
      else nav.removeAttribute("aria-hidden");
      openButton.setAttribute("aria-expanded", String(isOpen));
      openButton.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
      document.body.classList.toggle("menu-open", isOpen);
      if (isOpen) {
        window.requestAnimationFrame(() => closeButton.focus({ preventScroll: true }));
      } else if (wasOpen && mobileQuery.matches) {
        window.requestAnimationFrame(() => openButton.focus({ preventScroll: true }));
      }
    };

    openButton.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
    closeButton.addEventListener("click", () => setOpen(false));
    $$("a", nav).forEach((link) => link.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("is-open")) setOpen(false);
    });
    mobileQuery.addEventListener("change", () => setOpen(false));
    document.addEventListener("wheel", preventPageScroll, { passive: false });
    document.addEventListener("touchmove", preventPageScroll, { passive: false });
    setOpen(false);
  }

  function setupMottoCards() {
    const section = $("#story.motto-section");
    const cards = $$(".motto-card", section || document);
    if (!section || !cards.length) return;

    const reveal = () => cards.forEach((card, index) => {
      window.setTimeout(() => card.classList.add("is-visible", "flip-enabled"), index * 110);
    });

    const toggleCard = (card) => {
      const flipped = card.classList.toggle("is-flipped");
      card.setAttribute("aria-pressed", String(flipped));
    };

    cards.forEach((card) => {
      card.addEventListener("click", () => toggleCard(card));
      card.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        toggleCard(card);
      });
    });

    if (!("IntersectionObserver" in window)) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      reveal();
      currentObserver.disconnect();
    }, { threshold: 0.12 });
    observer.observe(section);
  }

  function setupHeroMottoTransition() {
    const transition = $("#hero-motto-transition");
    const hero = $(".hero-section", transition || document);
    const motto = $("#story");
    if (!transition || !hero || !motto) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      motto.classList.add("is-scroll-revealed");
      return;
    }

    let scrollCount = 0;
    let lastGestureAt = 0;
    let gestureLocked = false;
    let completed = false;
    let touchStartY = null;
    let touchDeltaY = 0;

    const pageTop = (element) => element.getBoundingClientRect().top + window.scrollY;
    const isTransitionActive = () => {
      if (completed) return false;
      const mottoTop = pageTop(motto);
      return window.scrollY < mottoTop - window.innerHeight * 0.3;
    };
    const mottoCenterTarget = () => Math.max(
      0,
      pageTop(motto) + (motto.offsetHeight - window.innerHeight) / 2,
    );

    const moveToMotto = () => {
      completed = true;
      motto.classList.add("is-scroll-revealed");
      window.scrollTo({ top: mottoCenterTarget(), behavior: "smooth" });
    };

    const countScrollGesture = () => {
      const now = performance.now();
      if (now - lastGestureAt < 650 || gestureLocked) return;
      lastGestureAt = now;
      gestureLocked = true;
      scrollCount += 1;

      if (scrollCount >= 2) {
        moveToMotto();
      } else {
        const firstStep = pageTop(transition) + Math.min(hero.offsetHeight * 0.72, window.innerHeight * 0.8);
        window.scrollTo({ top: firstStep, behavior: "smooth" });
      }

      window.setTimeout(() => { gestureLocked = false; }, 650);
    };

    transition.addEventListener("wheel", (event) => {
      if (event.deltaY <= 0 || !isTransitionActive()) return;
      event.preventDefault();
      countScrollGesture();
    }, { passive: false });

    transition.addEventListener("touchstart", (event) => {
      if (!isTransitionActive()) return;
      touchStartY = event.touches[0]?.clientY ?? null;
      touchDeltaY = 0;
    }, { passive: true });

    transition.addEventListener("touchmove", (event) => {
      if (touchStartY === null || !isTransitionActive()) return;
      touchDeltaY = (event.touches[0]?.clientY ?? touchStartY) - touchStartY;
      if (touchDeltaY < -12) event.preventDefault();
    }, { passive: false });

    transition.addEventListener("touchend", () => {
      if (touchStartY !== null && touchDeltaY < -35 && isTransitionActive()) countScrollGesture();
      touchStartY = null;
      touchDeltaY = 0;
    }, { passive: true });

    window.addEventListener("scroll", () => {
      if (!completed && window.scrollY <= pageTop(transition) + 24) scrollCount = 0;
    }, { passive: true });
  }

  function renderProducts() {
    const track = $("#product-track");
    if (!track) return;
    track.innerHTML = products.map((product, index) => `
      <article class="product-card" id="product-${index}">
        <div class="product-visual" style="--product-tone:${product.tone}" role="group" aria-label="${product.name} 상품 이미지">
          <a class="product-image-link" href="${productDetailUrl(index)}" aria-label="${product.name} product details">
            <img class="product-shop-image" src="${product.image}" alt="${product.name}" />
          </a>
          <span class="product-mark">${product.mark}</span>
          <div class="product-hover-actions" aria-label="상품 바로가기">
            <button class="product-hover-action product-hover-cart" type="button" data-add-cart="${index}">장바구니 담기</button>
            <a class="product-hover-action product-hover-detail" href="${productDetailUrl(index)}">이동하기 <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <div class="product-info">
          <span class="product-category">${product.category}</span>
          <h3><a class="product-name-link" href="${productDetailUrl(index)}">${product.name}</a></h3>
          <div class="product-meta">
            <strong>${money.format(product.price)}원</strong>
            <button type="button" class="add-cart-btn" data-add-cart="${index}">담기</button>
          </div>
        </div>
      </article>
    `).join("");

    track.addEventListener("click", (event) => {
      const cartButton = event.target.closest("[data-add-cart]");
      if (cartButton) addToCart(Number(cartButton.dataset.addCart));
    });

    setupShopCarousel(track);
  }

  function setupShopCarousel(track) {
    const carousel = track.closest(".slider-wrapper");
    const originalCards = $$(".product-card", track);
    if (!carousel || originalCards.length < 3) return;

    const cloneCount = Math.min(3, originalCards.length);
    const prepareClone = (card) => {
      const clone = card.cloneNode(true);
      clone.classList.add("is-clone");
      clone.removeAttribute("id");
      clone.setAttribute("aria-hidden", "true");
      $$("button, a, input, select, textarea", clone).forEach((control) => {
        control.setAttribute("tabindex", "-1");
      });
      return clone;
    };

    const before = document.createDocumentFragment();
    originalCards.slice(-cloneCount).forEach((card) => before.append(prepareClone(card)));
    track.insertBefore(before, track.firstChild);
    originalCards.slice(0, cloneCount).forEach((card) => track.append(prepareClone(card)));

    const cards = $$(".product-card", track);
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let position = cloneCount;
    let step = 0;
    let autoPlayTimer;
    let pointerId = null;
    let startX = 0;
    let dragX = 0;
    let hovered = false;
    let focused = false;
    let suppressClick = false;

    const activeOffset = () => mobileQuery.matches ? 0 : 1;
    const updateActiveCard = () => {
      const activeIndex = position + activeOffset();
      cards.forEach((card, index) => card.classList.toggle("is-active", index === activeIndex));
    };

    const measure = () => {
      const trackStyles = window.getComputedStyle(track);
      const gap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap) || 0;
      step = cards[0].offsetWidth + gap;
    };

    const render = (animate = true, offset = 0) => {
      if (!step) measure();
      track.classList.toggle("no-transition", !animate);
      track.style.transform = `translate3d(${-(position * step) + offset}px, 0, 0)`;
      updateActiveCard();
      if (!animate) {
        window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
          track.classList.remove("no-transition");
        }));
      }
    };

    const clearAutoPlay = () => window.clearTimeout(autoPlayTimer);
    const scheduleAutoPlay = () => {
      clearAutoPlay();
      if (reduceMotionQuery.matches || hovered || focused || pointerId !== null || document.hidden) return;
      autoPlayTimer = window.setTimeout(() => {
        position += 1;
        render(true);
        scheduleAutoPlay();
      }, 3400);
    };

    const move = (direction) => {
      position += direction;
      render(true);
      scheduleAutoPlay();
    };

    carousel.addEventListener("click", (event) => {
      if (!suppressClick) return;
      event.preventDefault();
      event.stopPropagation();
    }, true);

    carousel.addEventListener("pointerdown", (event) => {
      if (event.target.closest(".product-hover-actions")) return;
      if (event.button !== 0 || pointerId !== null) return;
      pointerId = event.pointerId;
      startX = event.clientX;
      dragX = 0;
      suppressClick = false;
      clearAutoPlay();
      carousel.classList.add("is-dragging");
      carousel.setPointerCapture?.(pointerId);
    });

    carousel.addEventListener("pointermove", (event) => {
      if (event.pointerId !== pointerId) return;
      dragX = event.clientX - startX;
      if (Math.abs(dragX) > 5) suppressClick = true;
      render(false, dragX);
    });

    const finishDrag = (event) => {
      if (event.pointerId !== pointerId) return;
      const completedPointerId = pointerId;
      pointerId = null;
      carousel.classList.remove("is-dragging");
      if (carousel.hasPointerCapture?.(completedPointerId)) {
        carousel.releasePointerCapture(completedPointerId);
      }
      const threshold = Math.min(80, step * 0.18);
      if (Math.abs(dragX) >= threshold) move(dragX < 0 ? 1 : -1);
      else render(true);
      if (suppressClick) window.setTimeout(() => { suppressClick = false; }, 0);
      scheduleAutoPlay();
    };

    carousel.addEventListener("pointerup", finishDrag);
    carousel.addEventListener("pointercancel", finishDrag);

    cards.forEach((card) => {
      card.addEventListener("click", (event) => {
        if (suppressClick || event.target.closest("[data-add-cart], .product-hover-actions")) return;
        const activeIndex = position + activeOffset();
        const cardIndex = cards.indexOf(card);
        if (cardIndex === activeIndex) return;
        event.preventDefault();
        event.stopPropagation();
        position += cardIndex - activeIndex;
        render(true);
        scheduleAutoPlay();
      });
    });

    carousel.addEventListener("mouseenter", () => {
      hovered = true;
      clearAutoPlay();
    });
    carousel.addEventListener("mouseleave", () => {
      hovered = false;
      scheduleAutoPlay();
    });
    carousel.addEventListener("focusin", () => {
      focused = true;
      clearAutoPlay();
    });
    carousel.addEventListener("focusout", () => {
      window.setTimeout(() => {
        focused = carousel.contains(document.activeElement);
        scheduleAutoPlay();
      }, 0);
    });

    track.addEventListener("transitionend", (event) => {
      if (event.target !== track || event.propertyName !== "transform") return;
      if (position >= cloneCount + originalCards.length) {
        position = cloneCount;
        render(false);
      } else if (position <= cloneCount - 1) {
        position = cloneCount + originalCards.length - 1;
        render(false);
      }
    });

    const bindArrow = (selector, direction) => {
      const button = $(selector);
      if (!button) return;
      button.addEventListener("pointerdown", (event) => {
        event.stopPropagation();
        clearAutoPlay();
      });
      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        move(direction);
      });
    };

    bindArrow("#btn-prev", -1);
    bindArrow("#btn-next", 1);

    const syncLayout = () => {
      measure();
      render(false);
      scheduleAutoPlay();
    };
    mobileQuery.addEventListener("change", syncLayout);
    reduceMotionQuery.addEventListener("change", scheduleAutoPlay);
    document.addEventListener("visibilitychange", scheduleAutoPlay);
    if ("ResizeObserver" in window) new ResizeObserver(syncLayout).observe(carousel);
    else window.addEventListener("resize", syncLayout);

    syncLayout();
    scheduleAutoPlay();
  }

  function addToCart(index) {
    const product = products[index];
    if (!product) return;
    cartCount += 1;
    const badge = $("#cart-badge");
    if (badge) badge.textContent = String(cartCount);
    showToast(`${product.name}을(를) 장바구니에 담았습니다.`);
  }

  function setupLookbook() {
    const container = $("#lookbook");
    const button = $("#lookbook-more-btn");
    const wrap = button?.closest(".lookbook-more-wrap");
    if (!container || !button || !wrap) return;
    const panels = $$(".lookbook-panel", container);
    let expanded = false;

    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const sync = () => {
      const mobile = mobileQuery.matches;
      panels.forEach((panel, index) => panel.classList.toggle("is-mobile-hidden", mobile && !expanded && index >= 2));
      container.classList.toggle("is-expanded", mobile && expanded);
      wrap.hidden = !(mobile && !expanded && panels.length > 2);
      button.setAttribute("aria-expanded", String(expanded));
    };

    button.addEventListener("click", () => {
      expanded = true;
      sync();
    });
    mobileQuery.addEventListener("change", () => {
      expanded = false;
      sync();
    });
    sync();
  }

  function setupPlanner() {
    const result = $("#planner-result-target");
    if (!result) return;
    const state = { sunlight: "high", care: "beginner", friendly: "yes", scale: "large" };
    const recommendations = {
      pet: { name: "보스턴 고사리", note: "반려동물과 함께하는 공간에 비교적 안심하고 둘 수 있어요.", icon: "🌿", productIndex: 3 },
      shade: { name: "스킨답서스", note: "은은한 빛에서도 잘 자라며 물 주기가 비교적 간단해요.", icon: "🍃", productIndex: 4 },
      sun: { name: "올리브 트리", note: "빛이 충분한 창가에서 은빛 잎의 매력이 가장 잘 살아나요.", icon: "🌱", productIndex: 0 },
      expert: { name: "아우드리 고무나무", note: "세심한 관찰과 꾸준한 잎 관리에 아름답게 응답하는 식물이에요.", icon: "🌳", productIndex: 1 },
      compact: { name: "스킨답서스", note: "선반과 작은 가구 위에서 늘어지는 잎의 선으로 포인트를 만들어요.", icon: "🪴", productIndex: 4 },
      statement: { name: "여인초", note: "넓게 펼쳐지는 잎이 바닥 공간을 풍성하게 채우는 조형적 플랜트예요.", icon: "🌴", productIndex: 2 },
    };

    const update = () => {
      const choice = state.friendly === "yes" ? recommendations.pet
        : state.scale === "small" ? recommendations.compact
        : state.sunlight === "low" ? recommendations.shade
        : state.care === "expert" ? recommendations.expert
        : state.sunlight === "high" ? recommendations.sun
        : recommendations.statement;
      result.innerHTML = `
        <span class="result-kicker">DELIBIRDY MATCH</span>
        <div class="result-icon" aria-hidden="true">${choice.icon}</div>
        <h3>${choice.name}</h3>
        <p>${choice.note}</p>
        <a class="text-link" href="#product-${choice.productIndex}">추천 상품 보러가기 →</a>
      `;
      const detailLink = $(".text-link", result);
      if (detailLink) detailLink.href = `./detail.html?product=${choice.productIndex}`;
    };

    $$(".quiz-options").forEach((group) => {
      group.addEventListener("click", (event) => {
        const button = event.target.closest(".quiz-btn");
        if (!button) return;
        $$(".quiz-btn", group).forEach((item) => item.classList.toggle("active", item === button));
        const key = group.dataset.key;
        if (!key) return;
        $$(".quiz-btn", group).forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
        state[key] = button.dataset.val;
        update();
      });
      $$(".quiz-btn", group).forEach((button) => {
        button.setAttribute("aria-pressed", String(button.classList.contains("active")));
      });
    });
    update();
  }

  function setupReviews() {
    const grid = $("#reviews-card-grid");
    const formWrapper = $("#review-form-wrapper");
    const toggle = $("#form-toggle-btn");
    const moreButton = $("#review-more-btn");
    const form = $("#add-review-form");
    const productSelect = $("#rev-product");
    if (!grid || !formWrapper || !toggle || !moreButton || !form || !productSelect) return;

    const mobileQuery = window.matchMedia("(max-width: 992px)");
    const landscapeQuery = window.matchMedia("(orientation: landscape)");
    const compactQuery = window.matchMedia("(max-width: 520px)");
    let reviewsExpanded = false;

    productSelect.innerHTML = products.map((product) => (
      `<option value="${escapeHTML(product.name)}">${escapeHTML(product.name)}</option>`
    )).join("");

    const render = () => {
      const mobile = mobileQuery.matches;
      const mobileLimit = compactQuery.matches && !landscapeQuery.matches ? 3 : 4;
      const visibleReviews = mobile && !reviewsExpanded ? reviews.slice(0, mobileLimit) : reviews;
      grid.innerHTML = visibleReviews.map((review) => `
        <article class="review-card">
          ${review.image ? `<img src="${escapeHTML(review.image)}" alt="${escapeHTML(review.author)}님의 리뷰 이미지">` : `<div class="review-placeholder" aria-hidden="true">❦</div>`}
          <div class="review-card-body">
            <div class="review-stars" aria-label="별점 5점">★★★★★</div>
            <p>“${escapeHTML(review.comment)}”</p>
            <div class="review-by"><strong>${escapeHTML(review.author)}</strong><span>${escapeHTML(review.product)}</span></div>
          </div>
        </article>
      `).join("");
      moreButton.hidden = !(mobile && reviews.length > mobileLimit);
      moreButton.setAttribute("aria-expanded", String(reviewsExpanded));
      moreButton.textContent = reviewsExpanded ? "접기" : "더보기";
    };

    moreButton.addEventListener("click", () => {
      reviewsExpanded = !reviewsExpanded;
      render();
    });

    mobileQuery.addEventListener("change", () => {
      reviewsExpanded = false;
      render();
    });
    landscapeQuery.addEventListener("change", () => {
      reviewsExpanded = false;
      render();
    });
    compactQuery.addEventListener("change", () => {
      reviewsExpanded = false;
      render();
    });

    const setFormOpen = (open) => {
      formWrapper.classList.toggle("is-open", open);
      $("#review")?.classList.toggle("has-open-form", open);
      formWrapper.inert = !open;
      formWrapper.setAttribute("aria-hidden", String(!open));
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "닫기" : "✍️ 후기 남기기";
      if (open) $("#rev-author")?.focus();
    };
    toggle.addEventListener("click", () => setFormOpen(!formWrapper.classList.contains("is-open")));

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const author = $("#rev-author")?.value.trim();
      const product = $("#rev-product")?.value;
      const comment = $("#rev-comment")?.value.trim();
      const file = $("#rev-image-input")?.files?.[0];
      if (!author || !comment) return;
      reviews.unshift({ author, product, comment, image: file ? URL.createObjectURL(file) : "" });
      render();
      form.reset();
      setFormOpen(false);
      showToast("소중한 후기가 등록되었습니다.");
    });
    render();
  }

  function setupFooterActions() {
    $("#newsletter-form")?.addEventListener("submit", (event) => {
      event.preventDefault();
      event.currentTarget.reset();
      showToast("초록 소식 구독이 완료되었습니다.");
    });

    $("#track-btn")?.addEventListener("click", () => {
      const input = $("#track-input");
      const display = $("#tracker-status-display");
      if (!input || !display) return;
      const value = input.value.trim();
      if (!value) {
        display.textContent = "송장번호를 입력해 주세요.";
        display.classList.add("is-visible", "is-error");
        input.focus();
        return;
      }
      const status = document.createElement("strong");
      const detail = document.createElement("span");
      status.textContent = "배송 중";
      detail.textContent = `${value} · 기사 새가 안전하게 이동하고 있어요.`;
      display.replaceChildren(status, detail);
      display.classList.add("is-visible");
      display.classList.remove("is-error");
    });

    $("#cart-trigger")?.addEventListener("click", () => {
      showToast(cartCount ? `장바구니에 ${cartCount}개의 상품이 있습니다.` : "장바구니가 비어 있습니다.");
    });
  }

  setupMottoCards();
  setupHeroMottoTransition();
  setupMissingAssetFallbacks();
  setupMobileMenu();
  renderProducts();
  setupLookbook();
  setupPlanner();
  setupReviews();
  setupFooterActions();
});
