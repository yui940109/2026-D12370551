document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.work-cards-container');

    if (!container) return; 

    const updateShadows = () => {
        const isScrollable = container.scrollHeight > container.clientHeight;

        if (!isScrollable) {
            // 不需要滾動：移除 data-shadow 屬性 (回到 box-shadow: none)
            container.removeAttribute('data-shadow');
            return;
        }

        const isAtTop = container.scrollTop === 0;
        // 容許 1px 誤差
        const isAtBottom = (container.scrollTop + container.clientHeight) >= (container.scrollHeight - 1);
        
        if (isAtTop && !isAtBottom) {
            // 在頂部，但內容未完全顯示 -> 只需要底部陰影
            container.setAttribute('data-shadow', 'bottom');
        } else if (isAtBottom && !isAtTop) {
            // 在底部，但內容未完全顯示 -> 只需要頂部陰影
            container.setAttribute('data-shadow', 'top');
        } else if (isAtTop && isAtBottom) {
             // 內容剛好填滿 (不需要滾動或滾動非常少)
             container.removeAttribute('data-shadow');
        } else {
            // 在中間 -> 頂部和底部都需要陰影
            container.setAttribute('data-shadow', 'both');
        }
    };

    container.addEventListener('scroll', updateShadows);
    updateShadows(); 
    window.addEventListener('resize', updateShadows);
});