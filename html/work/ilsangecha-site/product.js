/* Product content is shared by the five static detail URLs. */
(() => {
  'use strict';
  const teas = {
    'first-leaf': {
      name: '첫잎 녹차', category: 'PURE GREEN TEA', number: '01',
      subtitle: '매일의 첫 잔을, 맑고 가볍게.',
      description: '여린 찻잎의 맑은 향과 담백한 감칠맛,\n은은하게 이어지는 단맛을 담았습니다.',
      tags: ['맑은 향', '감칠맛', '은은한 단맛'],
      image: 'images/sec2-t1.png', hero: 'images/first-leaf-product.png',
      heroAlt: '첫잎 녹차 패키지와 따뜻한 녹차 한 잔', price: 18000, option: '잎차 30 g',
      flavorEyebrow: 'MEET YOUR FIRST LEAF', flavorTitle: '첫잎이 전하는\n담백한 취향.',
      flavorDescription: '어린 녹차잎 본연의 맛을 천천히 만나 보세요.\n복잡한 향을 더하지 않아도 충분한 한 잔.',
      notes: [['맑은 향', '잔을 가까이할 때 느껴지는 어린 찻잎의 향.'], ['담백한 감칠맛', '입안에 부드럽게 퍼지는 녹차 본연의 맛.'], ['은은한 단맛', '마신 뒤에도 가볍게 이어지는 다정한 여운.']],
      brewIntro: '녹차는 낮은 온도로 짧고 은은하게 우려 주세요.', temperature: '70', brewTime: '1–2',
      waterTitle: '물을 한 김 식혀요', waterDescription: '너무 뜨겁지 않은 물을 준비해요.', timeDescription: '찻잎을 넣고 가볍게 우려 주세요.',
      ingredients: '어린 녹차잎 그대로 즐기는 녹차', caffeine: '녹차에는 카페인이 들어 있습니다.',
      short: '여린 찻잎 그대로, 맑고 담백한 한 잔'
    },
    'garden-walk': {
      name: '정원 산책', category: 'FLORAL BLEND', number: '02',
      subtitle: '한 잔에 피어나는, 작은 정원.',
      description: '부드러운 녹차 위로 다채로운 꽃향이\n차분하게 피어나는 산뜻한 플로럴 블렌드입니다.',
      tags: ['은은한 꽃향', '부드러운 녹차', '산뜻한 여운'], image: 'images/sec2-t2.png',
      flavorEyebrow: 'A WALK IN YOUR GARDEN', flavorTitle: '꽃잎을 따라,\n천천히 걷는 시간.',
      flavorDescription: '덖음 녹차에 장미, 콘플라워, 금잔화를 더했어요.\n익숙한 하루에 작은 정원을 들여 보세요.',
      notes: [['다채로운 꽃향', '장미와 꽃잎의 향이 잔 위로 차분하게 피어납니다.'], ['부드러운 녹차', '덖음 녹차가 꽃향을 담백하게 받쳐 줍니다.'], ['산뜻한 여운', '한 모금 뒤에도 가볍게 머무는 꽃의 인사.']],
      brewIntro: '꽃향과 녹차가 어우러지도록 부드럽게 우려 주세요.', temperature: '80', brewTime: '2–3',
      waterTitle: '물을 한 김 식혀요', waterDescription: '끓인 물을 잠시 식혀 준비해요.', timeDescription: '꽃향이 피어나도록 천천히 기다려요.',
      ingredients: '덖음 녹차 · 장미 · 콘플라워 · 금잔화', caffeine: '녹차가 포함되어 카페인이 들어 있습니다.',
      short: '녹차에 꽃향을 더한 산뜻한 한 잔'
    },
    'sunshine-chamomile': {
      name: '햇살 캐모마일', category: 'HERBAL BLEND', number: '03',
      subtitle: '하루의 긴장을, 포근하게 내려놓아요.',
      description: '포근한 캐모마일에 싱그러운 허브 향을 더해\n하루의 긴장을 부드럽게 내려놓게 합니다.',
      tags: ['포근한 꽃향', '싱그러운 허브', '부드러운 여운'], image: 'images/sec2-t3.png',
      flavorEyebrow: 'A CUP OF SOFT SUNSHINE', flavorTitle: '햇살을 닮은\n포근한 한 모금.',
      flavorDescription: '캐모마일에 레몬그라스와 허브를 더했어요.\n나를 위한 느긋한 시간을 만나 보세요.',
      notes: [['포근한 캐모마일', '작은 꽃에 담긴 부드럽고 따뜻한 향.'], ['싱그러운 허브', '레몬그라스가 더하는 가벼운 산뜻함.'], ['다정한 마무리', '서두르지 않는 티타임에 어울리는 부드러운 여운.']],
      brewIntro: '꽃과 허브의 향이 충분히 퍼지도록 여유롭게 우려 주세요.', temperature: '95', brewTime: '5–6',
      waterTitle: '따뜻한 물을 준비해요', waterDescription: '충분히 뜨거운 물로 향을 깨워요.', timeDescription: '뚜껑을 덮고 포근한 향을 기다려요.',
      ingredients: '캐모마일 · 레몬그라스 · 허브', caffeine: '상세 원재료와 카페인 정보는 판매 시 안내합니다.',
      short: '캐모마일과 허브의 포근한 만남'
    },
    'afternoon-citrus': {
      name: '오후의 시트러스', category: 'CITRUS BLEND', number: '04',
      subtitle: '나른한 오후에, 산뜻한 쉼표.',
      description: '맑은 녹차에 상큼한 시트러스와 꽃향을 겹쳐\n나른한 오후를 가볍게 깨우는 차입니다.',
      tags: ['상큼한 시트러스', '맑은 녹차', '은은한 꽃향'], image: 'images/sec2-t4.png',
      flavorEyebrow: 'A BRIGHTER AFTERNOON', flavorTitle: '오후를 밝히는\n싱그러운 취향.',
      flavorDescription: '녹차에 오렌지필, 콘플라워, 장미를 더했어요.\n기분 좋은 산뜻함으로 오후를 채워 보세요.',
      notes: [['상큼한 오렌지', '오렌지필의 밝고 싱그러운 첫 향.'], ['맑은 녹차', '시트러스와 자연스럽게 어우러지는 담백한 맛.'], ['은은한 꽃향', '장미와 콘플라워가 더하는 섬세한 마무리.']],
      brewIntro: '시트러스와 꽃향이 살아나도록 가볍게 우려 주세요.', temperature: '80', brewTime: '2–3',
      waterTitle: '물을 한 김 식혀요', waterDescription: '끓인 물을 잠시 식혀 준비해요.', timeDescription: '상큼한 향이 퍼질 때까지 기다려요.',
      ingredients: '녹차 · 오렌지필 · 콘플라워 · 장미', caffeine: '녹차가 포함되어 카페인이 들어 있습니다.',
      short: '나른한 오후를 깨우는 상큼한 향'
    },
    'ruby-garden': {
      name: '루비 가든', category: 'FRUIT BLEND', number: '05',
      subtitle: '붉게 물드는, 생기 있는 하루.',
      description: '새콤한 히비스커스와 달콤한 과일 향이 어우러져\n선명하고 생기 있는 여운을 남깁니다.',
      tags: ['새콤한 히비스커스', '달콤한 과일 향', '선명한 여운'], image: 'images/sec2-t5.png',
      flavorEyebrow: 'YOUR RUBY MOMENT', flavorTitle: '붉은 빛 속에\n담아낸 생기.',
      flavorDescription: '히비스커스에 용과, 장미, 과일 조각을 더했어요.\n눈으로 한 번, 향으로 또 한 번 즐기는 한 잔.',
      notes: [['새콤한 첫맛', '히비스커스의 선명하고 산뜻한 맛.'], ['달콤한 과일 향', '용과와 과일 조각이 더하는 풍성한 향.'], ['생기 있는 여운', '장미 향과 함께 이어지는 기분 좋은 마무리.']],
      brewIntro: '붉은 빛과 과일 향이 충분히 우러나도록 기다려 주세요.', temperature: '95', brewTime: '4–5',
      waterTitle: '따뜻한 물을 준비해요', waterDescription: '충분히 뜨거운 물로 향을 깨워요.', timeDescription: '과일 향과 붉은 빛을 천천히 우려요.',
      ingredients: '히비스커스 · 용과 · 장미 · 과일 조각', caffeine: '상세 원재료와 카페인 정보는 판매 시 안내합니다.',
      short: '붉은 빛에 담긴 새콤달콤한 과일 향'
    }
  };
  const requested = new URLSearchParams(location.search).get('tea');
  const id = Object.hasOwn(teas, requested) ? requested : 'first-leaf';
  const tea = teas[id];
  const $ = (selector) => document.querySelector(selector);
  const money = (value) => new Intl.NumberFormat('ko-KR').format(value) + '원';
  const data = { ...tea, eyebrow: `NO. ${tea.number} / ${tea.category}`, tasteSummary: tea.notes.map(([name]) => name).join(' · ') };
  document.querySelectorAll('[data-bind]').forEach((element) => {
    element.textContent = data[element.dataset.bind];
  });
  document.title = `${tea.name} | 일상에차`;
  $('meta[name="description"]').content = tea.description.replace('\n', ' ');
  $('#product-image').src = tea.hero || tea.image;
  $('#product-image').alt = tea.heroAlt || `${tea.name}의 블렌딩 재료와 찻물`;
  $('#flavor-image').src = tea.image;
  $('#flavor-image').alt = `${tea.name}의 블렌딩 재료와 찻물`;
  $('#taste-tags').replaceChildren(...tea.tags.map((tag) => {
    const item = document.createElement('li'); item.textContent = tag; return item;
  }));
  $('#flavor-notes').replaceChildren(...tea.notes.map(([name, description]) => {
    const item = document.createElement('li');
    const wrapper = document.createElement('div');
    const heading = document.createElement('h3'); heading.textContent = name;
    const paragraph = document.createElement('p'); paragraph.textContent = description;
    wrapper.append(heading, paragraph); item.append(wrapper); return item;
  }));
  const related = Object.entries(teas).filter(([key]) => key !== id).slice(0, 3);
  $('#related-products').replaceChildren(...related.map(([key, product]) => {
    const link = document.createElement('a'); link.className = 'related-card'; link.href = `product.html?tea=${key}`;
    const img = document.createElement('img'); img.src = product.image; img.alt = `${product.name} 블렌딩 티`; img.loading = 'lazy'; img.width = 1200; img.height = 1502;
    const category = document.createElement('span'); category.className = 'eyebrow'; category.textContent = product.category;
    const name = document.createElement('h3'); name.textContent = product.name;
    const arrow = document.createElement('span'); arrow.textContent = '→'; arrow.setAttribute('aria-hidden', 'true'); name.append(arrow);
    const description = document.createElement('p'); description.textContent = product.short;
    link.append(img, category, name, description); return link;
  }));

  const quantity = $('#quantity');
  function updateQuantity(value) {
    const next = Number(value);
    quantity.value = Math.max(1, Math.min(99, Number.isFinite(next) ? Math.trunc(next) : 1));
    $('#decrease').disabled = Number(quantity.value) <= 1;
    $('#increase').disabled = Number(quantity.value) >= 99;
    $('#total-price').textContent = tea.price ? money(tea.price * Number(quantity.value)) : '판매 준비 중';
  }
  $('#decrease').addEventListener('click', () => updateQuantity(Number(quantity.value) - 1));
  $('#increase').addEventListener('click', () => updateQuantity(Number(quantity.value) + 1));
  quantity.addEventListener('change', () => updateQuantity(quantity.value));
  quantity.addEventListener('input', () => { if (quantity.value !== '') updateQuantity(quantity.value); });
  $('#product-option').options[0].textContent = `${tea.name} · ${tea.option || '블렌딩 티'}`;
  $('#buy-button').textContent = tea.price ? `${tea.name} 구매하기` : '판매 준비 중';
  if (!tea.price) {
    $('#unit-price').textContent = '판매 준비 중';
    $('#product-weight').textContent = tea.category;
    $('#quantity-row').hidden = true;
    $('#product-option').disabled = true;
    $('#add-to-cart').disabled = true;
    $('#buy-button').disabled = true;
    $('#product-footnote').textContent = '가격과 구성은 판매가 시작되면 안내해 드릴게요.';
  }
  updateQuantity(1);

  // Store product IDs and quantities only; always derive names and prices from the catalog.
  const cartKey = 'ilsangecha-cart-v1';
  let cart = [];
  try {
    const saved = JSON.parse(localStorage.getItem(cartKey) || '[]');
    if (Array.isArray(saved)) cart = saved.filter((item) => item && Object.hasOwn(teas, item.id) && teas[item.id].price && Number.isInteger(item.quantity) && item.quantity > 0).map((item) => ({id: item.id, quantity: Math.min(item.quantity, 99)}));
  } catch { /* The cart remains usable when browser storage is restricted. */ }
  let toastTimer;
  function notify(message) {
    clearTimeout(toastTimer);
    $('#toast').textContent = message;
    $('#toast').classList.add('is-visible');
    toastTimer = setTimeout(() => $('#toast').classList.remove('is-visible'), 3500);
  }
  function saveCart() {
    let saved = true;
    try { localStorage.setItem(cartKey, JSON.stringify(cart)); } catch { saved = false; }
    renderCart();
    return saved;
  }
  function renderCart() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    $('#cart-count').textContent = count;
    $('#cart-count').hidden = !count;
    $('.cart-toggle').setAttribute('aria-label', count ? `장바구니 열기, ${count}개 상품` : '장바구니 열기');
    const items = cart.map((item) => {
      const product = teas[item.id];
      const row = document.createElement('div'); row.className = 'cart-item';
      const img = document.createElement('img'); img.src = product.hero || product.image; img.alt = product.name;
      const content = document.createElement('div');
      const name = document.createElement('h3'); name.textContent = product.name;
      const detail = document.createElement('p'); detail.textContent = `${product.option} / ${item.quantity}개`;
      const price = document.createElement('p'); price.textContent = money(product.price * item.quantity);
      content.append(name, detail, price);
      const remove = document.createElement('button'); remove.type = 'button'; remove.textContent = '삭제'; remove.setAttribute('aria-label', `${product.name} 장바구니에서 삭제`);
      remove.addEventListener('click', () => { cart = cart.filter((entry) => entry.id !== item.id); saveCart(); $('.cart-total').scrollIntoView({block:'nearest'}); $('#cart-dialog .dialog-close').focus(); });
      row.append(img, content, remove); return row;
    });
    if (!items.length) { const empty = document.createElement('p'); empty.className = 'cart-empty'; empty.textContent = '아직 담은 차가 없어요. 오늘의 한 잔을 골라 보세요.'; items.push(empty); }
    $('#cart-items').replaceChildren(...items);
    $('#cart-total').textContent = money(cart.reduce((sum, item) => sum + teas[item.id].price * item.quantity, 0));
  }
  function addToCart() {
    if (!tea.price) return;
    updateQuantity(quantity.value);
    const existing = cart.find((item) => item.id === id);
    const next = (existing?.quantity || 0) + Number(quantity.value);
    if (next > 99) { notify('한 상품은 최대 99개까지 담을 수 있어요.'); return; }
    if (existing) existing.quantity = next; else cart.push({id, quantity: next});
    const saved = saveCart();
    $('#cart-dialog .dialog-note').innerHTML = saved ? '결제 서비스는 준비 중입니다.<br>담은 상품은 이 브라우저에 저장됩니다.' : '결제 서비스는 준비 중입니다.<br>브라우저 저장이 제한되어 현재 페이지에서만 보관됩니다.';
    notify(`${tea.name} ${quantity.value}개를 장바구니에 담았어요.`);
  }
  renderCart();
  $('#add-to-cart').addEventListener('click', addToCart);
  $('.cart-toggle').addEventListener('click', () => $('#cart-dialog').showModal());
  $('#product-form').addEventListener('submit', (event) => {
    event.preventDefault();
    if (!tea.price) return;
    updateQuantity(quantity.value);
    $('#purchase-summary').textContent = `${tea.name} · ${tea.option} / ${quantity.value}개 / ${money(tea.price * Number(quantity.value))}`;
    $('#purchase-dialog').showModal();
  });
  $('#purchase-save').addEventListener('click', () => { $('#purchase-dialog').close(); addToCart(); });
  document.querySelectorAll('.dialog-close').forEach((button) => button.addEventListener('click', () => button.closest('dialog').close()));
  document.querySelectorAll('dialog').forEach((dialog) => dialog.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  }));

  const links = [...document.querySelectorAll('.detail-nav a')];
  const sections = links.map((link) => document.querySelector(link.hash));
  let ticking = false;
  function updateSection() {
    const offset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) + 110;
    let active = sections[0];
    sections.forEach((section) => { if (section.getBoundingClientRect().top <= offset) active = section; });
    links.forEach((link) => {
      const current = link.hash === `#${active.id}`;
      link.classList.toggle('is-active', current);
      if (current) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    });
    ticking = false;
  }
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(updateSection); } }, {passive:true});
  updateSection();
})();
