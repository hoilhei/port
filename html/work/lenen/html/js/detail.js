(function () {
  const products = {
    'leather-lounge': {
      page: 1,
      title: 'Leather Lounge',
      lines: ['Leather', 'Lounge'],
      material: '천연 소가죽 · 스테인리스',
      description: '천연 소가죽과 가는 금속 프레임의 대비. 몸이 편안하게 기댈 수 있는 낮은 좌면으로, 일상에 여유로운 휴식의 자리를 만듭니다.',
      photo: 'images/pros/pro01.png',
      crop: [1358, 0, 1150, 870],
      focus: [.66, .7],
      // 상세 이미지는 최대 750px 너비로 표시하며 원본 비율을 유지합니다.
      detailImages: ['images/sub01.png']
    },
    'wood-leather': {
      page: 2,
      title: 'Wood & Leather',
      lines: ['Wood &', 'Leather'],
      material: '오크 원목 · 레더 쿠션',
      description: '따뜻한 원목과 브라운 레더 쿠션의 조화. 몸의 곡선을 따라 이어지는 팔걸이와 여유로운 좌방석이 독서와 휴식의 시간을 부드럽게 받쳐줍니다.',
      photo: 'images/pros/pro02.png',
      crop: [1345, 0, 1163, 754],
      focus: [.6, .7],
      detailImages: ['images/sub02.png']
    },
    'woven-armchair': {
      page: 3,
      title: 'Woven Armchair',
      lines: ['Woven', 'Armchair'],
      material: '애쉬 원목 · 천연 라탄',
      description: '곡선과 짜임이 만나는 암체어. 둥근 등받이와 자연스러운 라탄의 표면, 가볍게 이어지는 원목 프레임이 일상에 따뜻한 여백을 더합니다.',
      photo: 'images/pros/pro03.png',
      crop: [1352, 0, 1156, 829],
      focus: [.5, .7],
      detailImages: ['images/sub03.png']
    },
    'curved-dining': {
      page: 4,
      title: 'Curved Dining',
      lines: ['Curved', 'Dining'],
      material: '월넛 원목 · 올리브 패브릭',
      description: '등받이에서 팔걸이까지 하나의 흐름으로 이어지는 곡선. 월넛 원목의 깊은 결에 올리브 패브릭을 더해, 식사와 대화의 시간을 편안하게 만듭니다.',
      photo: 'images/pros/pro05.png',
      crop: [1260, 0, 1248, 774],
      focus: [.5, .7],
      detailImages: ['images/sub04.png']
    },
    'boucle-lounge': {
      page: 5,
      title: 'Bouclé Lounge',
      lines: ['Bouclé', 'Lounge'],
      material: '부클레 · 애쉬 원목 · 스틸',
      description: '부드러운 부클레와 가느다란 금속 프레임의 조합. 따뜻한 원목 팔걸이와 낮고 깊은 좌면으로, 몸을 온전히 맡기는 느긋한 휴식을 만듭니다.',
      photo: 'images/pros/pro06.png',
      crop: [1368, 0, 1140, 884],
      focus: [.52, .7],
      detailImages: ['images/sub05.png']
    }
  };

  const requested = new URLSearchParams(window.location.search).get('product');
  const product = products[Object.hasOwn(products, requested) ? requested : 'leather-lounge'];
  const page = String(product.page).padStart(3, '0');
  const returnLink = `index.html#process-${page}`;
  const hero = document.getElementById('detailHero');
  const heroImage = document.getElementById('detailHeroImage');
  const photoSource = document.getElementById('detailPhotoSource');
  const photoRect = document.getElementById('detailPhotoRect');
  const content = document.getElementById('productDetails');

  document.title = `${product.title} — lehnen`;
  document.getElementById('productTitle').setAttribute('aria-label', product.title);
  document.getElementById('productTitle').replaceChildren(...product.lines.map(line => {
    const span = document.createElement('span');
    span.textContent = line;
    return span;
  }));
  document.getElementById('productMaterial').textContent = product.material;
  document.getElementById('productDescription').textContent = product.description;
  document.getElementById('detailIssue').textContent = `${page} / 005`;
  document.getElementById('detailImageLabel').textContent = `${product.title.toUpperCase()} / ${page}`;
  document.getElementById('detailBack').href = returnLink;
  document.getElementById('detailReturn').href = returnLink;
  heroImage.setAttribute('aria-label', `${product.title} — ${product.material}`);
  photoSource.setAttribute('href', product.photo);
  ['x', 'y', 'width', 'height'].forEach((name, i) => photoRect.setAttribute(name, product.crop[i]));

  // Frame the existing product photograph to the fixed left panel without stretching it.
  function framePhoto() {
    if (!hero.clientWidth || !hero.clientHeight) return;
    const [photoX, photoY, photoWidth, photoHeight] = product.crop;
    const ratio = hero.clientWidth / hero.clientHeight;
    const width = Math.min(photoWidth, photoHeight * ratio);
    const height = Math.min(photoHeight, photoWidth / ratio);
    const x = photoX + (photoWidth - width) * product.focus[0];
    const y = photoY + (photoHeight - height) * product.focus[1];
    heroImage.setAttribute('viewBox', `${x} ${y} ${width} ${height}`);
  }
  new ResizeObserver(framePhoto).observe(hero);
  framePhoto();

  document.getElementById('detailImages').replaceChildren(...product.detailImages.map((src, index) => {
    const image = document.createElement('img');
    image.src = src;
    image.width = 750;
    image.alt = `${product.title} 상품 상세페이지`;
    image.loading = index === 0 ? 'eager' : 'lazy';
    image.decoding = 'async';
    return image;
  }));

  // A wheel gesture over the fixed photograph still moves only the right panel.
  hero.addEventListener('wheel', event => {
    if (event.ctrlKey || event.metaKey || !event.deltaY) return;
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? content.clientHeight : 1;
    content.scrollBy({top: event.deltaY * unit, behavior: 'auto'});
    event.preventDefault();
  }, {passive: false});
})();
