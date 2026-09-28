const featureImage = document.getElementById("featureImage");
const seasonImageA = document.getElementById("seasonImageA");
const seasonImageB = document.getElementById("seasonImageB");
const seasonImageC = document.getElementById("seasonImageC");
const seasonImageABack = document.getElementById("seasonImageABack");
const seasonImageBBack = document.getElementById("seasonImageBBack");
const seasonImageCBack = document.getElementById("seasonImageCBack");

const resolveImageSrc = (asset, fallback, { back = false } = {}) => {
  if (!asset) return fallback;
  if (back && asset.backImagePath) return asset.backImagePath;
  return asset.imagePath || asset.src || fallback;
};

const setImageSource = (element, asset, options = {}) => {
  if (!element) return;
  element.src = resolveImageSrc(asset, asset?.fallback, options);
};

// 이미지가 없을 경우를 대비한 뼈대(SVG) 생성기
const makeSvgDataUri = (options) => {
  const { width = 1200, height = 900, background = "#f4f1eb", accent = "#e96d1e", title = "TEMP", subtitle = "", shape = "bottle" } = options;
  const content = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${background}" />
          <stop offset="100%" stop-color="#ffffff" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)" />
      <text x="${width * 0.12}" y="${height * 0.9}" fill="#40322c" font-size="${width * 0.03}" font-family="Arial, sans-serif" font-weight="700">${title}</text>
      <text x="${width * 0.12}" y="${height * 0.95}" fill="#7f6d62" font-size="${width * 0.014}" font-family="Arial, sans-serif">${subtitle}</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(content)}`;
};

const heroAssets = {
  feature: {
    imagePath: "./images/foot1.png",
    fallback: makeSvgDataUri({ background: "#f6e1d5", accent: "#ef7d20", title: "BEST SELLER", subtitle: "Feature banner sample" }),
  },
  seasonA: {
    imagePath: "./images/sc.png",
    backImagePath: "./images/8-1.png",
    fallback: makeSvgDataUri({ background: "#f5f1ec", accent: "#f3a24c", title: "SERUM VI" }),
  },
  seasonB: {
    imagePath: "./images/jt.png",
    backImagePath: "./images/10-1.png",
    fallback: makeSvgDataUri({ background: "#d6ecff", accent: "#66aaf0", title: "SUMMER CARE" }),
  },
  seasonC: {
    imagePath: "./images/am.png",
    backImagePath: "./images/6-1.png",
    fallback: makeSvgDataUri({ background: "#f5f1ec", accent: "#e9b165", title: "SUN CREAM" }),
  }
};

setImageSource(featureImage, heroAssets.feature);
setImageSource(seasonImageA, heroAssets.seasonA);
setImageSource(seasonImageB, heroAssets.seasonB);
setImageSource(seasonImageC, heroAssets.seasonC);
setImageSource(seasonImageABack, heroAssets.seasonA, { back: true });
setImageSource(seasonImageBBack, heroAssets.seasonB, { back: true });
setImageSource(seasonImageCBack, heroAssets.seasonC, { back: true });

/* --- 스크롤 시 상단 헤더 투명/흰색 배경 전환 이벤트 --- */
const topbar = document.querySelector('.topbar');

const updateTopbarState = () => {
  if (!topbar) return;
  topbar.classList.toggle('is-scrolled', window.scrollY > 50);
};

window.addEventListener('scroll', updateTopbarState, { passive: true });
updateTopbarState();

/* --- 모바일 메뉴 열기/닫기 --- */
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileNav = document.querySelector('.mobile-nav-page .main-nav');
const mobileTopbar = document.querySelector('.mobile-nav-page .topbar');

const closeMobileMenu = () => {
  if (!mobileMenuToggle || !mobileNav) return;
  mobileMenuToggle.classList.remove('is-open');
  mobileMenuToggle.setAttribute('aria-expanded', 'false');
  mobileMenuToggle.setAttribute('aria-label', '메뉴 열기');
  mobileNav.classList.remove('is-open');
  mobileTopbar?.classList.remove('menu-open');
};

/* --- 헤더 상품 검색 --- */
const searchButton = topbar?.querySelector('.icon-btn');
const searchPanel = topbar?.querySelector('.search-panel');
const searchForm = searchPanel?.querySelector('.product-search-form');
const searchInput = searchForm?.querySelector('input[type="search"]');
const searchResults = searchPanel?.querySelector('.search-results');

const searchProducts = [
  { name: '윤조 에센스', price: '85,000원', image: './images/wes.png', href: 'product.html' },
  { name: '청아 에센스 세럼', price: '45,000원', image: './images/es.png', href: 'product.html' },
  { name: '청아 수분 크림', price: '52,000원', image: './images/sc.png', href: 'product.html' },
  { name: '윤조 솔리드 워시', price: '18,000원', image: './images/sol_wash.png', href: 'product.html' },
  { name: '리프레싱 바디 워시', price: '34,000원', image: './images/re.png', href: 'product.html' },
];

const closeSearch = () => {
  topbar?.classList.remove('search-open');
  searchButton?.setAttribute('aria-expanded', 'false');
  searchButton?.setAttribute('aria-label', '상품 검색 열기');
};

const renderSearchResults = () => {
  if (!searchInput || !searchResults) return;
  const terms = searchInput.value.normalize('NFKC').toLocaleLowerCase('ko').trim().split(/\s+/).filter(Boolean);
  searchResults.replaceChildren();

  if (!terms.length) {
    const message = document.createElement('p');
    message.className = 'search-results__message';
    message.textContent = '상품명을 입력하면 검색 결과가 표시됩니다.';
    searchResults.append(message);
    return;
  }

  const matches = searchProducts.filter(product => {
    const name = product.name.normalize('NFKC').toLocaleLowerCase('ko');
    return terms.every(term => name.includes(term));
  });

  if (!matches.length) {
    const message = document.createElement('p');
    message.className = 'search-results__message';
    message.textContent = '검색 결과가 없습니다.';
    searchResults.append(message);
    return;
  }

  const list = document.createElement('ul');
  list.className = 'search-results__list';
  matches.forEach(product => {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.className = 'search-result';
    link.href = product.href;

    const image = document.createElement('img');
    image.src = product.image;
    image.alt = '';
    image.loading = 'lazy';

    const details = document.createElement('span');
    details.className = 'search-result__text';
    const name = document.createElement('strong');
    name.className = 'search-result__name';
    name.textContent = product.name;
    const price = document.createElement('span');
    price.className = 'search-result__price';
    price.textContent = product.price;
    details.append(name, price);
    link.append(image, details);
    item.append(link);
    list.append(item);
  });
  searchResults.append(list);
};

if (searchButton && searchPanel && searchForm && searchInput) {
  searchButton.addEventListener('click', () => {
    const isOpen = topbar.classList.contains('search-open');
    if (isOpen) {
      closeSearch();
      return;
    }
    closeMobileMenu();
    topbar.classList.add('search-open');
    searchButton.setAttribute('aria-expanded', 'true');
    searchButton.setAttribute('aria-label', '상품 검색 닫기');
    renderSearchResults();
    searchInput.focus();
  });

  searchInput.addEventListener('input', renderSearchResults);
  searchForm.addEventListener('submit', event => {
    event.preventDefault();
    renderSearchResults();
    if (!searchInput.value.trim()) searchInput.focus();
  });

  document.addEventListener('click', event => {
    if (topbar.classList.contains('search-open') && !topbar.contains(event.target)) closeSearch();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && topbar.classList.contains('search-open')) {
      closeSearch();
      searchButton.focus();
    }
  });
}

if (mobileMenuToggle && mobileNav) {

  mobileMenuToggle.addEventListener('click', () => {
    const isOpen = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
    if (!isOpen) closeSearch();
    mobileMenuToggle.classList.toggle('is-open', !isOpen);
    mobileMenuToggle.setAttribute('aria-expanded', String(!isOpen));
    mobileMenuToggle.setAttribute('aria-label', isOpen ? '메뉴 열기' : '메뉴 닫기');
    mobileNav.classList.toggle('is-open', !isOpen);
    mobileTopbar?.classList.toggle('menu-open', !isOpen);
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 720) closeMobileMenu();
  });
}



/* --- How I Can Help 아코디언 인터랙션 제어 --- */
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const currentItem = header.parentElement;
    
    // 다른 항목들은 모두 닫히게 하려면 아래 주석을 해제하세요 (원치 않으면 여러 개 동시 열림 가능)
    // document.querySelectorAll('.accordion-item').forEach(item => {
    //   if (item !== currentItem) item.classList.remove('is-open');
    // });
    
    currentItem.classList.toggle('is-open');
  });
});


/* --- 메인 배너 자동 슬라이드 --- */
const heroSlides = document.querySelectorAll('.hero-slide');
let currentHeroSlide = 0;

if (heroSlides.length > 1) {
  setInterval(() => {
    heroSlides[currentHeroSlide].classList.remove('active');
    currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
    heroSlides[currentHeroSlide].classList.add('active');
  }, 5000); // 5초마다 슬라이드 전환
}
