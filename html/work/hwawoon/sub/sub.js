// 1. 수량 조절 스크립트
        function updateQty(change) {
            const qtyInput = document.getElementById('qty');
            let currentVal = parseInt(qtyInput.value);
            let newVal = currentVal + change;
            if (newVal >= 1) { // 수량은 최소 1개
                qtyInput.value = newVal;
            }
        }

        // 2. 아코디언 메뉴 스크립트
        function toggleAccordion(btn) {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('span');
            
            if (content.style.display === "block") {
                content.style.display = "none";
                icon.textContent = "+";
            } else {
                content.style.display = "block";
                icon.textContent = "-";
            }
        }

        // 3. 용량 버튼 활성화 스크립트
        const sizeBtns = document.querySelectorAll('.size-btn');
        sizeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                sizeBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
