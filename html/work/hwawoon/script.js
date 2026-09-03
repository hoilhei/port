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

if (mobileMenuToggle && mobileNav) {
  const closeMobileMenu = () => {
    mobileMenuToggle.classList.remove('is-open');
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    mobileMenuToggle.setAttribute('aria-label', '메뉴 열기');
    mobileNav.classList.remove('is-open');
    mobileTopbar?.classList.remove('menu-open');
  };

  mobileMenuToggle.addEventListener('click', () => {
    const isOpen = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
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
