        // ----------------------------------------------------
        // 導覽列橘線邏輯
        // ----------------------------------------------------
        document.addEventListener('DOMContentLoaded', () => {
            const allLinks = document.querySelectorAll('.main-header a');
            const logoLink = document.getElementById('logo-link');
            
            function setActiveLink(targetLink) {
                allLinks.forEach(l => l.classList.remove('active'));
                targetLink.classList.add('active');
            }

            allLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    if (this.getAttribute('href') === '#') {
                        e.preventDefault(); 
                    }
                    setActiveLink(this);
                });
            });
            
            setActiveLink(logoLink); 
        });


        // ----------------------------------------------------
        // 圖片滑動邏輯 (右側循環，左側停止，末尾對齊)
        // ----------------------------------------------------
        /**
         * 點擊箭頭時水平滾動圖片容器
         * @param {string} containerId - 圖片容器的 ID
         * @param {number} direction - 滾動方向 (1 為右, -1 為左)
         */
        function slidePhotos(containerId, direction) {
            const container = document.getElementById(containerId);
            if (!container) return;
            
            const firstImage = container.querySelector('img');
            if (!firstImage) return;

            // 獲取第一個圖片的實際寬度
            const imageWidth = firstImage.offsetWidth;
            
            // CSS 中圖片間距為 15px (gap: 15px)
            const GAP_SIZE = 15; 
            
            // 精確的滾動步長：一張圖的寬度 + 間距
            const scrollDistance = imageWidth + GAP_SIZE;
            
            // 容器的最大滾動位置 (內容總寬度 - 容器可視寬度)
            const maxScrollLeft = container.scrollWidth - container.clientWidth;
            
            // 下一個滾動位置
            let targetScrollLeft = container.scrollLeft + scrollDistance * direction;
            
            
            // 處理循環和邊界
            if (direction === 1) { // 往右滑動
                
                // 檢查是否已經在最右側 (使用一個小的誤差值，因為滾動位置可能是浮點數)
                if (container.scrollLeft >= maxScrollLeft - 1) {
                    // **右側循環：如果已經在最右側，跳回 0 (第一張圖)**
                    targetScrollLeft = 0; 
                } else if (targetScrollLeft > maxScrollLeft) {
                    // **優化：如果下次滾動會超出範圍，則精確定位到末尾（讓最後一張圖完整顯示）**
                    targetScrollLeft = maxScrollLeft;
                } else {
                    // 正常滾動：確保精確對齊到最近的圖片的開始位置
                    targetScrollLeft = Math.round(targetScrollLeft / scrollDistance) * scrollDistance;
                }

            } else { // 往左滑動
                if (targetScrollLeft <= 0) { // 條件改為小於等於 0，確保停在最左側
                     // 左側停止：阻止滾動超過最左側，停在 0
                    targetScrollLeft = 0;
                } else {
                     // 正常滾動：確保精確對齊到最近的圖片的開始位置
                     targetScrollLeft = Math.round(targetScrollLeft / scrollDistance) * scrollDistance;
                }
            }

            // 使用 scrollTo 進行平滑滾動到目標位置
            container.scrollTo({
                left: targetScrollLeft,
                behavior: 'smooth' 
            });
        }
        
        // ----------------------------------------------------
        // 導覽列橘線邏輯 (確保橘線跑完再跳轉)
        // ----------------------------------------------------
        document.addEventListener('DOMContentLoaded', () => {
            const allLinks = document.querySelectorAll('.main-header a');
            
            // 取得當前頁面的完整路徑 (例如: /folder/about.html)
            const currentPath = window.location.pathname; 
            
            // 延遲時間：400 毫秒。比 CSS 0.3s 的動畫時間長，確保動畫跑完。
            const delayTime = 400; 

            // 橘線邏輯函式
            function setActiveLink(targetLink) {
                allLinks.forEach(l => l.classList.remove('active'));
                if (targetLink) {
                    targetLink.classList.add('active');
                }
            }

            let foundActive = false;

            allLinks.forEach(link => {
                const linkHref = link.getAttribute('href'); 
                
                // 1. 頁面載入時：根據 URL 判斷並設定 active 狀態
                if (linkHref) {
                    const targetFile = linkHref.split('/').pop().toLowerCase();
                    const currentFile = currentPath.split('/').pop().toLowerCase();

                    // 判斷當前頁面是否與連結相符 (例如: about.html === about.html)
                    if (currentFile === targetFile) {
                        setActiveLink(link);
                        foundActive = true;
                    }
                    
                    // 處理首頁情況 (如果 Logo 的 href 是 '主頁.html')
                    if (targetFile === '主頁.html' && (currentFile === '' || currentFile === '主頁.html')) {
                        setActiveLink(link);
                        foundActive = true;
                    }
                }


                // 2. 點擊時：先顯示橘線，等待動畫結束，再跳轉頁面
                link.addEventListener('click', function(e) {
                    const url = this.getAttribute('href');
                    
                    // 檢查是否為有效的跳轉連結 (非 #)
                    if (url && url !== '#') {
                        // 阻止預設的頁面立即跳轉行為
                        e.preventDefault(); 
                        
                        // 步驟 A: 立即設定 active 狀態，觸發橘線動畫
                        setActiveLink(this);
                        
                        // 步驟 B: 等待 delayTime 毫秒，確保橘線動畫完整運行後才跳轉
                        setTimeout(() => {
                            window.location.href = url;
                        }, delayTime);
                    } else if (url === '#') {
                         // 如果是 # 則只設定 active 狀態 (例如搜尋圖標)
                        e.preventDefault();
                        setActiveLink(this);
                    }
                });
            });
            
        });