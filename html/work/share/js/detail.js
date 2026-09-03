(() => {
  const products = [
    {
      name: "올리브 트리 & 텍스처 토분 세트", category: "BOTANICAL CURATION", price: 89000, mark: "Olive", image: "images/sub_02.jpg", tag: "SIGNATURE", scientific: "Olea europaea", rating: 4.9, reviews: 124, sunlight: "밝은 간접광", difficulty: "쉬움", size: "Midi", pot: "Textured Terracotta", description: "지중해의 바람을 닮은 올리브 트리와 자연의 질감을 담은 텍스처 토분의 조화. 시간이 지날수록 멋이 더해지는 특별한 세트입니다.", story: "올리브는 천천히, 그러나 꾸준히 자라는 나무입니다. 그 시간의 깊이 올리브가 바라보는 담기며, 공간에 고요한 숨결을 더합니다. 부드러운 햇살을 좋아하고, 마른 바람 속에서도 묵묵하게 자라나는 올리브. 당신의 일상 속에서 작은 평온이 되어줄 거예요. 오래도록 곁에 두고 싶은 초록, 지금 당신의 공간에 들여보세요.", care: { water: "겉흙이 충분히 말랐을 때, 화분 아래로 물이 흐를 때까지 천천히 흠뻑 주세요.", light: "자연광이 들어오는 밝은 자리에서 잎의 결이 가장 선명합니다.", soil: "15도에서 25도 사이의 온도를 유지하고 통기성 좋은 흙을 사용해 주세요." }
    },
    {
      name: "아우드리 고무나무 & 러스틱 샌드 팟", category: "BOTANICAL CURATION", price: 115000, mark: "Ficus", image: "images/r-6.png", tag: "BEST SELLER", scientific: "Ficus benghalensis 'Audrey'", rating: 5.0, reviews: 86, sunlight: "반양지, 선명한 여과광", difficulty: "쉬움", size: "Grand", pot: "Lime-wash Coated Clay", description: "벨벳처럼 부드러운 잎과 모래빛 화분이 자연스럽게 어우러집니다. 깊은 초록의 잎맥이 공간에 안정적인 중심을 만들어줍니다.", story: "방 한구석에 은은하게 자리 잡아서, 둥근 잎사귀 끝자락마다 은은한 생명을 드립니다. 여과되어 스며드는 부드러운 빛을 머금어 곧고 해사하게 성장하는 식물입니다. 지친 하루 끝에 마주하는 푸른 여유가 공간에 따스한 안도감을 선사할 것입니다.", care: { water: "겉흙이 3–4cm 정도 마르면 화분 전체에 고르게 물을 주세요.", light: "밝은 간접광에서 잎의 결이 가장 선명합니다. 창가에서 1m 안쪽을 추천합니다.", soil: "배수가 잘되는 흙을 사용하고, 겨울에는 찬바람이 직접 닿지 않게 해주세요." }
    },
    {
      name: "여인초 & 라탄 바스켓 팟", category: "TROPICAL", price: 96000, mark: "Bird of paradise", image: "images/r-4.jpg", tag: "STATEMENT", scientific: "Strelitzia reginae", rating: 4.8, reviews: 57, sunlight: "밝은 빛", difficulty: "보통", size: "Grand", pot: "Natural Rattan Basket", description: "넓게 펼쳐지는 잎이 거실에 풍성하고 시원한 인상을 만듭니다. 라탄 바스켓의 따뜻한 질감이 큰 잎의 조형미를 부드럽게 받아줍니다.", story: "한 그루만으로도 공간의 온도를 바꾸는 여인초. 비어 있던 코너에 놓는 순간, 바람과 여행의 기억을 닮은 풍경이 시작됩니다.", care: { water: "겉흙이 마르면 충분히 관수하고, 받침에 고인 물은 바로 비워주세요.", light: "밝은 창가와 따뜻한 빛을 선호합니다. 잎이 한쪽으로만 자라면 주기적으로 방향을 바꿔주세요.", soil: "통기성 좋은 흙과 15°C 이상의 온도를 유지하면 건강하게 자랍니다." }
    },
    {
      name: "보스턴 고사리 & 크래프트 팟", category: "PET FRIENDLY", price: 46000, mark: "Fern", image: "images/r-3.png", tag: "PET FRIENDLY", scientific: "Nephrolepis exaltata", rating: 4.9, reviews: 97, sunlight: "은은한 간접광", difficulty: "보통", size: "Midi", pot: "Raw Kraft Paper Pot", description: "섬세한 잎이 부드러운 그림자를 만드는 반려동물 친화 식물입니다. 책상과 선반 위에 가볍게 놓기 좋은 크기로 큐레이션했습니다.", story: "고사리의 가벼운 잎은 바쁜 하루의 속도를 잠시 늦춰줍니다. 창가에 드는 빛과 나무 가구 위의 그림자 사이에서 가장 편안한 표정을 짓습니다.", care: { water: "흙이 마르지 않도록 촉촉함을 유지하되, 물이 고이지 않게 해주세요.", light: "강한 직사광보다 밝은 그늘을 좋아합니다. 공기가 너무 건조하면 잎 주변에 가볍게 분무하세요.", soil: "습도를 좋아하는 식물인 만큼 통기성 있는 흙과 일정한 실내 온도가 필요합니다." }
    },
    {
      name: "스킨답서스 & 테라조 행잉 팟", category: "HANGING", price: 39000, mark: "Pothos", image: "images/r-5.jpg", tag: "EASY CARE", scientific: "Epipremnum aureum", rating: 4.7, reviews: 73, sunlight: "낮은 빛도 가능", difficulty: "쉬움", size: "Mini", pot: "Terrazzo Composite", description: "늘어지는 잎의 선이 선반과 창가에 자연스러운 생기를 더합니다. 관리가 간단해 식물을 처음 시작하는 분께도 잘 어울립니다.", story: "작은 테라조 팟에서 시작된 초록의 선은 시간이 흐를수록 더 길고 자유로워집니다. 빈 벽면과 선반에 가장 손쉽게 생기를 더하는 큐레이션입니다.", care: { water: "흙 표면이 마르면 물을 주고, 겨울에는 물 주는 간격을 조금 늘려주세요.", light: "밝은 간접광에서 가장 잘 자라지만 낮은 빛에도 비교적 강합니다.", soil: "일반 배양토로도 충분하며, 늘어진 줄기는 원하는 길이에서 가볍게 정리해주세요." }
    }
  ];

  const reviews = [
    { author: "김하늘", date: "2026.05.12", text: "포장이 단단하고 잎 상태도 정말 좋았어요. 거실 분위기가 한결 편안해졌습니다." },
    { author: "이서윤", date: "2026.05.08", text: "화분의 질감과 잎 색이 잘 어울려요. 관리 안내도 이해하기 쉬웠습니다." },
    { author: "박지우", date: "2026.04.29", text: "처음 키우는 식물이라 걱정했는데, 배송부터 안내까지 세심해서 만족해요." }
  ];
  const money = new Intl.NumberFormat("ko-KR");
  const $ = (selector) => document.querySelector(selector);
  const escapeHTML = (value) => String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
  const index = Math.max(0, Math.min(products.length - 1, Number(new URLSearchParams(location.search).get("product")) || 0));
  const product = products[index];
  let quantity = 1;

  function showToast(message) {
    const toast = $("#detail-toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2500);
  }

  function renderStars(rating) { return "★".repeat(Math.round(rating)) + "☆".repeat(5 - Math.round(rating)); }

  function render() {
    document.title = `${product.name} | delibirdy`;
    $("#breadcrumb-name").textContent = product.name;
    $("#product-category").textContent = product.category;
    $("#product-name").textContent = product.name;
    $("#scientific-name").textContent = product.scientific;
    $("#product-rating").textContent = renderStars(product.rating);
    $("#product-rating").setAttribute("aria-label", `별점 ${product.rating}점`);
    $("#review-count").textContent = `${product.rating} · ${product.reviews} Reviews`;
    $("#product-description").textContent = product.description;
    $("#product-price").textContent = `₩${money.format(product.price)}`;
    $("#product-sunlight").textContent = product.sunlight;
    $("#product-difficulty").textContent = product.difficulty;
    $("#product-size").textContent = product.size;
    $("#pot-material").textContent = product.pot;
    $("#botanical-name").textContent = product.scientific;
    $("#care-level").textContent = product.difficulty;
    $("#spec-pot").textContent = product.pot;
    $("#spec-size").textContent = `${product.size} Dimension`;
    $("#spec-level").textContent = `${product.difficulty} Level`;
    $("#spec-light").textContent = product.sunlight;
    $("#accordion-care-copy").textContent = `${product.care.water} ${product.care.light}`;
    $("#product-tag").textContent = product.tag;
    $("#product-image").src = product.image;
    $("#product-image").alt = product.name;
    $("#story-copy-text").textContent = product.story;
    $("#story-image").src = index === 0 ? "images/re-2.jpg" : product.image;
    $("#story-side-image").src = index === 0 ? "images/sto-2.jpg" : product.image;
    $("#space-product-label").textContent = `${product.name.split(" & ")[0]}은(는)`;
    renderThumbs();
    renderCare("water");
    renderReviews();
    renderRecommendations();
    document.querySelectorAll("#recommend-grid .recommend-card").forEach((card, itemIndex) => {
      card.href = `./detail.html?product=${itemIndex}`;
    });
    updatePrice();
  }

  function renderThumbs() {
    const images = [product.image, "images/main_2.jpg", "images/sto-2.jpg"];
    $("#gallery-thumbs").innerHTML = images.map((image, itemIndex) => `<button class="gallery-thumb ${itemIndex === 0 ? "active" : ""}" type="button" data-image="${image}" aria-label="상품 이미지 ${itemIndex + 1}"><img src="${image}" alt="" /></button>`).join("");
    $("#gallery-thumbs").addEventListener("click", (event) => {
      const button = event.target.closest(".gallery-thumb");
      if (!button) return;
      $("#product-image").src = button.dataset.image;
      document.querySelectorAll(".gallery-thumb").forEach((thumb) => thumb.classList.toggle("active", thumb === button));
    });
  }

  function renderCare() {
    $("#care-water-text").textContent = product.care.water;
    $("#care-light-text").textContent = product.care.light;
    $("#care-soil-text").textContent = product.care.soil;
  }

  function renderReviews() {
    $("#reviews-grid").innerHTML = reviews.map((review) => `<article class="review-card"><div class="review-card-top"><div><strong>${escapeHTML(review.author)}</strong><time>${review.date}</time></div><span class="review-stars">★★★★★</span></div><p>${escapeHTML(review.text)}</p></article>`).join("");
  }

  function renderRecommendations() {
    const recommendations = products.slice(0, 5);
    $("#recommend-grid").innerHTML = recommendations.map((item) => { const itemIndex = products.indexOf(item); return `<a class="recommend-card" href="detail.html?product=${itemIndex}"><div class="recommend-image"><img src="${item.image}" alt="${escapeHTML(item.name)}" /></div><p>${item.category}</p><h3>${escapeHTML(item.name)}</h3><span>₩${money.format(item.price)}</span></a>`; }).join("");
  }

  function updatePrice() { $("#quantity").textContent = String(quantity); $("#total-price").textContent = `₩${money.format(product.price * quantity)}`; }

  document.querySelectorAll(".spec-accordion-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const accordion = trigger.closest(".spec-accordion");
      const willOpen = !accordion.classList.contains("is-open");
      document.querySelectorAll(".spec-accordion").forEach((item) => {
        item.classList.remove("is-open");
        item.querySelector(".spec-accordion-trigger")?.setAttribute("aria-expanded", "false");
        const icon = item.querySelector(".spec-accordion-trigger i");
        if (icon) icon.textContent = "⌄";
      });
      if (willOpen) {
        accordion.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
        const icon = trigger.querySelector("i");
        if (icon) icon.textContent = "⌃";
      }
    });
  });

  $("#quantity-minus").addEventListener("click", () => { quantity = Math.max(1, quantity - 1); updatePrice(); });
  $("#quantity-plus").addEventListener("click", () => { quantity += 1; updatePrice(); });
  $("#add-cart").addEventListener("click", () => {
    const saved = JSON.parse(localStorage.getItem("delibirdy_detail_cart") || "[]");
    const current = saved.find((item) => item.index === index);
    if (current) current.quantity += quantity; else saved.push({ index, name: product.name, price: product.price, quantity });
    localStorage.setItem("delibirdy_detail_cart", JSON.stringify(saved));
    showToast(`${product.name} ${quantity}개를 장바구니에 담았습니다.`);
  });
  $("#gift-button").addEventListener("click", () => showToast("선물 포장 옵션을 선택했습니다. 장바구니에서 확인해 주세요."));
  const spaceTrack = $("#space-track");
  $("#space-prev").addEventListener("click", () => spaceTrack.scrollBy({ left: -230, behavior: "smooth" }));
  $("#space-next").addEventListener("click", () => spaceTrack.scrollBy({ left: 230, behavior: "smooth" }));

  let isDraggingSpace = false;
  let spaceStartX = 0;
  let spaceStartScroll = 0;
  spaceTrack.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    event.preventDefault();
    isDraggingSpace = true;
    spaceStartX = event.clientX;
    spaceStartScroll = spaceTrack.scrollLeft;
    spaceTrack.classList.add("is-dragging");
    spaceTrack.setPointerCapture?.(event.pointerId);
  });
  spaceTrack.addEventListener("pointermove", (event) => {
    if (!isDraggingSpace) return;
    event.preventDefault();
    spaceTrack.scrollLeft = spaceStartScroll - (event.clientX - spaceStartX);
  });
  const stopSpaceDrag = (event) => {
    if (!isDraggingSpace) return;
    isDraggingSpace = false;
    spaceTrack.classList.remove("is-dragging");
    spaceTrack.releasePointerCapture?.(event.pointerId);
  };
  spaceTrack.addEventListener("pointerup", stopSpaceDrag);
  spaceTrack.addEventListener("pointercancel", stopSpaceDrag);
  const recommendationTrack = $("#recommend-grid");
  $("#recommend-prev").addEventListener("click", () => recommendationTrack.scrollBy({ left: -220, behavior: "smooth" }));
  $("#recommend-next").addEventListener("click", () => recommendationTrack.scrollBy({ left: 220, behavior: "smooth" }));

  let isDraggingRecommendations = false;
  let recommendationStartX = 0;
  let recommendationStartScroll = 0;
  let recommendationWasDragged = false;

  recommendationTrack.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    isDraggingRecommendations = true;
    recommendationWasDragged = false;
    recommendationStartX = event.clientX;
    recommendationStartScroll = recommendationTrack.scrollLeft;
    recommendationTrack.classList.add("is-dragging");
    recommendationTrack.setPointerCapture?.(event.pointerId);
  });

  recommendationTrack.addEventListener("pointermove", (event) => {
    if (!isDraggingRecommendations) return;
    const distance = event.clientX - recommendationStartX;
    if (Math.abs(distance) > 5) recommendationWasDragged = true;
    recommendationTrack.scrollLeft = recommendationStartScroll - distance;
  });

  const stopRecommendationDrag = (event) => {
    if (!isDraggingRecommendations) return;
    isDraggingRecommendations = false;
    recommendationTrack.classList.remove("is-dragging");
    recommendationTrack.releasePointerCapture?.(event.pointerId);
    window.setTimeout(() => { recommendationWasDragged = false; }, 450);
  };

  recommendationTrack.addEventListener("pointerup", stopRecommendationDrag);
  recommendationTrack.addEventListener("pointercancel", stopRecommendationDrag);
  recommendationTrack.addEventListener("click", (event) => {
    const card = event.target.closest(".recommend-card");
    if (!card) return;

    if (recommendationWasDragged) {
      event.preventDefault();
      event.stopPropagation();
      recommendationWasDragged = false;
      return;
    }

    const cards = [...recommendationTrack.querySelectorAll(".recommend-card")];
    const productIndex = cards.indexOf(card);
    if (productIndex < 0) return;

    event.preventDefault();
    window.scrollTo(0, 0);
    window.location.assign(`./detail.html?product=${productIndex}`);
  }, true);
  render();
})();
