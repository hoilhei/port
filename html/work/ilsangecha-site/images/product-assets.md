# 상품 상세페이지 이미지

내장 image_gen 도구로 생성한 웹사이트용 사진입니다. 기존 사진은 변경하지 않았습니다.

- `first-leaf-product.png`: 첫잎 녹차 상세페이지의 패키지 사진. 사용자가 제공한 `ilsangecha_first-leaf_1920.png`를 디자인 참고 자료로 사용했습니다.
- `tea-pause.png`: 차 이야기 섹션의 창가 티타임 사진.
- 맛과 향 및 추천 상품에는 기존 `sec2-t1.png` ~ `sec2-t5.png`를 사용합니다.

## 생성 프롬프트

### first-leaf-product.png

Use case: product-mockup. Asset type: portrait 4:5 hero product photo for Korean tea website. Input image is a reference web design, not an edit target. Create ONLY a standalone realistic photograph matching the top-left product photo in the reference. A cream ivory resealable matte paper pouch standing upright, sage green rectangular label printed with exact Korean brand '일상에차', large product name '첫잎 녹차', small English 'FIRST LEAF' and a delicate botanical tea sprig illustration. A low ivory ceramic cup of pale yellow-green tea in the lower right, loose green tea leaves on a wooden scoop in the lower left, natural linen on pale beige table. Soft afternoon sunlight from upper right, diagonal window shadows on warm cream wall, serene warm natural photographic palette. Pouch centered, entire pouch visible, realistic paper texture. No UI, no webpage, no captions outside packaging, no badge, no watermark.

### tea-pause.png

Use case: photorealistic-natural. Asset type: landscape 6:5 editorial photo for a Korean tea product page. Primary request: serene everyday green tea by a sunny window. A clear rounded glass teapot with visible unfurled green tea leaves and pale golden-green tea on a light oak tabletop, handle on right, beside an ivory ceramic cup on a small dark wooden saucer in foreground left. A casually folded natural oatmeal linen cloth behind the cup, an open cream blank notebook entering at lower right. Dappled green garden visible through window at left, white sheer curtain at right, warm soft morning sunlight, authentic natural textures, premium quiet still-life photography. The teapot and cup are fully visible, no people, no text, no graphics, no watermark.

## 상품 정보 관리

각 상품은 `product.html?tea=상품ID`로 연결되며, 상품명·설명·사진·우리기 안내는 `product.js`의 `teas`에서 관리합니다. 첫잎 녹차의 가격과 구성은 참고 이미지의 18,000원 / 잎차 30 g을 사용했습니다. 나머지 상품의 가격과 중량은 미제공 상태이므로 판매 준비 중으로 표시합니다. 구매는 결제 서비스 미연동 안내를 표시하며, 장바구니는 브라우저의 로컬 저장소를 사용합니다.
