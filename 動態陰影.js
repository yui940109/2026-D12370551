document.addEventListener('DOMContentLoaded', () => {
    // 取得您的容器元素
    const container = document.querySelector('.work-cards-container');

    if (!container) return; // 找不到元素就停止

    // 檢查並更新陰影的函數
    const updateShadows = () => {
        // 檢查內容是否溢出 (是否需要滾動)
        const isScrollable = container.scrollHeight > container.clientHeight;

        if (!isScrollable) {
            // 不需要滾動：移除所有陰影
            container.classList.remove('has-top-shadow', 'has-bottom-shadow');
            return;
        }
        
        // ------------------------------------
        // 判斷頂部陰影 (當內容已向下滾動時顯示)
        // ------------------------------------
        // 如果scrollTop > 0 (非頂部)，則顯示頂部陰影
        if (container.scrollTop > 0) {
            container.classList.add('has-top-shadow');
        } else {
            container.classList.remove('has-top-shadow');
        }


        // ------------------------------------
        // 判斷底部陰影 (當內容未滾動到底部時顯示)
        // ------------------------------------
        // 滾動距離 + 可視高度 < 內容總高度
        // 容許 1px 的誤差來避免瀏覽器浮點數計算問題
        const isScrolledToBottom = (container.scrollTop + container.clientHeight) >= (container.scrollHeight - 1);

        if (isScrolledToBottom) {
            container.classList.remove('has-bottom-shadow');
        } else {
            container.classList.add('has-bottom-shadow');
        }
    };

    // 1. 綁定滾動事件
    container.addEventListener('scroll', updateShadows);

    // 2. 頁面初次載入時執行一次，以設定初始狀態
    updateShadows(); 
    
    // 3. 視窗大小改變時也重新檢查 (如果視窗變大或變小)
    window.addEventListener('resize', updateShadows);
});