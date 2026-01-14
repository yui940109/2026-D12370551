// ----------------------------------------------------
// 導覽列橘線邏輯 (最終且唯一的修正版)
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const allLinks = document.querySelectorAll('.main-header a');
    
    // 取得當前頁面的完整路徑 (例如: /folder/about.html)
    const currentPath = window.location.pathname; 
    
    // 延遲時間：400 毫秒 (確保 CSS 0.3s 動畫跑完)
    const delayTime = 400; 
    // 您的首頁檔名，根據 HTML 結構確認為 '主頁.html'
    const HOME_FILE_NAME = '主頁.html'; 

    // 輔助函式：設定 active 狀態
    function setActiveLink(targetLink) {
        allLinks.forEach(l => l.classList.remove('active'));
        if (targetLink) {
            targetLink.classList.add('active');
        }
    }
    
    // 輔助函式：標準化檔案名稱，處理路徑和大小寫
    function getFileName(path) {
        // 如果路徑為空，則視為首頁
        const fileName = path.split('/').pop().toLowerCase();
        return fileName === '' ? HOME_FILE_NAME.toLowerCase() : fileName;
    }

    // ----------------------------------------------------
    // 1. 頁面載入時：判斷當前頁面並設定橘線
    // ----------------------------------------------------
    const currentFile = getFileName(currentPath);
    let activeLinkOnLoad = null;

    allLinks.forEach(link => {
        const linkHref = link.getAttribute('href'); 
        
        if (!linkHref || linkHref === '#') return;
        
        const targetFile = getFileName(linkHref);

        // 判斷當前頁面是否與連結相符 (例如: 關於我.html === 關於我.html)
        if (currentFile === targetFile) {
            activeLinkOnLoad = link;
        }
    });

    // 設定頁面載入時的初始 active 狀態
    if (activeLinkOnLoad) {
        setActiveLink(activeLinkOnLoad);
    }
    
    
    // ----------------------------------------------------
    // 2. 點擊時：處理跳轉與停留邏輯
    // ----------------------------------------------------
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const url = this.getAttribute('href');
            
            // 處理 '#' 連結 (例如搜尋圖示): 只變色/加橘線，不跳轉
            if (url === '#') {
                e.preventDefault();
                setActiveLink(this);
                return;
            }

            // 處理有效的 URL 連結
            if (url) {
                const targetFile = getFileName(url);
                
                // 檢查點擊的連結是否就是當前頁面
                if (currentFile === targetFile) {
                    // **【停留關鍵】:** 點擊當前頁面時，阻止預設跳轉，只設定 active 狀態。
                    e.preventDefault(); 
                    setActiveLink(this);
                    // 橘線會保持停留！
                    
                } else {
                    // 點擊的是其他頁面 -> 延遲跳轉
                    e.preventDefault(); 
                    
                    // 步驟 A: 立即設定 active 狀態 (觸發橘線展開動畫)
                    setActiveLink(this);
                    
                    // 步驟 B: 等待動畫運行完畢後跳轉
                    setTimeout(() => {
                        window.location.href = url;
                    }, delayTime);
                }
            }
        });
    });
});


